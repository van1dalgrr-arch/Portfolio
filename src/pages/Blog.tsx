import { ui } from '../data'
import { useLang } from '../i18n'
import { posts } from '../posts'
import { href } from '../router'
import { Heading, Reveal } from '../components/Section'

function fmt(date: string, lang: string) {
  return new Date(date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BlogList() {
  const { t, lang } = useLang()
  return (
    <section className="section page">
      <a href="#top" className="back mono">{t(ui.pages.back)}</a>
      <Heading index="~" title={t(ui.blog.title)} sub={t(ui.blog.sub)} />
      <div className="posts">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <a href={href.post(p.slug)} className="post-row">
              <span className="post-date mono dim">{fmt(p.date, lang)}</span>
              <span className="post-title">{p.title}</span>
              <span className="post-summary dim">{p.summary}</span>
              <span className="tags">
                {p.tags.map(tag => (
                  <span key={tag} className="tag mono">{tag}</span>
                ))}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function BlogPost({ slug }: { slug: string }) {
  const { t, lang } = useLang()
  const p = posts.find(p => p.slug === slug)

  if (!p) {
    return (
      <section className="section page">
        <a href={href.blog} className="back mono">{t(ui.blog.all)}</a>
        <h1 className="page-title">{t(ui.blog.notFound)}</h1>
      </section>
    )
  }

  return (
    <article className="section page">
      <a href={href.blog} className="back mono">{t(ui.blog.all)}</a>
      <Reveal>
        <span className="tag-deco mono">&lt;article&gt;</span>
        <h1 className="page-title post-h1">{p.title}</h1>
        <p className="dim mono post-meta">
          {fmt(p.date, lang)} · {p.minutes} {t(ui.blog.read)}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
      </Reveal>
    </article>
  )
}
