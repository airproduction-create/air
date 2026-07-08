import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealText } from '../ui/RevealText'

const faqs = [
  {
    q: 'How is AIR different from a traditional studio?',
    a: "We don't make content — we reveal what's already true. Every engagement starts with the real problem beneath the brief, not the brief itself. The job isn't to construct a message; it's to excavate the one that was already there.",
  },
  {
    q: 'What does "AI-native" actually mean here?',
    a: 'Our production workflows are built around AI from concept to delivery — compressing timelines without compressing thought. AI is a tool for revelation, not decoration. If the AI is visible in the work, we haven\'t used it correctly.',
  },
  {
    q: 'Who do you work with?',
    a: 'Creative agencies who need production without compromise, corporate communications teams with a story they haven\'t told yet, and production companies who want to move faster without losing the plot.',
  },
  {
    q: 'How much does it cost?',
    a: "Every engagement is bespoke — we scope to the problem, not a package. There are no fixed tiers because no two revelations are the same. Tell us what you're trying to reveal and we'll shape the right engagement around it.",
  },
  {
    q: 'How does an engagement begin?',
    a: 'With a conversation about the real problem — a strategic conversation, not a pitch. We respond within 24 hours, and the first meeting is about your audience, your constraints, and what might be hiding beneath the obvious answer.',
  },
  {
    q: 'Where are you based?',
    a: 'Remote, working with clients across three continents. Distance has never been the constraint — clarity is.',
  },
]

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        data-cursor
        className="w-full flex items-center gap-6 py-7 text-left group"
        aria-expanded={open}
      >
        <span className="font-mono text-xs text-muted group-hover:text-gold transition-colors shrink-0 w-8">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-display text-xl lg:text-2xl font-medium text-cream group-hover:text-gold transition-colors flex-1">
          {q}
        </span>
        <motion.span
          className="shrink-0 text-gold text-2xl leading-none w-6 text-center"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-cream-dim leading-relaxed pb-8 pl-14 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="bg-void py-28 lg:py-40 border-t border-border">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left heading */}
          <div className="lg:col-span-4">
            <RevealText>
              <span className="font-mono text-xs text-gold tracking-ultra uppercase block mb-6">
                / FAQ
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-medium text-cream leading-[1.05]">
                Got questions?<br />
                <span className="text-muted">We've got answers.</span>
              </h2>
            </RevealText>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
