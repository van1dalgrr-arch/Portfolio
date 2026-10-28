import { useEffect, useState } from 'react'

export type Route =
  | { page: 'home'; anchor?: string }
  | { page: 'project'; name: string }
  | { page: 'cv' }
  | { page: 'blog' }
  | { page: 'post'; slug: string }

export function parse(hash: string): Route {
  const h = hash.replace(/^#/, '')
  if (!h.startsWith('/')) return { page: 'home', anchor: h || undefined }
  const [, a, b] = h.split('/')
  if (a === 'project' && b) return { page: 'project', name: decodeURIComponent(b) }
  if (a === 'cv') return { page: 'cv' }
  if (a === 'blog' && b) return { page: 'post', slug: b }
  if (a === 'blog') return { page: 'blog' }
  return { page: 'home' }
}

export const href = {
  project: (name: string) => `#/project/${encodeURIComponent(name)}`,
  cv: '#/cv',
  blog: '#/blog',
  post: (slug: string) => `#/blog/${slug}`,
}

let homeScroll = 0
export const savedHomeScroll = () => homeScroll

export function useRoute() {
  const [route, setRoute] = useState(() => parse(location.hash))
  useEffect(() => {
    const onChange = (e: HashChangeEvent) => {
      const prev = parse(new URL(e.oldURL).hash)
      if (prev.page === 'home') homeScroll = scrollY
      setRoute(parse(location.hash))
    }
    addEventListener('hashchange', onChange)
    return () => removeEventListener('hashchange', onChange)
  }, [])
  return route
}
