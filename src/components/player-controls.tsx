/**
 * Player Controls Component
 * The bottom control bar for the video player
 * Includes: play/pause, seek bar, volume control, playback speed, and collapse toggle
 */

'use client';

import React, { useContext, useState } from 'react';
// Access player state from context
import { PlayerContext } from '@/contexts/player-context';
// UI Components
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
// Icons for control buttons
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  FastForward,
  Rewind,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
// Utilities
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/utils';

/**
 * Main Player Controls Component
 */
export function PlayerControls({ isHidden = false }: { isHidden?: boolean }) {
  // Get player state from context
  const context = useContext(PlayerContext);
  // Track whether controls are collapsed (minimal mode)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Don't render if context is not available
  if (!context) {
    return null;
  }

  // Extract needed values from context
  const { controls, functions, videoSrc } = context;

  /**
   * Handle seeking when user drags the progress bar
   * @param value - Array with new time position in seconds
   */
  const handleSeek = (value: number[]) => {
    functions.seekTo(value[0]);
  };

  /**
   * Handle volume change when user adjusts volume slider
   * @param value - Array with new volume level (0-1)
   */
  const handleVolumeChange = (value: number[]) => {
    functions.setVolume(value[0]);
  };

  // Don't show controls if no video is loaded
  if (!videoSrc) {
    return null;
  }

  return (
    // Control bar container (bottom of screen) with rounded corners
    <div
      className={cn(
        'absolute bottom-4 left-1/2 z-20 -translate-x-1/2 transition-all duration-500',
        'w-[95%] max-w-6xl rounded-2xl border border-white/10 bg-black/40 shadow-lg backdrop-blur-xl',
        // Show/hide based on both areControlsVisible and isHidden states
        controls.areControlsVisible && !isHidden
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-8 opacity-0'
      )}
      onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching video container
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* ===== PROGRESS BAR ===== */}
        <div className="group relative mb-6">
          {/* Visual progress bar background */}
          <div className="h-2 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
            <div className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-blue transition-all duration-300">
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>
          {/* Interactive slider (invisible, positioned over progress bar) */}
          <Slider
            min={0}
            max={controls.duration}
            step={1}
            value={[controls.progress]}
            onValueChange={handleSeek}
            className="absolute inset-0 h-2 w-full cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
          />
          {/* Time tooltip (shows on hover) */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded-full bg-black/80 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            {formatTime(controls.progress)}
          </div>
        </div>

        {/* ===== MAIN CONTROLS ROW ===== */}
        <div className="flex items-center justify-between">
          {/* Left side controls */}
          <div className="flex items-center gap-6">
            {/* ===== PLAY/PAUSE BUTTON ===== */}
            <Button
              variant="ghost"
              size="icon"
              className="hover-glow hover-lift bouncy-click group h-14 w-14 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-cosmic-purple/50 hover:bg-white/20"
              onClick={functions.togglePlay}
            >
              {controls.isPlaying ? (
                <Pause className="h-6 w-6 transition-transform group-hover:scale-110" />
              ) : (
                <Play className="ml-1 h-6 w-6 transition-transform group-hover:scale-110" />
              )}
            </Button>

            {/* ===== PLAYBACK SPEED CONTROLS ===== */}
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              {/* Decrease speed button */}
              <Button
                variant="ghost"
                size="icon"
                className="bouncy-click h-8 w-8 text-white hover:bg-cosmic-cyan/20 hover:text-cosmic-cyan"
                onClick={() => functions.changePlaybackRate(-0.25)}
              >
                <Rewind className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-sm font-medium tabular-nums text-cosmic-cyan">
                {controls.playbackRate.toFixed(2)}x
              </span>
              {/* Increase speed button */}
              <Button
                variant="ghost"
                size="icon"
                className="bouncy-click h-8 w-8 text-white hover:bg-cosmic-cyan/20 hover:text-cosmic-cyan"
                onClick={() => functions.changePlaybackRate(0.25)}
              >
                <FastForward className="h-4 w-4" />
              </Button>
            </div>

            {/* ===== VOLUME CONTROLS ===== */}
            <div className="group flex items-center gap-3">
              {/* Mute/Unmute button */}
              <Button
                variant="ghost"
                size="icon"
                className="hover-glow bouncy-click h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-cosmic-pink/50 hover:bg-white/20"
                onClick={functions.toggleMute}
              >
                {controls.isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : controls.volume < 0.5 ? (
                  <Volume1 className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              {/* Volume slider (hidden by default, shows on hover) */}
              <div className="h-2 w-24 overflow-hidden rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={[controls.isMuted ? 0 : controls.volume]}
                  onValueChange={handleVolumeChange}
                  className="h-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Time Display */}
          <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium tabular-nums text-white/90 backdrop-blur-md">
            {formatTime(controls.progress)} / {formatTime(controls.duration)}
          </div>

          {/* Collapse/Expand Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hover-glow bouncy-click h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-cosmic-purple/50 hover:bg-white/20"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Additional Controls Row */}
        <div
          className={cn(
            'mt-4 flex items-center justify-center gap-4 transition-all duration-300',
            isCollapsed
              ? 'h-0 overflow-hidden opacity-0'
              : 'opacity-0 hover:opacity-100'
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="bouncy-click text-white/70 hover:bg-cosmic-purple/20 hover:text-cosmic-purple"
            onClick={() => functions.changeZoom(-0.1)}
          >
            Zoom Out
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bouncy-click text-white/70 hover:bg-cosmic-purple/20 hover:text-cosmic-purple"
            onClick={() => functions.changeZoom(0.1)}
          >
            Zoom In
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bouncy-click text-white/70 hover:bg-cosmic-blue/20 hover:text-cosmic-blue"
            onClick={functions.toggleFullScreen}
          >
            {controls.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </div>
    </div>
  );
}
