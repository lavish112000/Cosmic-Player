/**
 * Cosmic Player Component
 * The main video player interface with cosmic theme
 * Includes: video display, controls, side panels (playlist, equalizer, media info)
 */

'use client';

import React, { useState } from 'react';
// Custom hook that manages all player state and logic
import { useCosmicPlayer } from '@/hooks/use-cosmic-player';
// Context provider to share player state with child components
import { PlayerProvider } from '@/contexts/player-context';
// UI Components
import { CosmicBackground } from '@/components/cosmic-background';
import { PlayerControls } from '@/components/player-controls';
import { RolloutNav } from '@/components/rollout-nav';
import { Playlist } from '@/components/playlist';
import { Equalizer } from '@/components/equalizer';
import { MediaInfo } from '@/components/media-info';
import { Button } from '@/components/ui/button';
// Icons
import {
  FileVideo,
  Folder,
  ListMusic,
  AudioWaveform,
  Info,
} from 'lucide-react';
// Utility for conditional class names
import { cn } from '@/lib/utils';

/**
 * Main Cosmic Player Component
 */
export function CosmicPlayer() {
  // Get all player state and functions from the custom hook
  const playerState = useCosmicPlayer();
  const {
    playerContainerRef,
    videoRef,
    videoSrc,
    controls,
    clickHandlers,
    functions,
  } = playerState;

  // ===== SIDE PANEL STATE =====
  // Track which side panels are open
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [isMediaInfoOpen, setIsMediaInfoOpen] = useState(false);

  // ===== AUTO-HIDE SIDE BUTTONS STATE =====
  // Track if side buttons should be visible (auto-hide after 3 seconds of inactivity)
  const [areSideButtonsVisible, setAreSideButtonsVisible] = useState(true);
  const sideButtonsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // ===== SIDE BUTTONS AUTO-HIDE LOGIC =====
  React.useEffect(() => {
    const handleMouseMove = () => {
      // Show buttons on mouse movement
      setAreSideButtonsVisible(true);

      // Clear existing timeout
      if (sideButtonsTimeoutRef.current) {
        clearTimeout(sideButtonsTimeoutRef.current);
      }

      // Hide buttons after 3 seconds of inactivity
      sideButtonsTimeoutRef.current = setTimeout(() => {
        setAreSideButtonsVisible(false);
      }, 3000);
    };

    const container = playerContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    // Cleanup
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (sideButtonsTimeoutRef.current) {
        clearTimeout(sideButtonsTimeoutRef.current);
      }
    };
  }, [playerContainerRef]);

  // Keep side buttons visible when any panel is open
  React.useEffect(() => {
    if (isPlaylistOpen || isEqualizerOpen || isMediaInfoOpen) {
      setAreSideButtonsVisible(true);
      if (sideButtonsTimeoutRef.current) {
        clearTimeout(sideButtonsTimeoutRef.current);
      }
    }
  }, [isPlaylistOpen, isEqualizerOpen, isMediaInfoOpen]);

  // Check if any side panel is open
  const isAnySidePanelOpen =
    isPlaylistOpen || isEqualizerOpen || isMediaInfoOpen;

  return (
    // Provide player state to all child components via Context
    <PlayerProvider value={playerState}>
      {/* Animated cosmic background with stars and nebula effects */}
      <CosmicBackground />

      {/* Main player container */}
      <div
        ref={playerContainerRef}
        className="relative flex h-full w-full items-center justify-center bg-black/50"
        onClick={clickHandlers.handleContainerClick} // Single click toggles controls
        onDoubleClick={clickHandlers.handleContainerDoubleClick} // Double click toggles fullscreen
        onMouseMove={clickHandlers.handleMouseMove} // Mouse movement shows controls
      >
        {/* ===== VIDEO ELEMENT ===== */}
        <video
          ref={videoRef}
          src={videoSrc || undefined} // Use undefined instead of empty string to avoid errors
          className="h-full w-full object-contain transition-all duration-300"
          style={{
            transform: `scale(${controls.zoom})`, // Apply zoom level
            objectFit: controls.aspectRatio, // Apply aspect ratio setting
          }}
          onTimeUpdate={clickHandlers.handleTimeUpdate} // Update progress bar
          onLoadedMetadata={clickHandlers.handleLoadedMetadata} // Set duration when loaded
          onEnded={() => functions.setIsPlaying(false)} // Stop when video ends
          autoPlay // Attempt to autoplay (may be blocked by browser)
          muted // Start muted to allow autoplay
        />

        {/* ===== WELCOME SCREEN (shown when no video is loaded) ===== */}
        <div
          className={cn(
            'absolute inset-0 z-10 flex items-center justify-center transition-all duration-500',
            videoSrc ? 'pointer-events-none opacity-0' : 'opacity-100' // Hide when video is loaded
          )}
        >
          <div className="scale-in space-y-8 text-center">
            {/* Title with glow effect */}
            <div className="relative">
              <h1 className="text-gradient mb-4 font-headline text-6xl font-bold drop-shadow-[0_0_20px_hsl(var(--cosmic-purple))] md:text-8xl">
                Cosmic Player
              </h1>
              {/* Duplicate text for blur/glow effect */}
              <div className="absolute inset-0 animate-pulse-glow font-headline text-6xl font-bold text-cosmic-purple opacity-20 blur-sm md:text-8xl">
                Cosmic Player
              </div>
            </div>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
              Embark on an immersive journey through space and sound with our
              next-generation video player.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Open single video file button */}
              <Button
                size="lg"
                className="glow-primary hover-glow hover-lift bouncy-click group border-0 bg-gradient-to-r from-cosmic-purple to-cosmic-pink px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:from-cosmic-pink hover:to-cosmic-purple"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering container click
                  functions.openFilePicker();
                }}
              >
                <FileVideo className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Open Video File
              </Button>

              {/* Open folder button */}
              <Button
                size="lg"
                variant="outline"
                className="glass hover-lift bouncy-click border-2 border-cosmic-cyan px-8 py-4 text-lg font-bold text-cosmic-cyan transition-all duration-300 hover:bg-cosmic-cyan hover:text-black"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering container click
                  functions.openFolderPicker();
                }}
              >
                <Folder className="mr-3 h-6 w-6" />
                Open Folder
              </Button>
            </div>

            {/* Animated loading dots */}
            <div className="mt-8 flex justify-center space-x-4">
              <div className="h-3 w-3 animate-pulse rounded-full bg-cosmic-purple" />
              <div
                className="h-3 w-3 animate-pulse rounded-full bg-cosmic-pink"
                style={{ animationDelay: '0.2s' }}
              />
              <div
                className="h-3 w-3 animate-pulse rounded-full bg-cosmic-blue"
                style={{ animationDelay: '0.4s' }}
              />
              <div
                className="h-3 w-3 animate-pulse rounded-full bg-cosmic-cyan"
                style={{ animationDelay: '0.6s' }}
              />
            </div>
          </div>
        </div>

        {/* ===== SIDE PANEL TOGGLE BUTTONS (top right corner) ===== */}
        {/* Auto-hide after 3 seconds of mouse inactivity */}
        <div
          className={cn(
            'absolute right-4 top-4 z-30 flex flex-col gap-2 transition-all duration-500',
            areSideButtonsVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-20 opacity-0'
          )}
          onMouseEnter={() => {
            setAreSideButtonsVisible(true);
            if (sideButtonsTimeoutRef.current) {
              clearTimeout(sideButtonsTimeoutRef.current);
            }
          }}
        >
          {/* Playlist button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'hover-glow hover-lift bouncy-click h-12 w-12 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-300 hover:border-cosmic-green/50 hover:bg-white/20',
              isPlaylistOpen && 'border-cosmic-green/50 bg-cosmic-green/20' // Highlight when open
            )}
            onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
          >
            <ListMusic className="h-6 w-6" />
          </Button>

          {/* Equalizer button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'hover-glow hover-lift bouncy-click h-12 w-12 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-300 hover:border-cosmic-cyan/50 hover:bg-white/20',
              isEqualizerOpen && 'border-cosmic-cyan/50 bg-cosmic-cyan/20' // Highlight when open
            )}
            onClick={() => setIsEqualizerOpen(!isEqualizerOpen)}
          >
            <AudioWaveform className="h-6 w-6" />
          </Button>

          {/* Media info button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'hover-glow hover-lift bouncy-click h-12 w-12 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-300 hover:border-cosmic-purple/50 hover:bg-white/20',
              isMediaInfoOpen && 'border-cosmic-purple/50 bg-cosmic-purple/20' // Highlight when open
            )}
            onClick={() => setIsMediaInfoOpen(!isMediaInfoOpen)}
          >
            <Info className="h-6 w-6" />
          </Button>
        </div>

        {/* ===== CHILD COMPONENTS ===== */}
        {/* Navigation menu (top left) - auto-hide after 3 seconds */}
        <RolloutNav
          areSideButtonsVisible={areSideButtonsVisible}
          setAreSideButtonsVisible={setAreSideButtonsVisible}
          sideButtonsTimeoutRef={sideButtonsTimeoutRef}
        />
        {/* Main playback controls (bottom bar) - hide when side panels are open */}
        <PlayerControls isHidden={isAnySidePanelOpen} />
        {/* Side panel: Playlist viewer */}
        <Playlist
          isOpen={isPlaylistOpen}
          onClose={() => setIsPlaylistOpen(false)}
        />
        {/* Side panel: Audio equalizer */}
        <Equalizer
          isOpen={isEqualizerOpen}
          onClose={() => setIsEqualizerOpen(false)}
        />
        {/* Side panel: Video metadata display */}
        <MediaInfo
          isOpen={isMediaInfoOpen}
          onClose={() => setIsMediaInfoOpen(false)}
        />

        {/* ===== HIDDEN FILE INPUTS ===== */}
        {/* Hidden input for single file selection (triggered by Open Video File button) */}
        <input
          type="file"
          ref={playerState.fileInputRef}
          className="hidden"
          accept="video/*" // Only allow video files
          onChange={playerState.clickHandlers.handleFileChange}
        />
        {/* Hidden input for folder selection (triggered by Open Folder button) */}
        <input
          type="file"
          ref={playerState.folderInputRef}
          className="hidden"
          accept="video/*" // Only allow video files
          multiple // Allow selecting multiple files
          {...({
            webkitdirectory: 'true',
            directory: 'true',
          } as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      </div>
    </PlayerProvider>
  );
}
