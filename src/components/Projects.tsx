import { projects, ui } from '../data'
import { useLang } from '../i18n'
import { href } from '../router'
import { Heading, Reveal } from './Section'

export default function Projects() {
  const { t } = useLang()

  return (
    <section id="projects" className="section">
      <Heading index="02" title={t(ui.projects.title)} sub={t(ui.projects.sub)} />
      <div className="projects">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 0.06}>
            <a href={href.project(p.name)} className="project card">
              <div className="project-head">
                <h3 className="mono">
                  {p.name}
                  {p.team && <span className="chip">{t(ui.projects.team)}</span>}
                </h3>
                <span className="project-arrow" aria-hidden>
                  →
                </span>
              </div>
              <p className="project-tagline">{t(p.tagline)}</p>
              <p className="project-desc">{t(p.desc)}</p>
              <div className="tags">
                {p.tags.map(tag => (
                  <span key={tag} className="tag mono">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
