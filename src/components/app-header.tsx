/**
 * App Header Component
 * The top navigation bar of the application
 * Features: Logo, navigation links, mobile menu, and user profile dropdown
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Next.js optimized navigation
import { LCIcon } from '@/components/icons'; // Custom logo icon
// UI Components
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu } from 'lucide-react'; // Hamburger menu icon

/**
 * Main App Header Component
 */
export function AppHeader() {
  // State to control mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation menu links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
    { href: '/library', label: 'Library' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    // Sticky header that stays at top when scrolling
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-black/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* ===== DESKTOP NAVIGATION (hidden on mobile) ===== */}
        <div className="mr-4 hidden md:flex">
          {/* Logo and brand name */}
          <Link href="/" className="group mr-8 flex items-center space-x-3">
            <div className="relative">
              {/* Animated logo icon */}
              <LCIcon className="h-8 w-8 text-cosmic-purple drop-shadow-[0_0_10px_hsl(var(--cosmic-purple))] transition-colors duration-300 group-hover:text-cosmic-pink" />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 h-8 w-8 animate-pulse-glow rounded-full bg-cosmic-purple/20 blur-md" />
            </div>
            <span className="text-gradient font-headline text-xl font-bold transition-transform duration-300 group-hover:scale-105">
              Cosmic Player
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover-lift hover-glow group relative rounded-lg px-3 py-2 text-white/70 transition-all duration-300 hover:text-cosmic-cyan"
              >
                <span className="relative z-10">{link.label}</span>
                {/* Hover background gradient effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cosmic-purple/0 via-cosmic-purple/10 to-cosmic-purple/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
        </div>

        {/* ===== MOBILE MENU (visible only on mobile) ===== */}
        <div className="md:hidden">
          {/* Sheet component creates a slide-in drawer */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              {/* Hamburger menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="hover-glow hover-lift bouncy-click h-12 w-12 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-cosmic-purple/50 hover:bg-white/20"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            {/* Mobile menu drawer content */}
            <SheetContent
              side="left"
              className="border-r border-white/20 bg-black/90 text-white backdrop-blur-2xl"
            >
              {/* Mobile logo */}
              <Link
                href="/"
                className="group mb-6 flex items-center space-x-3 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative">
                  <LCIcon className="h-8 w-8 text-cosmic-purple transition-colors duration-300 group-hover:text-cosmic-pink" />
                  <div className="absolute inset-0 h-8 w-8 animate-pulse-glow rounded-full bg-cosmic-purple/20 blur-md" />
                </div>
                <span className="text-gradient font-headline text-xl font-bold">
                  Cosmic Player
                </span>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-lg px-3 py-2 text-white/70 transition-colors duration-300 hover:bg-white/10 hover:text-cosmic-cyan"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Status Indicator */}
          <div className="hidden items-center space-x-2 md:flex">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cosmic-green" />
            <span className="text-xs text-white/60">Online</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover-glow hover-lift bouncy-click relative h-10 w-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:border-cosmic-purple/50 hover:bg-white/20"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    alt="User"
                  />
                  <AvatarFallback className="bg-cosmic-purple text-white">
                    U
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 border border-white/20 bg-black/90 backdrop-blur-2xl"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="border-b border-white/10 font-normal">
                <div className="flex flex-col space-y-2 p-2">
                  <p className="text-sm font-medium leading-none text-white">
                    Cosmic Explorer
                  </p>
                  <p className="text-xs leading-none text-white/60">
                    explorer@cosmic-player.com
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-cosmic-green" />
                    <span className="text-xs text-cosmic-green">
                      Premium User
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-white/70 hover:bg-white/10 hover:text-cosmic-cyan focus:bg-white/10">
                <span className="w-full">Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white/70 hover:bg-white/10 hover:text-cosmic-cyan focus:bg-white/10">
                <span className="w-full">Audio Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white/70 hover:bg-white/10 hover:text-cosmic-cyan focus:bg-white/10">
                <span className="w-full">Visual Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 hover:text-red-300 focus:bg-red-500/20">
                <span className="w-full">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
