import { marked } from 'marked'

export type Post = { slug: string; title: string; date: string; summary: string; tags: string[]; html: string; minutes: number }

const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function parse(path: string, raw: string): Post {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  const meta: Record<string, string> = {}
  for (const line of (m?.[1] ?? '').split('\n')) {
    const i = line.indexOf(':')
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  const body = m?.[2] ?? raw
  return {
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: meta.title ?? '',
    date: meta.date ?? '',
    summary: meta.summary ?? '',
    tags: (meta.tags ?? '').split(',').map(t => t.trim()).filter(Boolean),
    html: marked.parse(body, { async: false }),
    minutes: Math.max(1, Math.round(body.split(/\s+/).length / 180)),
  }
}

export const posts = Object.entries(files)
  .map(([p, raw]) => parse(p, raw))
  .sort((a, b) => b.date.localeCompare(a.date))
