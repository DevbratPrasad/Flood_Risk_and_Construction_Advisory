import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center p-4">
        <span className="text-6xl mx-auto mb-4">🌊</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
          Flood Risk & Construction Advisory
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your guide to flood safety and resilient construction.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground text-lg font-semibold shadow-md transition-colors duration-200 hover:bg-primary/90"
        >
          Enter
        </Link>
      </div>
    </div>
  );
}
