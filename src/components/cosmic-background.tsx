"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function CosmicBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className={cn("absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10")} />
      <div className={cn("absolute inset-0", "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),rgba(255,255,255,0))]")} />
      
      <div className="absolute h-full w-full animate-[spin_20s_linear_infinite] bg-[url('https://firebasestudio-hosting-f2553.web.app/codegeneration/5b214227-99f5-4752-b816-834f40f04c63/assets/stars.svg')] opacity-30" />
      
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%] top-[-20%] h-[200%] w-[200%] animate-[translate_15s_ease_infinite] bg-[radial-gradient(circle_farthest-side,hsl(var(--accent)/0.1),hsl(var(--accent)/0))]"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%] top-[-20%] h-[200%] w-[200%] animate-[translate_15s_ease_infinite] bg-[radial-gradient(circle_farthest-side,hsl(var(--primary)/0.05),hsl(var(--primary)/0))]"
        style={{ animationDelay: '-7.5s' }}
      />

      <style jsx>{`
        @keyframes translate {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10%, -15%) rotate(5deg);
          }
          50% {
            transform: translate(-15%, 10%) rotate(-3deg);
          }
          75% {
            transform: translate(5%, 10%) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}
