import { contacts, projects, skills, ui } from '../data'
import { useLang } from '../i18n'
import { href } from '../router'

export default function CvPage() {
  const { t } = useLang()
  const top = projects.filter(p => p.name !== 'dotfiles')

  return (
    <article className="section page cv">
      <div className="cv-toolbar no-print">
        <a href="#top" className="back mono">{t(ui.pages.back)}</a>
        <button className="btn-outline" onClick={() => window.print()}>
          <span>{t(ui.cv.download)}</span>
        </button>
      </div>

      <header className="cv-head">
        <div>
          <h1 className="page-title">van1dal</h1>
          <p className="page-lead">Go Backend Developer · Saint Petersburg</p>
        </div>
        <ul className="cv-contacts mono">
          <li><a href={`mailto:${contacts.email}`}>{contacts.email}</a></li>
          <li><a href={contacts.github}>{contacts.github.replace('https://', '')}</a></li>
        </ul>
      </header>

      <section className="cv-sec">
        <h2>{t(ui.cv.summary)}</h2>
        <p>{t(ui.about.summary)}</p>
      </section>

      <section className="cv-sec">
        <h2>{t(ui.cv.skills)}</h2>
        <dl className="cv-skills">
          {skills.map(s => (
            <div key={s.group.en}>
              <dt className="mono">{t(s.group)}</dt>
              <dd>{s.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="cv-sec">
        <h2>{t(ui.cv.experience)}</h2>
        <div className="cv-item">
          <div className="cv-item-head">
            <b>kinoza-back</b>
            <span className="dim mono">{t(ui.projects.team)}</span>
          </div>
          <p>{t(ui.cv.teamRole)}</p>
        </div>
      </section>

      <section className="cv-sec">
        <h2>{t(ui.cv.projects)}</h2>
        {top
          .filter(p => !p.team)
          .map(p => (
            <div key={p.name} className="cv-item">
              <div className="cv-item-head">
                <a href={href.project(p.name)}><b>{p.name}</b></a>
                <span className="dim mono">{p.tags.slice(0, 4).join(' · ')}</span>
              </div>
              <p>{t(p.desc)}</p>
            </div>
          ))}
      </section>
    </article>
  )
}
