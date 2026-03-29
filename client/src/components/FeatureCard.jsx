const FeatureCard = ({ icon: Icon, title, description, tags, children }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group overflow-hidden relative">
    <div className="absolute top-0 right-0 p-8 bg-primary/10 blur-[50px] rounded-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="mb-4 p-2 bg-black/30 border border-white/30 w-fit rounded-lg transition-colors">
      <Icon className="text-gray-200" size={20} />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
    {tags && (
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium bg-white/5 text-slate-500 px-2 py-1 rounded-md border border-white/5 uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
    {children}
  </div>
);

export default FeatureCard;