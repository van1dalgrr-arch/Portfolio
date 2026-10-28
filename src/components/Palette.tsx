import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { contacts, projects, ui } from '../data'
import { useLang } from '../i18n'
import { href } from '../router'

type Item = { group: string; label: string; hint?: string; run: () => void }

export const openPalette = () => dispatchEvent(new Event('palette:open'))

export default function Palette() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    addEventListener('keydown', onKey)
    addEventListener('palette:open', onOpen)
    return () => {
      removeEventListener('keydown', onKey)
      removeEventListener('palette:open', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => (location.hash = id)
    return [
      ...(['about', 'projects', 'activity', 'terminal', 'contact'] as const).map(id => ({
        group: t(ui.palette.sections),
        label: t(ui.nav[id]),
        hint: `#${id}`,
        run: go(id),
      })),
      { group: t(ui.palette.sections), label: t(ui.pages.cv), hint: href.cv, run: () => (location.hash = href.cv) },
      { group: t(ui.palette.sections), label: t(ui.pages.blog), hint: href.blog, run: () => (location.hash = href.blog) },
      ...projects.map(p => ({
        group: t(ui.palette.projects),
        label: p.name,
        hint: t(p.tagline),
        run: () => (location.hash = href.project(p.name)),
      })),
      { group: t(ui.palette.actions), label: t(ui.palette.copyEmail), hint: contacts.email, run: () => navigator.clipboard?.writeText(contacts.email) },
      { group: t(ui.palette.actions), label: 'GitHub', hint: contacts.github.replace('https://', ''), run: () => window.open(contacts.github, '_blank', 'noopener') },
      { group: t(ui.palette.actions), label: t(ui.palette.switchLang), hint: lang === 'ru' ? 'EN' : 'RU', run: () => setLang(lang === 'ru' ? 'en' : 'ru') },
    ]
  }, [t, lang, setLang])

  const filtered = items.filter(i => `${i.label} ${i.hint ?? ''}`.toLowerCase().includes(query.toLowerCase()))

  const select = (i: Item | undefined) => {
    if (!i) return
    setOpen(false)
    i.run()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="palette-input">
              <span className="accent mono">❯</span>
              <input
                ref={inputRef}
                value={query}
                placeholder={t(ui.palette.placeholder)}
                onChange={e => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setActive(a => Math.min(a + 1, filtered.length - 1))
                  }
                  if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setActive(a => Math.max(a - 1, 0))
                  }
                  if (e.key === 'Enter') select(filtered[active])
                }}
                spellCheck={false}
              />
              <kbd>esc</kbd>
            </div>
            <div className="palette-list">
              {filtered.length === 0 && <div className="palette-empty dim">{t(ui.palette.empty)}</div>}
              {filtered.map((item, i) => (
                <div key={item.group + item.label}>
                  {(i === 0 || filtered[i - 1].group !== item.group) && <div className="palette-group mono">{item.group}</div>}
                  <button
                    className={`palette-item ${i === active ? 'on' : ''}`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(item)}
                  >
                    <span>{item.label}</span>
                    {item.hint && <span className="dim palette-hint">{item.hint}</span>}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
