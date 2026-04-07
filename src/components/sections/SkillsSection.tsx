export const SkillsSection = ({ clusters }: { clusters: Record<string, string[]> }) => (
  <section className="section-shell">
    <h2 className="text-3xl mb-8">Constellation Network</h2>
    <div className="grid gap-5 md:grid-cols-2">
      {Object.entries(clusters).map(([category, skills]) => (
        <div key={category} className="glass-panel p-6">
          <h3 className="text-xl text-sigil">{category}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-slate-400/35 px-3 py-1 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
)
