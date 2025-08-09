"use client";

import Link from 'next/link';

export default function LandingPage() {

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = link.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';

    link.appendChild(ripple);

    ripple.onanimationend = () => {
      ripple.remove();
    };
  };

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
          onClick={handleClick}
          className="inline-block relative overflow-hidden px-8 py-3 rounded-lg bg-primary text-primary-foreground text-lg font-semibold shadow-md transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-100"
        >
          Enter
        </Link>
      </div>
    </div>
  );
}
