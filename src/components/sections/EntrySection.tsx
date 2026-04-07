import { motion } from 'framer-motion'

export const EntrySection = ({ lines }: { lines: string[] }) => (
  <section className="section-shell flex items-center">
    <div className="space-y-4">
      {lines.map((line, index) => (
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.55, duration: 0.6 }}
          className="text-lg text-slate-300"
        >
          {line}
        </motion.p>
      ))}
    </div>
  </section>
)
