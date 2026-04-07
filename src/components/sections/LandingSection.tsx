import { motion } from 'framer-motion'

export const LandingSection = () => (
  <section className="section-shell flex flex-col justify-center">
    <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.25, duration: 1 }} className="text-4xl md:text-6xl font-semibold tracking-tight">
      You are already being observed.
    </motion.h1>
    <p className="mt-4 text-xl text-slate-400">This space is not random.</p>
    <button className="mt-8 glass-panel w-fit px-6 py-3 text-sigil transition delay-150 hover:shadow-[0_0_28px_rgba(124,158,255,0.35)]">Proceed</button>
  </section>
)
