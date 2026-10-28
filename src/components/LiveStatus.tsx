import { ui } from '../data'
import { ago, getRepos, useAsync } from '../github'
import { useLang } from '../i18n'
import { href } from '../router'
import { projects } from '../data'

export default function LiveStatus() {
  const { t, lang } = useLang()
  const last = useAsync(getRepos)?.[0]
  if (!last) return null

  const known = projects.find(p => p.repo.toLowerCase().endsWith(`/${last.name.toLowerCase()}`))
  const link = known ? href.project(known.name) : last.html_url

  return (
    <a href={link} className="live-status mono" {...(known ? {} : { target: '_blank', rel: 'noreferrer' })}>
      <span className="live-dot" />
      {t(ui.status.working)} <b>{known?.name ?? last.name}</b>
      <span className="dim">· {ago(last.pushed_at, lang)}</span>
    </a>
  )
}
