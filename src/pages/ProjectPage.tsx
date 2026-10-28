import { projects, ui } from '../data'
import { details } from '../details'
import { useLang } from '../i18n'
import { href } from '../router'
import { Reveal } from '../components/Section'

export default function ProjectPage({ name }: { name: string }) {
  const { t, lang } = useLang()
  const i = projects.findIndex(p => p.name === name)
  const p = projects[i]

  if (!p) {
    return (
      <section className="section page">
        <a href="#projects" className="back mono">{t(ui.pages.back)}</a>
        <h1 className="page-title">{t(ui.project.notFound)}</h1>
      </section>
    )
  }

  const d = details[p.name]
  const next = projects[(i + 1) % projects.length]

  return (
    <article className="section page">
      <a href="#projects" className="back mono">{t(ui.pages.back)}</a>

      <Reveal>
        <span className="tag-deco mono">&lt;h1&gt;</span>
        <h1 className="page-title">
          {p.name}
          {p.team && <span className="chip">{t(ui.projects.team)}</span>}
        </h1>
        <p className="page-lead">{t(p.tagline)}</p>
        <div className="tags">
          {p.tags.map(tag => (
            <span key={tag} className="tag mono">{tag}</span>
          ))}
        </div>
        <p className="page-text">{t(p.desc)}</p>
      </Reveal>

      {d && (
        <Reveal delay={0.05} className="page-block">
          <h2>{t(ui.project.features)}</h2>
          <ul className="features">
            {d.features[lang].map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>
      )}

      {d?.tree && (
        <Reveal delay={0.05} className="page-block">
          <h2>{t(ui.project.tree)}</h2>
          <pre className="code-block mono">{d.tree}</pre>
        </Reveal>
      )}

      {d?.run && (
        <Reveal delay={0.05} className="page-block">
          <h2>{t(ui.project.run)}</h2>
          <pre className="code-block mono">{d.run}</pre>
        </Reveal>
      )}

      <div className="page-actions">
        <a href={p.repo} target="_blank" rel="noreferrer" className="btn-outline">
          <span>{t(ui.project.repo)} ↗</span>
        </a>
        <a href={href.project(next.name)} className="next-link">
          <span className="dim mono">{t(ui.project.next)}</span>
          <span>{next.name} →</span>
        </a>
      </div>
    </article>
  )
}
