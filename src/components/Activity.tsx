import { ui } from '../data'
import { ago, getRepos, useAsync } from '../github'
import { useLang } from '../i18n'
import { Heading, Reveal } from './Section'

const langColors: Record<string, string> = {
  Go: '#00add8',
  Lua: '#6c8cd5',
  Java: '#b07219',
  Shell: '#89e051',
  Rust: '#dea584',
  TypeScript: '#3178c6',
  Python: '#3572a5',
}

export default function Activity() {
  const { t, lang } = useLang()
  const repos = useAsync(getRepos)?.slice(0, 5)

  if (!repos?.length) return null

  return (
    <section id="activity" className="section">
      <Heading index="03" title={t(ui.activity.title)} sub={t(ui.activity.sub)} />
      <Reveal className="activity card">
        {repos.map(r => (
          <a key={r.name} href={r.html_url} target="_blank" rel="noreferrer" className="activity-row">
            <span className="activity-dot" />
            <span className="mono activity-name">{r.name}</span>
            <span className="activity-desc dim">{r.description}</span>
            {r.language && (
              <span className="activity-lang mono dim">
                <i style={{ background: langColors[r.language] ?? 'var(--muted)' }} />
                {r.language}
              </span>
            )}
            <span className="activity-time mono dim">{ago(r.pushed_at, lang)}</span>
          </a>
        ))}
      </Reveal>
    </section>
  )
}
