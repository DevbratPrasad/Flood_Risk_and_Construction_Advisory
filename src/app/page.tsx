import Link from 'next/link';
import { Waves } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Flood statue"
        data-ai-hint="flood statue"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 text-center p-4">
        <Waves className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
          Flood Risk & Construction Advisory
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
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
  );
}
