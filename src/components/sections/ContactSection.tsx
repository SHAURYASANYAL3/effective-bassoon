export const ContactSection = () => (
  <section className="section-shell">
    <h2 className="text-3xl mb-8">Control Terminal</h2>
    <form className="glass-panel max-w-2xl space-y-4 p-8">
      <label className="block">
        <span className="text-sm text-slate-400">Identify yourself</span>
        <input className="mt-2 w-full rounded-xl border border-slate-500/40 bg-slate-900/40 p-3 outline-none focus:shadow-[0_0_24px_rgba(124,158,255,0.25)]" />
      </label>
      <label className="block">
        <span className="text-sm text-slate-400">State your intent</span>
        <textarea rows={5} className="mt-2 w-full rounded-xl border border-slate-500/40 bg-slate-900/40 p-3 outline-none focus:shadow-[0_0_24px_rgba(124,158,255,0.25)]" />
      </label>
      <button type="button" className="rounded-xl border border-sigil/55 px-6 py-3 text-sigil transition delay-150 hover:bg-sigil/10">
        Transmit
      </button>
    </form>
  </section>
)
