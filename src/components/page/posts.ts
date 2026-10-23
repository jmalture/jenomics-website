/** Blog posts from src/content/blog/*.md (frontmatter: title, date, category, image, excerpt, source). */
type Front = { title: string; date: Date | string; category: string; image: string; image_w?: number; image_cut?: boolean; excerpt: string; source?: string };
type Mod = { frontmatter: Front; Content: any };

const files = import.meta.glob<Mod>('../../content/blog/*.md', { eager: true });

export type Post = Front & { slug: string; date: Date; iso: string; Content: any; minutes: number };

const raw = import.meta.glob<string>('../../content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

export function allPosts(): Post[] {
  return Object.entries(files)
    .map(([path, mod]) => {
      const slug = path.split('/').pop()!.replace(/\.md$/, '');
      const date = new Date(mod.frontmatter.date);
      const words = (raw[path] ?? '').replace(/^---[\s\S]*?---/, '').split(/\s+/).length;
      return {
        ...mod.frontmatter,
        slug,
        date,
        iso: date.toISOString().slice(0, 10),
        Content: mod.Content,
        minutes: Math.max(1, Math.round(words / 200)),
      };
    })
    .sort((a, b) => +b.date - +a.date);
}
