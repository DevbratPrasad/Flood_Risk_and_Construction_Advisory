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
        <Link 
          href="/dashboard"
        >
          <span className="text-9xl">🌊</span>
        </Link>
      </div>
    </div>
  );
}
