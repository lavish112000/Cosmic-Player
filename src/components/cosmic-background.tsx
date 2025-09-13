"use client";

import React from "react";

export function CosmicBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Star Field */}
      <div className="absolute inset-0">
        <div className="stars-small animate-[twinkle_4s_ease-in-out_infinite]" />
        <div className="stars-medium animate-[twinkle_6s_ease-in-out_infinite_reverse]" />
        <div className="stars-large animate-[twinkle_8s_ease-in-out_infinite]" />
      </div>

      {/* Dynamic Nebula Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-cosmic-purple/20 via-transparent to-transparent animate-[drift_15s_ease-in-out_infinite]" />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-cosmic-pink/15 via-transparent to-transparent animate-[drift_20s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-radial from-cosmic-blue/18 via-transparent to-transparent animate-[drift_18s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-cosmic-cyan/12 via-transparent to-transparent animate-[drift_25s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Ambient Light Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-purple/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-cosmic-pink/8 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cosmic-blue/12 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cosmic-cyan/10 rounded-full blur-3xl animate-[float_9s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Particle System */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-[particle-float_15s_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Energy Waves */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 border border-cosmic-purple/20 rounded-full scale-50 animate-[energy-wave_4s_ease-in-out_infinite]" />
        <div className="absolute inset-0 border border-cosmic-pink/15 rounded-full scale-75 animate-[energy-wave_6s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-0 border border-cosmic-blue/18 rounded-full scale-25 animate-[energy-wave_5s_ease-in-out_infinite]" />
      </div>

      {/* Holographic Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-[grid-shift_20s_linear_infinite]" />
      </div>

      {/* Cosmic Dust */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-purple/5 to-transparent animate-[dust-flow_30s_linear_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cosmic-pink/3 to-transparent animate-[dust-flow_25s_linear_infinite_reverse]" />
      </div>

      <style jsx>{`
        .stars-small {
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                            radial-gradient(2px 2px at 160px 30px, #eee, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          width: 100%;
          height: 100%;
        }

        .stars-medium {
          background-image: radial-gradient(3px 3px at 50px 80px, #fff, transparent),
                            radial-gradient(2px 2px at 100px 120px, rgba(255,255,255,0.9), transparent),
                            radial-gradient(3px 3px at 150px 60px, #eee, transparent);
          background-repeat: repeat;
          background-size: 300px 150px;
          width: 100%;
          height: 100%;
        }

        .stars-large {
          background-image: radial-gradient(4px 4px at 80px 100px, rgba(255,255,255,0.7), transparent),
                            radial-gradient(3px 3px at 200px 140px, #fff, transparent);
          background-repeat: repeat;
          background-size: 400px 200px;
          width: 100%;
          height: 100%;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes drift {
          0%, 100% {
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
