/**
 * Shared behaviour for every page. Section-specific scripts live next to their section.
 * Everything degrades gracefully: without JS the content is fully visible and usable,
 * with prefers-reduced-motion the movement is dropped (see site.css).
 */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// 1. Scroll reveal: [data-reveal] gets .is-in once it enters the viewport.
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}

// 2. Header: glass background once scrolled, hides on scroll down and returns on scroll up.
function initHeader() {
  const hd = document.querySelector<HTMLElement>('[data-header]');
  if (!hd) return;
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    hd.classList.toggle('is-scrolled', y > 12);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 420 && !hd.querySelector('.is-open')) hd.classList.add('is-hidden');
    else if (goingUp || y < 420) hd.classList.remove('is-hidden');
    if (Math.abs(y - lastY) > 4) lastY = y;
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();

  // Mega menu: hover intent on desktop, click/keyboard on the caret, Esc and outside click close it.
  const mega = hd.querySelector<HTMLElement>('[data-mega]');
  if (mega) {
    const caret = mega.querySelector<HTMLButtonElement>('.jx-nav__caret')!;
    let closeTimer = 0;
    const set = (open: boolean) => {
      mega.classList.toggle('is-open', open);
      caret.setAttribute('aria-expanded', String(open));
    };
    if (finePointer) {
      mega.addEventListener('pointerenter', () => {
        clearTimeout(closeTimer);
        set(true);
      });
      mega.addEventListener('pointerleave', () => {
        closeTimer = window.setTimeout(() => set(false), 180);
      });
    }
    caret.addEventListener('click', () => set(!mega.classList.contains('is-open')));
    mega.addEventListener('focusout', (e) => {
      if (!mega.contains(e.relatedTarget as Node)) set(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mega.classList.contains('is-open')) {
        set(false);
        caret.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (!mega.contains(e.target as Node)) set(false);
    });
  }

  // Mobile drawer
  const burger = hd.querySelector<HTMLButtonElement>('[data-burger]');
  if (burger) {
    const set = (open: boolean) => {
      hd.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.documentElement.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => set(!hd.classList.contains('is-open')));
    hd.querySelectorAll('[data-drawer] a').forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hd.classList.contains('is-open')) set(false);
    });
    matchMedia('(min-width: 1081px)').addEventListener('change', (e) => e.matches && set(false));
  }
}

// 3. Live blobs: pause off screen, follow the pointer a little (parallax via --px/--py).
function initBlobs() {
  const fields = [...document.querySelectorAll<HTMLElement>('[data-blobs]')];
  if (!fields.length || reduceMotion) return;
  const io = new IntersectionObserver((entries) =>
    entries.forEach((e) => e.target.classList.toggle('is-paused', !e.isIntersecting)),
  );
  fields.forEach((f) => io.observe(f));
  if (!finePointer) return;
  let raf = 0;
  addEventListener(
    'pointermove',
    (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const px = (e.clientX / innerWidth - 0.5) * 2;
        const py = (e.clientY / innerHeight - 0.5) * 2;
        fields.forEach((f) => {
          if (f.classList.contains('is-paused')) return;
          f.style.setProperty('--px', px.toFixed(3));
          f.style.setProperty('--py', py.toFixed(3));
        });
      });
    },
    { passive: true },
  );
}

// 4. Subtle 3D tilt for [data-tilt] visuals (sets --rx/--ry from -1..1).
function initTilt() {
  if (reduceMotion || !finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--rx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
      el.style.setProperty('--ry', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0');
      el.style.setProperty('--ry', '0');
    });
  });
}

// 5. Spotlight cards: [data-spotlight] passes the pointer position to each .jx-card as --mx/--my.
function initSpotlight() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((root) => {
    const cards = [...root.querySelectorAll<HTMLElement>('.jx-card')];
    root.addEventListener('pointermove', (e) => {
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', `${e.clientX - r.left}px`);
        c.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  });
}

// 6. Count-up numbers: [data-count="25"] counts from 0 when visible.
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target as HTMLElement;
        const to = Number(el.dataset.count);
        const dur = 1400;
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        el.textContent = '0';
        requestAnimationFrame(step);
      }),
    { threshold: 0.6 },
  );
  els.forEach((el) => io.observe(el));
}

// 7. Tabs ([data-tabs]): ARIA tabs with arrow keys, sliding ink, auto-advance until the visitor picks one.
function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')!)!);
    const bar = root.querySelector<HTMLElement>('[role="tablist"]')!;
    const TIME = 8000;
    let idx = 0;
    let timer = 0;
    let auto = !reduceMotion;
    let inView = false;

    const select = (i: number, focus = false) => {
      idx = (i + tabs.length) % tabs.length;
      tabs.forEach((t, k) => {
        const on = k === idx;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[k].classList.toggle('is-active', on);
        panels[k].hidden = !on;
      });
      bar.style.setProperty('--tab', String(idx));
      if (focus) tabs[idx].focus();
      schedule();
    };
    const schedule = () => {
      clearTimeout(timer);
      root.classList.remove('is-auto');
      if (!auto) return;
      void root.offsetWidth;
      root.style.setProperty('--tab-time', `${TIME}ms`);
      root.classList.add('is-auto');
      timer = window.setTimeout(next, TIME);
    };
    const next = () => {
      if (root.classList.contains('is-hold') || !inView) {
        timer = window.setTimeout(next, 600);
        return;
      }
      select(idx + 1);
    };
    const stopAuto = () => {
      auto = false;
      schedule();
    };

    tabs.forEach((t, i) =>
      t.addEventListener('click', () => {
        stopAuto();
        select(i);
      }),
    );
    bar.addEventListener('keydown', (e) => {
      const k = e.key;
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(k)) return;
      e.preventDefault();
      stopAuto();
      if (k === 'Home') select(0, true);
      else if (k === 'End') select(tabs.length - 1, true);
      else select(idx + (k === 'ArrowRight' || k === 'ArrowDown' ? 1 : -1), true);
    });
    root.addEventListener('pointerenter', () => root.classList.add('is-hold'));
    root.addEventListener('pointerleave', () => root.classList.remove('is-hold'));
    new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.35 }).observe(root);
    select(0);
  });
}

initReveal();
initHeader();
initBlobs();
initTilt();
initSpotlight();
initCounters();
initTabs();
