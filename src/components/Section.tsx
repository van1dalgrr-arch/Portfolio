import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function Heading({ index, title, sub }: { index: string; title: string; sub?: string }) {
  return (
    <Reveal className="heading">
      <span className="tag-deco mono">&lt;h2&gt;</span>
      <h2>
        <span className="heading-index mono">{index}.</span> {title}
      </h2>
      {sub && <p className="heading-sub">{sub}</p>}
    </Reveal>
  )
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
