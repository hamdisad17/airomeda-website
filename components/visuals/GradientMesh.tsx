export function GradientMesh({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="animate-mesh-drift absolute -top-1/4 -left-1/4 h-[140%] w-[140%]"
        style={{
          background: `
            radial-gradient(circle at 25% 30%, hsl(244 76% 75% / 0.3), transparent 40%),
            radial-gradient(circle at 75% 20%, hsl(280 70% 80% / 0.25), transparent 45%),
            radial-gradient(circle at 50% 80%, hsl(220 80% 80% / 0.2), transparent 50%)
          `,
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
