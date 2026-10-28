import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { contacts, ui } from '../data'
import { useLang } from '../i18n'
import { Heading, Reveal } from './Section'

export default function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contacts.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  const links = [
    { label: 'GitHub', href: contacts.github, icon: <GithubIcon /> },
    { label: 'Email', href: `mailto:${contacts.email}`, icon: <MailIcon /> },
  ]

  return (
    <section id="contact" className="section contact">
      <Heading index="05" title={t(ui.contact.title)} sub={t(ui.contact.sub)} />
      <Reveal className="contact-mail">
        <a href={`mailto:${contacts.email}`} className="big-mail">
          {contacts.email}
        </a>
        <button className="copy mono" onClick={copy}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? 'y' : 'n'}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
            >
              {copied ? t(ui.contact.copied) : t(ui.contact.copy)}
            </motion.span>
          </AnimatePresence>
        </button>
      </Reveal>
      <div className="socials">
        {links.map((l, i) => (
          <Reveal key={l.label} delay={0.1 + i * 0.05}>
            <a href={l.href} target="_blank" rel="noreferrer" className="social">
              {l.icon}
              <span>{l.label}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}
