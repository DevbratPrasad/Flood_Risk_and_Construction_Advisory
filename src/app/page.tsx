import Link from 'next/link';
import { Waves } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col items-center justify-center bg-muted/40 p-4 text-center">
        <div className="max-w-md">
          <Waves className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
            Flood Risk & Construction Advisory
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your guide to flood safety and resilient construction.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 rounded-lg bg-secondary text-secondary-foreground text-lg font-semibold shadow-md transition-colors duration-200 hover:bg-muted active:bg-card active:text-card-foreground"
          >
            Enter
          </Link>
        </div>
      </div>
      <div className="hidden flex-1 bg-muted/80 lg:block" />
    </div>
  );
}
