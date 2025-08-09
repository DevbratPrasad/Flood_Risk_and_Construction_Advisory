"use client";

import Link from 'next/link';

export default function LandingPage() {

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget;
    // The ripple effect needs a container with position: relative or similar.
    // The link itself needs overflow: hidden.
    link.style.position = 'relative';
    link.style.overflow = 'hidden';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 text-foreground p-4">
      <div className="text-center bg-card/80 backdrop-blur-sm p-10 rounded-xl shadow-2xl border">
        <div className="text-6xl mb-4">🌊</div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight">
          Flood Risk & Construction Advisory
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your comprehensive guide to flood safety and resilient building.
        </p>
        <Link 
          href="/dashboard"
          onClick={handleClick}
          className="inline-block mt-8 px-10 py-4 bg-secondary text-secondary-foreground rounded-lg text-2xl font-bold hover:bg-secondary/80 active:bg-white active:text-black transition-all duration-300 ease-in-out hover:scale-110 shadow-lg"
        >
          Enter
        </Link>
      </div>
    </div>
  );
}
