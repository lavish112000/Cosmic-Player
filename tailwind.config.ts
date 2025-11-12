/**
 * Tailwind CSS Configuration File
 * Customizes the Tailwind CSS framework for the Cosmic Player theme
 * Includes: custom colors, fonts, animations, and design tokens
 *
 * Learn more: https://tailwindcss.com/docs/configuration
 */

import type { Config } from 'tailwindcss';

export default {
  // Enable dark mode using the 'class' strategy (add 'dark' class to html element)
  darkMode: ['class'],

  // Specify which files Tailwind should scan for class names
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    // Container configuration for responsive layouts
    container: {
      center: true, // Center containers by default
      padding: '2rem', // Add padding inside containers
      screens: {
        '2xl': '1400px', // Max width for 2xl breakpoint
      },
    },

    extend: {
      /* ===== CUSTOM FONTS ===== */
      fontFamily: {
        body: ['Inter', 'sans-serif'], // Body text font
        headline: ['"Space Grotesk"', 'sans-serif'], // Headings font
        code: ['monospace'], // Code/monospace font
      },

      /* ===== CUSTOM COLORS ===== */
      // Uses CSS variables defined in globals.css for easy theme switching
      colors: {
        // Base colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Component colors
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Cosmic Theme Colors
        cosmic: {
          purple: 'hsl(var(--cosmic-purple))',
          pink: 'hsl(var(--cosmic-pink))',
          blue: 'hsl(var(--cosmic-blue))',
          cyan: 'hsl(var(--cosmic-cyan))',
          green: 'hsl(var(--cosmic-green))',
          orange: 'hsl(var(--cosmic-orange))',
          red: 'hsl(var(--cosmic-red))',
          yellow: 'hsl(var(--cosmic-yellow))',
        },
        // Ambient Colors
        ambient: {
          primary: 'hsl(var(--ambient-primary))',
          secondary: 'hsl(var(--ambient-secondary))',
          accent: 'hsl(var(--ambient-accent))',
          glow: 'hsl(var(--ambient-glow))',
        },
      },

      /* ===== CUSTOM ANIMATIONS ===== */
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'ambient-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%': {
            boxShadow:
              '0 0 20px hsl(var(--cosmic-purple) / 0.3), 0 0 40px hsl(var(--cosmic-purple) / 0.2)',
          },
          '100%': {
            boxShadow:
              '0 0 30px hsl(var(--cosmic-purple) / 0.6), 0 0 60px hsl(var(--cosmic-purple) / 0.4), 0 0 90px hsl(var(--cosmic-purple) / 0.2)',
          },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ambient-rotate': 'ambient-rotate 8s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fade-in 0.8s ease-out',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
