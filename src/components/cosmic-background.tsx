/**
 * Cosmic Background Component
 * Creates an animated space-themed background with:
 * - Twinkling stars
 * - Floating nebula clouds
 * - Ambient light orbs
 * - Floating particles
 * - Energy waves
 * - Holographic grid
 * - Cosmic dust effects
 */

'use client';

import React, { useState, useEffect } from 'react';

export function CosmicBackground() {
  // State to store randomly generated particle positions
  // Generated on client-side only to avoid hydration mismatch between server and client
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      animationDelay: string;
      animationDuration: string;
    }>
  >([]);

  // Generate particles only after component mounts (client-side only)
  useEffect(() => {
    // Generate 50 particles with random positions and animation timings
    setParticles(
      Array.from({ length: 50 }).map(() => ({
        left: `${Math.random() * 100}%`, // Random horizontal position
        top: `${Math.random() * 100}%`, // Random vertical position
        animationDelay: `${Math.random() * 15}s`, // Random start time
        animationDuration: `${10 + Math.random() * 10}s`, // Random speed (10-20s)
      }))
    );
  }, []);

  return (
    // Fixed background layer (stays behind all content)
    <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* ===== ANIMATED STAR FIELD ===== */}
      {/* Three layers of stars (small, medium, large) with twinkling animation */}
      <div className="absolute inset-0">
        <div className="stars-small animate-[twinkle_4s_ease-in-out_infinite]" />
        <div className="stars-medium animate-[twinkle_6s_ease-in-out_infinite_reverse]" />
        <div className="stars-large animate-[twinkle_8s_ease-in-out_infinite]" />
      </div>

      {/* ===== DYNAMIC NEBULA EFFECTS ===== */}
      {/* Four colored gradient clouds that slowly drift across the screen */}
      <div className="absolute inset-0">
        <div className="bg-gradient-radial absolute left-0 top-0 h-full w-full animate-[drift_15s_ease-in-out_infinite] from-cosmic-purple/20 via-transparent to-transparent" />
        <div className="bg-gradient-radial absolute right-0 top-0 h-full w-full animate-[drift_20s_ease-in-out_infinite_reverse] from-cosmic-pink/15 via-transparent to-transparent" />
        <div className="bg-gradient-radial from-cosmic-blue/18 absolute bottom-0 left-0 h-full w-full animate-[drift_18s_ease-in-out_infinite] via-transparent to-transparent" />
        <div className="bg-gradient-radial from-cosmic-cyan/12 absolute bottom-0 right-0 h-full w-full animate-[drift_25s_ease-in-out_infinite_reverse] via-transparent to-transparent" />
      </div>

      {/* ===== AMBIENT LIGHT ORBS ===== */}
      {/* Large blurred circles that float gently, creating depth */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-[float_8s_ease-in-out_infinite] rounded-full bg-cosmic-purple/10 blur-3xl" />
        <div className="bg-cosmic-pink/8 absolute right-1/4 top-3/4 h-80 w-80 animate-[float_10s_ease-in-out_infinite_reverse] rounded-full blur-3xl" />
        <div className="bg-cosmic-blue/12 absolute bottom-1/4 left-1/3 h-72 w-72 animate-[float_12s_ease-in-out_infinite] rounded-full blur-3xl" />
        <div className="absolute right-1/3 top-1/3 h-64 w-64 animate-[float_9s_ease-in-out_infinite_reverse] rounded-full bg-cosmic-cyan/10 blur-3xl" />
      </div>

      {/* ===== PARTICLE SYSTEM ===== */}
      {/* 50 small dots that float upward like dust in space */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 animate-[particle-float_15s_linear_infinite] rounded-full bg-white opacity-60"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      {/* ===== ENERGY WAVES ===== */}
      {/* Expanding circular waves that pulse outward */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 scale-50 animate-[energy-wave_4s_ease-in-out_infinite] rounded-full border border-cosmic-purple/20" />
        <div className="absolute inset-0 scale-75 animate-[energy-wave_6s_ease-in-out_infinite_reverse] rounded-full border border-cosmic-pink/15" />
        <div className="border-cosmic-blue/18 scale-25 absolute inset-0 animate-[energy-wave_5s_ease-in-out_infinite] rounded-full border" />
      </div>

      {/* ===== HOLOGRAPHIC GRID ===== */}
      {/* Subtle grid pattern for a sci-fi hologram effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 animate-[grid-shift_20s_linear_infinite] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* ===== COSMIC DUST ===== */}
      {/* Flowing gradient bands for atmospheric depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-[dust-flow_30s_linear_infinite] bg-gradient-to-r from-transparent via-cosmic-purple/5 to-transparent" />
        <div className="via-cosmic-pink/3 absolute inset-0 animate-[dust-flow_25s_linear_infinite_reverse] bg-gradient-to-l from-transparent to-transparent" />
      </div>

      {/* ===== CUSTOM ANIMATIONS AND STYLES ===== */}
      <style jsx>{`
        /* Small star field pattern - creates tiny twinkling stars */
        .stars-small {
          background-image:
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(
              2px 2px at 40px 70px,
              rgba(255, 255, 255, 0.8),
              transparent
            ),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(
              1px 1px at 130px 80px,
              rgba(255, 255, 255, 0.6),
              transparent
            ),
            radial-gradient(2px 2px at 160px 30px, #eee, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          width: 100%;
          height: 100%;
        }

        /* Medium star field pattern - slightly larger stars */
        .stars-medium {
          background-image:
            radial-gradient(3px 3px at 50px 80px, #fff, transparent),
            radial-gradient(
              2px 2px at 100px 120px,
              rgba(255, 255, 255, 0.9),
              transparent
            ),
            radial-gradient(3px 3px at 150px 60px, #eee, transparent);
          background-repeat: repeat;
          background-size: 300px 150px;
          width: 100%;
          height: 100%;
        }

        /* Large star field pattern - biggest, brightest stars */
        .stars-large {
          background-image:
            radial-gradient(
              4px 4px at 80px 100px,
              rgba(255, 255, 255, 0.7),
              transparent
            ),
            radial-gradient(3px 3px at 200px 140px, #fff, transparent);
          background-repeat: repeat;
          background-size: 400px 200px;
          width: 100%;
          height: 100%;
        }

        /* Twinkle animation - stars fade in and out */
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        /* Drift animation - nebula clouds move and scale smoothly */
        @keyframes drift {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(10%, -15%) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-15%, 10%) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translate(5%, 10%) scale(1.05);
            opacity: 0.6;
          }
        }

        /* Particle float animation - particles rise upward and fade */
        @keyframes particle-float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        /* Energy wave animation - circles expand and fade out */
        @keyframes energy-wave {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes grid-shift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes dust-flow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
