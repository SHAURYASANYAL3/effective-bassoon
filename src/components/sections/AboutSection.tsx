import { motion } from 'framer-motion'

export const AboutSection = ({ fragments }: { fragments: string[] }) => (
  <section className="section-shell">
    <h2 className="text-3xl mb-8">Memory Fragments</h2>
    <div className="grid gap-4 md:grid-cols-2">
      {fragments.map((fragment, index) => (
        <motion.div
          key={fragment}
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.15, duration: 0.8 }}
        >
          {fragment}
        </motion.div>
      ))}
    </div>
  </section>
)
