import { useEffect, useState } from 'react'
import { GITHUB_USER } from './data'

export type Repo = {
  name: string
  html_url: string
  description: string | null
  language: string | null
  pushed_at: string
  fork: boolean
  stargazers_count: number
}

export type User = { public_repos: number; followers: number; created_at: string }

const api = `https://api.github.com/users/${GITHUB_USER}`
const cache = new Map<string, Promise<unknown>>()

function load<T>(url: string): Promise<T> {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url).then(r => (r.ok ? r.json() : Promise.reject(r.status))),
    )
  }
  return cache.get(url) as Promise<T>
}

export const getUser = () => load<User>(api)

export const getRepos = () =>
  load<Repo[]>(`${api}/repos?sort=pushed&per_page=100`).then(rs =>
    rs.filter(r => !r.fork && r.name !== GITHUB_USER),
  )

export function useAsync<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    let alive = true
    fn()
      .then(d => alive && setData(d))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [fn])
  return data
}

export function ago(iso: string, lang: string) {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  const sec = (new Date(iso).getTime() - Date.now()) / 1000
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, s] of steps) if (Math.abs(sec) >= s) return rtf.format(Math.round(sec / s), unit)
  return rtf.format(0, 'minute')
}
