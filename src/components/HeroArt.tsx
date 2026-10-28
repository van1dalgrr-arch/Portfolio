import { motion } from 'framer-motion'

const lines = [
  { x1: 175, x2: 335, y: 128 },
  { x1: 160, x2: 345, y: 160 },
  { x1: 148, x2: 358, y: 192 },
  { x1: 175, x2: 335, y: 224 },
  { x1: 160, x2: 345, y: 256 },
  { x1: 148, x2: 358, y: 288 },
  { x1: 118, x2: 392, y: 320 },
  { x1: 50, x2: 460, y: 352 },
]

const ease = [0.65, 0, 0.35, 1] as const

function Orbit({ cx, cy, r, duration, reverse, accent }: { cx: number; cy: number; r: number; duration: number; reverse?: boolean; accent?: boolean }) {
  return (
    <motion.g
      style={{ originX: `${cx}px`, originY: `${cy}px` }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx={cx} cy={cy - r} r={5} className={accent ? 'art-dot accent-fill' : 'art-dot'} />
    </motion.g>
  )
}

export default function HeroArt() {
  return (
    <svg viewBox="0 0 500 470" className="hero-art" aria-hidden>
      <motion.circle
        cx={180} cy={240} r={135} className="art-circle"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease }}
      />
      <motion.circle
        cx={340} cy={240} r={135} className="art-circle"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease }}
      />

      {lines.map((l, i) => (
        <motion.line
          key={i}
          x1={l.x1} x2={l.x2} y1={l.y} y2={l.y}
          className={i === lines.length - 1 ? 'art-line art-line-base' : 'art-line'}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0.55, 1] }}
          transition={{
            duration: 6,
            times: [0, 0.18, 0.55, 0.75, 1],
            delay: 0.6 + i * 0.12,
            repeat: Infinity,
            repeatDelay: 1,
            ease,
          }}
        />
      ))}

      <Orbit cx={180} cy={240} r={135} duration={18} />
      <Orbit cx={340} cy={240} r={135} duration={24} reverse accent />
      <motion.circle
        cx={260} cy={240} r={5} className="art-dot accent-fill"
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
    </svg>
  )
}
