import { motion } from 'framer-motion'
import { ui } from '../data'
import { useLang } from '../i18n'
import HeroArt from './HeroArt'
import LiveStatus from './LiveStatus'

function Word({ text, from, accentFirst }: { text: string; from: number; accentFirst?: boolean }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className={`hero-ch ${accentFirst && i === 0 ? 'hero-accent' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: (from + i) * 0.035, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            scaleX: [1, 1.35, 0.8, 1.12, 0.95, 1],
            scaleY: [1, 0.75, 1.2, 0.88, 1.05, 1],
            color: 'var(--accent)',
            transition: { duration: 0.8 },
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </>
  )
}

export default function Hero() {
  const { t } = useLang()
  const l1 = t(ui.hero.line1)
  const l2 = t(ui.hero.line2)
  const l3 = t(ui.hero.line3)

  return (
    <section className="hero" id="top">
      <span className="tag-deco tag-body mono">&lt;body&gt;</span>
      <div className="hero-text">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <LiveStatus />
        </motion.div>
        <span className="tag-deco mono">&lt;h1&gt;</span>
        <h1 aria-label={`${l1} ${l2} van1dal, ${l3}`}>
          <span className="hero-line">
            <Word text={l1} from={0} />
          </span>
          <span className="hero-line">
            <Word text={`${l2} `} from={l1.length} />
            <Word text="van1dal," from={l1.length + l2.length + 1} accentFirst />
          </span>
          <span className="hero-line">
            <Word text={l3} from={l1.length + l2.length + 10} />
          </span>
        </h1>
        <span className="tag-deco tag-close mono">&lt;/h1&gt;</span>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {t(ui.hero.tagline)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <a href="#contact" className="btn-outline">
            <span>{t(ui.hero.ctaContact)}</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-art-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <HeroArt />
      </motion.div>
    </section>
  )
}
