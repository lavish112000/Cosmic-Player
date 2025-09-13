"use client";

import React, { useContext, useState } from 'react';
import { PlayerContext } from '@/contexts/player-context';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play, Pause, Volume2, Volume1, VolumeX, FastForward, Rewind, ChevronDown, ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/utils';

export function PlayerControls() {
  const context = useContext(PlayerContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!context) return null;

  const { controls, functions, videoSrc } = context;

  const handleSeek = (value: number[]) => {
    functions.seekTo(value[0]);
  };
  
  const handleVolumeChange = (value: number[]) => {
    functions.setVolume(value[0]);
  };

  if (!videoSrc) return null;

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-20 p-6 transition-all duration-500",
        "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
        "backdrop-blur-xl border-t border-white/10",
        controls.areControlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="relative mb-6 group">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-blue rounded-full transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_linear_infinite]" />
            </div>
          </div>
          <Slider
            min={0}
            max={controls.duration}
            step={1}
            value={[controls.progress]}
            onValueChange={handleSeek}
            className="absolute inset-0 w-full h-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            {formatTime(controls.progress)}
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-cosmic-purple/50 hover-glow hover-lift transition-all duration-300 bouncy-click group"
              onClick={functions.togglePlay}
            >
              {controls.isPlaying ? (
                <Pause className="w-6 h-6 group-hover:scale-110 transition-transform" />
              ) : (
                <Play className="w-6 h-6 ml-1 group-hover:scale-110 transition-transform" />
              )}
            </Button>

            {/* Playback Speed Controls */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-white hover:text-cosmic-cyan hover:bg-cosmic-cyan/20 bouncy-click"
                onClick={() => functions.changePlaybackRate(-0.25)}
              >
                <Rewind className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium w-12 text-center tabular-nums text-cosmic-cyan">
                {controls.playbackRate.toFixed(2)}x
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-white hover:text-cosmic-cyan hover:bg-cosmic-cyan/20 bouncy-click"
                onClick={() => functions.changePlaybackRate(0.25)}
              >
                <FastForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center gap-3 group">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-cosmic-pink/50 hover-glow bouncy-click"
                onClick={functions.toggleMute}
              >
                {controls.isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : controls.volume < 0.5 ? (
                  <Volume1 className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={[controls.isMuted ? 0 : controls.volume]}
                  onValueChange={handleVolumeChange}
                  className="w-full h-2"
                />
              </div>
            </div>
          </div>

          {/* Time Display */}
          <div className="text-sm font-medium tabular-nums text-white/90 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {formatTime(controls.progress)} / {formatTime(controls.duration)}
          </div>

          {/* Collapse/Expand Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-cosmic-purple/50 hover-glow bouncy-click"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Additional Controls Row */}
        <div className={cn(
          "flex items-center justify-center gap-4 mt-4 transition-all duration-300",
          isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-0 hover:opacity-100"
        )}>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-cosmic-purple hover:bg-cosmic-purple/20 bouncy-click"
            onClick={() => functions.changeZoom(-0.1)}
          >
            Zoom Out
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-cosmic-purple hover:bg-cosmic-purple/20 bouncy-click"
            onClick={() => functions.changeZoom(0.1)}
          >
            Zoom In
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-cosmic-blue hover:bg-cosmic-blue/20 bouncy-click"
            onClick={functions.toggleFullScreen}
          >
            {controls.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </div>
    </div>
  );
}
