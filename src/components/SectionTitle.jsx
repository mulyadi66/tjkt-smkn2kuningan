export default function SectionTitle({ subtitle, title, description, center = true }) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
      {subtitle && (
        <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-800 mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-slate-600 text-lg max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
