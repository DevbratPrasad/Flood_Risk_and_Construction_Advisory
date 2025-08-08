import Link from 'next/link';
import Image from 'next/image';
import { Waves } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <Image
        src="https://storage.googleapis.com/aifirebase/images/pS0v5yA7Xo_river_body.png"
        alt="A wide river flowing through a green valley under a blue sky."
        data-ai-hint="river body"
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
