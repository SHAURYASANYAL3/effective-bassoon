import { motion } from 'framer-motion'

type Project = {
  title: string
  purpose: string
  tech: string[]
  outcome: string
  link: string
  mesh: string
}

export const ProjectsSection = ({ items }: { items: Project[] }) => (
  <section className="section-shell">
    <h2 className="text-3xl mb-8">Artifacts</h2>
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.article
          key={item.title}
          className="glass-panel p-6"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + index * 0.18, duration: 0.7 }}
          whileHover={{ y: -8, boxShadow: '0 0 36px rgba(124,158,255,0.32)' }}
        >
          <p className="text-sm text-slate-400 uppercase tracking-[0.2em]">{item.mesh}</p>
          <h3 className="mt-2 text-xl">{item.title}</h3>
          <p className="mt-3 text-slate-300">{item.purpose}</p>
          <p className="mt-2 text-slate-400 text-sm">{item.outcome}</p>
          <p className="mt-4 text-sm text-slate-500">{item.tech.join(' • ')}</p>
          <a className="mt-6 inline-block text-sigil hover:underline" href={item.link} target="_blank" rel="noreferrer">
            Open GitHub artifact
          </a>
        </motion.article>
      ))}
    </div>
  </section>
)
