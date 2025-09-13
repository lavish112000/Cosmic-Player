"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LCIcon } from '@/components/icons';
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
import { Menu } from 'lucide-react';

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
    { href: '/library', label: 'Library' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-black/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-3 group">
            <div className="relative">
              <LCIcon className="h-8 w-8 text-cosmic-purple group-hover:text-cosmic-pink transition-colors duration-300 drop-shadow-[0_0_10px_hsl(var(--cosmic-purple))]" />
              <div className="absolute inset-0 w-8 h-8 bg-cosmic-purple/20 rounded-full blur-md animate-pulse-glow" />
            </div>
            <span className="text-xl font-headline font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
              Cosmic Player
            </span>
          </Link>
          <nav className="flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-3 py-2 rounded-lg text-white/70 hover:text-cosmic-cyan transition-all duration-300 hover-lift hover-glow group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/0 via-cosmic-purple/10 to-cosmic-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-cosmic-purple/50 hover-glow hover-lift transition-all duration-300 bouncy-click"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-black/90 backdrop-blur-2xl border-r border-white/20 text-white"
            >
              <Link
                href="/"
                className="flex items-center space-x-3 px-4 mb-6 group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative">
                  <LCIcon className="h-8 w-8 text-cosmic-purple group-hover:text-cosmic-pink transition-colors duration-300" />
                  <div className="absolute inset-0 w-8 h-8 bg-cosmic-purple/20 rounded-full blur-md animate-pulse-glow" />
                </div>
                <span className="text-xl font-headline font-bold text-gradient">Cosmic Player</span>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white/70 hover:text-cosmic-cyan transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
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
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-2 h-2 bg-cosmic-green rounded-full animate-pulse"></div>
            <span className="text-xs text-white/60">Online</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-cosmic-purple/50 hover-glow hover-lift transition-all duration-300 bouncy-click"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                  <AvatarFallback className="bg-cosmic-purple text-white">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 bg-black/90 backdrop-blur-2xl border border-white/20"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal border-b border-white/10">
                <div className="flex flex-col space-y-2 p-2">
                  <p className="text-sm font-medium leading-none text-white">Cosmic Explorer</p>
                  <p className="text-xs leading-none text-white/60">
                    explorer@cosmic-player.com
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-cosmic-green rounded-full animate-pulse"></div>
                    <span className="text-xs text-cosmic-green">Premium User</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-white/70 hover:text-cosmic-cyan hover:bg-white/10 focus:bg-white/10">
                <span className="w-full">Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white/70 hover:text-cosmic-cyan hover:bg-white/10 focus:bg-white/10">
                <span className="w-full">Audio Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white/70 hover:text-cosmic-cyan hover:bg-white/10 focus:bg-white/10">
                <span className="w-full">Visual Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/20 focus:bg-red-500/20">
                <span className="w-full">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
