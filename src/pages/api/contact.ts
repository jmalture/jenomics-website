/**
 * Contact form endpoint for the Kontakt page (the only server route; every page is static).
 * Rules carried over from our PHP themes: no CAPTCHA, honeypot + rate limit + strict validation,
 * store the enquiry before sending mail so a failed mail never loses a lead.
 *
 * Environment (Hostinger Node.js app settings), mirroring the WP Mail SMTP setup of the old site:
 *   SMTP_HOST        mx01.jenomics.de
 *   SMTP_PORT        25 (465 = implicit TLS, 587 = STARTTLS)
 *   SMTP_USER/PASS   optional; without them the mail is sent unauthenticated (old site: auth off)
 *   SMTP_AUTO_TLS    "false" = never upgrade to TLS (old site: Auto TLS off); default: use TLS if offered
 *   MAIL_FROM        anfrage@jenomics.de
 *   MAIL_FROM_NAME   Anfrage - Jenomics GmbH
 *   MAIL_TO          recipients, comma separated (default MAIL_FROM)
 *   SUBMISSIONS_DIR  default ./data/submissions, outside the public folder
 */
import type { APIRoute } from 'astro';
import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';
import messages from '../../i18n/form.json';

export const prerender = false;

type Lang = 'de' | 'en';
const env = (k: string) => process.env[k] ?? import.meta.env[k];
const hits = new Map<string, number[]>();
const LIMIT = 5; // per IP
const WINDOW = 10 * 60 * 1000; // 10 minutes

function msg(key: keyof typeof messages, lang: Lang) {
  return messages[key][lang] ?? messages[key].de;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const form = await request.formData().catch(() => null);
  const lang = (['de', 'en'].includes(String(form?.get('lang'))) ? form!.get('lang') : 'de') as Lang;
  if (!form) return json({ ok: false, message: msg('form_error', lang) }, 400);

  // Honeypot: bots fill the hidden field. Pretend success, store nothing.
  if (String(form.get('form_fields[website_hp]') ?? '').trim() !== '')
    return json({ ok: true, message: msg('form_ok', lang) });

  const ip = clientAddress || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return json({ ok: false, message: msg('form_error', lang) }, 429);
  recent.push(now);
  hits.set(ip, recent);

  const email = String(form.get('form_fields[email]') ?? '')
    .trim()
    .slice(0, 200);
  const phone = String(form.get('form_fields[phone]') ?? '')
    .trim()
    .slice(0, 50);
  const message = String(form.get('form_fields[message]') ?? '')
    .trim()
    .slice(0, 5000);
  const consent = form.get('form_fields[consent]') != null;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!emailOk || !consent || (phone && !/^[0-9()#&+*\-=. ]+$/.test(phone))) {
    return json({ ok: false, message: msg('form_invalid', lang) }, 422);
  }

  const entry = {
    at: new Date().toISOString(),
    lang,
    email,
    phone,
    message,
    page: request.headers.get('referer') ?? '',
    // IP and user agent are deliberately not stored (data minimisation); the IP is only kept in memory for the rate limit
    mail: 'pending',
  };
  const dir = env('SUBMISSIONS_DIR') || path.join(process.cwd(), 'data', 'submissions');
  try {
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, `${entry.at.slice(0, 7)}.jsonl`), JSON.stringify(entry) + '\n');
  } catch (e) {
    console.error('[contact] store failed', e);
  }

  // Send the mail in the background: the visitor gets the answer at once (the enquiry is already stored),
  // so a slow or blocked SMTP server can never leave the form hanging. Short timeouts; the result goes to the log.
  const port = Number(env('SMTP_PORT') || 465);
  const user = env('SMTP_USER');
  const fromAddr = env('MAIL_FROM') || user;
  const started = Date.now();
  const note = (extra: Record<string, string>) =>
    appendFile(
      path.join(dir, `${entry.at.slice(0, 7)}.jsonl`),
      JSON.stringify({ at: entry.at, ...extra }) + '\n',
    ).catch(() => {});
  nodemailer
    .createTransport({
      host: env('SMTP_HOST'),
      port,
      secure: port === 465,
      ignoreTLS: String(env('SMTP_AUTO_TLS')).toLowerCase() === 'false',
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
      ...(user ? { auth: { user, pass: env('SMTP_PASS') } } : {}),
    })
    .sendMail({
      from: env('MAIL_FROM_NAME') ? { name: env('MAIL_FROM_NAME'), address: fromAddr } : fromAddr,
      to: env('MAIL_TO') || fromAddr,
      replyTo: email,
      subject: `Neue Anfrage über jenomics.de (${lang.toUpperCase()})`,
      text: `E-Mail: ${email}\nTelefon: ${phone || '-'}\nSprache: ${lang}\nSeite: ${entry.page}\n\n${message || '(keine Nachricht)'}\n`,
    })
    .then((info) => {
      console.log(`[contact] mail sent via ${env('SMTP_HOST')}:${port} in ${Date.now() - started} ms`, info.response);
      return note({ mail: 'sent' });
    })
    .catch((e) => {
      console.error(`[contact] mail failed via ${env('SMTP_HOST')}:${port} after ${Date.now() - started} ms:`, e?.code, e?.message);
      return note({ mail: 'failed', error: `${e?.code ?? ''} ${e?.message ?? ''}`.trim() });
    });

  return json({ ok: true, message: msg('form_ok', lang) });
};
