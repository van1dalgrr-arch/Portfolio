import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { stack, ui } from '../data'
import { getRepos, getUser, useAsync } from '../github'
import { useLang } from '../i18n'
import { Heading, Reveal } from './Section'

function useGithubStats() {
  const user = useAsync(getUser)
  const repos = useAsync(getRepos)
  if (!user) return null
  return {
    repos: user.public_repos,
    followers: user.followers,
    since: new Date(user.created_at).getFullYear(),
    stars: repos?.reduce((s, r) => s + r.stargazers_count, 0) ?? 0,
  }
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const from = to > 1000 ? to - 10 : 0
    const c = animate(from, to, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => {
        if (ref.current) ref.current.textContent = Math.round(v).toString()
      },
    })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>0</span>
}

export default function About() {
  const { t } = useLang()
  const stats = useGithubStats()

  return (
    <section id="about" className="section">
      <Heading index="01" title={t(ui.about.title)} />
      <div className="about">
        <Reveal className="about-text">
          <p>{t(ui.about.text)}</p>
          <div className="tags">
            {stack.map(s => (
              <span key={s} className="tag mono">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="facts">
          {ui.about.facts.map((f, i) => (
            <div key={i} className="fact">
              <span className="mono dim">{t(f.k)}</span>
              <span>{t(f.v)}</span>
            </div>
          ))}
          {stats &&
            (
              [
                ['repos', stats.repos],
                ['stars', stats.stars],
                ['since', stats.since],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="fact">
                <span className="mono dim">{t(ui.stats[k])}</span>
                <span className="accent mono">
                  <Counter to={v} />
                </span>
              </div>
            ))}
        </Reveal>
      </div>
    </section>
  )
}
