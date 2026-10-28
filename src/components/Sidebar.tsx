import { useEffect, useState, type ReactNode } from 'react'
import { contacts, ui } from '../data'
import { useLang } from '../i18n'
import { openPalette } from './Palette'
import { href, type Route } from '../router'

const sections = ['top', 'about', 'projects', 'activity', 'terminal', 'contact'] as const

const icon = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
)

const icons: Record<(typeof sections)[number], ReactNode> = {
  top: icon(<path d="M3 11 12 4l9 7M5 10v10h14V10" />),
  about: icon(<><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>),
  projects: icon(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>),
  activity: icon(<path d="M3 12h4l3-8 4 16 3-8h4" />),
  terminal: icon(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></>),
  contact: icon(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
}

export default function Sidebar({ route }: { route: Route }) {
  const { t, lang, setLang } = useLang()
  const [active, setActive] = useState<string>('top')

  useEffect(() => {
    if (route.page !== 'home') return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [route.page])

  const pageActive = route.page === 'cv' ? 'cv' : route.page === 'blog' || route.page === 'post' ? 'blog' : null
  const sectionActive = route.page === 'home' ? active : route.page === 'project' ? 'projects' : null

  const tip = (id: (typeof sections)[number]) => t(ui.nav[id])

  return (
    <aside className="sidebar">
      <a href="#top" className="side-logo" aria-label="van1dal">
        <span className="side-logo-letter">V</span>
        <span className="side-logo-name">van1dal</span>
      </a>

      <nav className="side-nav">
        {sections.map(id => (
          <a key={id} href={`#${id}`} className={`side-link ${sectionActive === id ? 'on' : ''}`} aria-label={tip(id)}>
            {icons[id]}
            <span className="side-tip">{tip(id)}</span>
          </a>
        ))}
        <span className="side-sep" />
        <a href={href.cv} className={`side-link ${pageActive === 'cv' ? 'on' : ''}`} aria-label={t(ui.pages.cv)}>
          {icon(<><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h5" /></>)}
          <span className="side-tip">{t(ui.pages.cv)}</span>
        </a>
        <a href={href.blog} className={`side-link ${pageActive === 'blog' ? 'on' : ''}`} aria-label={t(ui.pages.blog)}>
          {icon(<><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13 7 4 4" /></>)}
          <span className="side-tip">{t(ui.pages.blog)}</span>
        </a>
      </nav>

      <div className="side-bottom">
        <button className="side-link side-small" onClick={openPalette} aria-label="⌘K">
          {icon(<path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z" />)}
          <span className="side-tip">⌘K</span>
        </button>
        <a href={contacts.github} target="_blank" rel="noreferrer" className="side-link side-small" aria-label="GitHub">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          <span className="side-tip">GitHub</span>
        </a>
        <button className="side-lang mono" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} aria-label="switch language">
          {lang === 'ru' ? 'EN' : 'RU'}
        </button>
      </div>
    </aside>
  )
}
