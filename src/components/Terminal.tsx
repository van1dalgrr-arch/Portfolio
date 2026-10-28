import { useEffect, useRef, useState, type ReactNode } from 'react'
import { contacts, projects, stack, ui, type Lang } from '../data'
import { href } from '../router'
import { useLang } from '../i18n'
import { Heading, Reveal } from './Section'

type Entry = { cmd: string; out: ReactNode }

const quick = ['help', 'whoami', 'projects', 'contact', 'go run gopher', 'sudo hire-me']

const gopher = (ru: boolean) => String.raw`
      ,_---~~~~~---_,
     /   ___   ___   \
    |   ( o ) ( o )   |
    |       ▾▾▾       |      ${ru ? 'привет, гофер!' : 'hello, gopher!'}
    |      \___/      |      ʕ◔ϖ◔ʔ
     \               /
      '-._________.-'
       _|  |   |  |_
      (__/       \__)`

function run(raw: string, lang: Lang): ReactNode | 'clear' {
  const ru = lang === 'ru'
  const [cmd, ...args] = raw.trim().split(/\s+/)
  switch (cmd) {
    case '':
      return null
    case 'help':
      return (
        <div className="t-grid">
          {[
            ['whoami', ru ? 'кто я' : 'who am i'],
            ['projects', ru ? 'список проектов' : 'list projects'],
            ['open <name>', ru ? 'открыть страницу проекта' : 'open a project page'],
            ['cv', ru ? 'резюме' : 'resume'],
            ['blog', ru ? 'заметки' : 'posts'],
            ['go run gopher', '?'],
            ['stack', ru ? 'технологии' : 'tech stack'],
            ['contact', ru ? 'как связаться' : 'how to reach me'],
            ['sudo hire-me', '¯\\_(ツ)_/¯'],
            ['clear', ru ? 'очистить экран' : 'clear screen'],
          ].map(([c, d]) => (
            <span key={c} style={{ display: 'contents' }}>
              <span className="t-cmd">{c}</span>
              <span className="dim">{d}</span>
            </span>
          ))}
        </div>
      )
    case 'whoami':
      return ru
        ? 'van1dal — Go backend developer из Санкт-Петербурга. Пишу REST-сервисы, TUI и свой IDE.'
        : 'van1dal — Go backend developer from Saint Petersburg. REST services, TUIs and my own IDE.'
    case 'ls':
    case 'projects':
      return (
        <div className="t-grid">
          {projects.map(p => (
            <span key={p.name} style={{ display: 'contents' }}>
              <span className="t-cmd">{p.name}/</span>
              <span className="dim">{p.tagline[lang]}</span>
            </span>
          ))}
        </div>
      )
    case 'open': {
      const p = projects.find(p => p.name.toLowerCase() === (args[0] ?? '').toLowerCase())
      if (!p) return ru ? `не нашёл проект "${args[0] ?? ''}". попробуй: projects` : `no project "${args[0] ?? ''}". try: projects`
      setTimeout(() => (location.hash = href.project(p.name)), 400)
      return `→ ${p.name}`
    }
    case 'stack':
      return stack.join(' · ')
    case 'contact':
      return (
        <div>
          <div>
            email: <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          </div>
          <div>
            github: <a href={contacts.github} target="_blank" rel="noreferrer">{contacts.github}</a>
          </div>
        </div>
      )
    case 'sudo':
      if (args[0] === 'hire-me') {
        setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 900)
        return <span className="ok">{ru ? '[sudo] пароль принят ✓ перенаправляю к контактам…' : '[sudo] access granted ✓ taking you to contacts…'}</span>
      }
      return <span className="bad">{ru ? 'van1dal не в файле sudoers. Об этом будет доложено.' : 'van1dal is not in the sudoers file. This incident will be reported.'}</span>
    case 'cv':
      setTimeout(() => (location.hash = href.cv), 400)
      return '→ cv'
    case 'blog':
      setTimeout(() => (location.hash = href.blog), 400)
      return '→ blog'
    case 'go':
      if (args[0] === 'run' && args[1] === 'gopher') return <pre className="gopher">{gopher(ru)}</pre>
      if (args[0] === 'version') return 'go version go1.27 darwin/arm64'
      return ru ? 'попробуй: go run gopher' : 'try: go run gopher'
    case 'clear':
      return 'clear'
    case 'rm':
      return <span className="bad">{ru ? 'хорошая попытка 🙂' : 'nice try 🙂'}</span>
    case 'vim':
    case 'nvim':
      return ru ? 'тут только ownvim. и выйти из него проще: :q' : 'only ownvim here. and exiting is easy: :q'
    default:
      return <span className="bad">{ru ? `команда не найдена: ${cmd}. набери help` : `command not found: ${cmd}. type help`}</span>
  }
}

export default function Terminal() {
  const { t, lang } = useLang()
  const [history, setHistory] = useState<Entry[]>([])
  const [input, setInput] = useState('')
  const [past, setPast] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const body = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHistory([{ cmd: 'whoami', out: run('whoami', lang) }])
  }, [lang])

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: 'smooth' })
  }, [history])

  const exec = (cmd: string) => {
    const out = run(cmd, lang)
    if (out === 'clear') setHistory([])
    else setHistory(h => [...h, { cmd, out }])
    if (cmd.trim()) setPast(p => [cmd, ...p])
    setCursor(-1)
    setInput('')
  }

  return (
    <section id="terminal" className="section">
      <Heading index="04" title={t(ui.terminal.title)} sub={t(ui.terminal.sub)} />
      <Reveal className="terminal">
        <div className="window-bar">
          <i /> <i /> <i /> <span className="mono">van1dal@portfolio: ~</span>
        </div>
        <div className="term-body mono" ref={body} onClick={() => inputRef.current?.focus({ preventScroll: true })}>
          {history.map((e, i) => (
            <div key={i} className="term-entry">
              <div>
                <span className="prompt">❯</span> {e.cmd}
              </div>
              {e.out && <div className="term-out">{e.out}</div>}
            </div>
          ))}
          <form
            className="term-input"
            onSubmit={e => {
              e.preventDefault()
              exec(input)
            }}
          >
            <span className="prompt">❯</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'ArrowUp' && past.length) {
                  e.preventDefault()
                  const n = Math.min(cursor + 1, past.length - 1)
                  setCursor(n)
                  setInput(past[n])
                }
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  const n = cursor - 1
                  setCursor(Math.max(n, -1))
                  setInput(n >= 0 ? past[n] : '')
                }
              }}
              spellCheck={false}
              autoComplete="off"
              aria-label="terminal input"
            />
          </form>
        </div>
        <div className="term-quick">
          {quick.map(q => (
            <button key={q} className="mono" onClick={() => exec(q)}>
              {q}
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
