"use client";

import React, { useContext } from 'react';
import { PlayerContext } from '@/contexts/player-context';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play, Pause, Volume2, Volume1, VolumeX, FastForward, Rewind
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/utils';

export function PlayerControls() {
  const context = useContext(PlayerContext);

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
        "absolute bottom-0 left-0 right-0 z-20 p-4 transition-all duration-300",
        "bg-gradient-to-t from-black/70 to-transparent",
        controls.areControlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full">
        <Slider
          min={0}
          max={controls.duration}
          step={1}
          value={[controls.progress]}
          onValueChange={handleSeek}
          className="w-full h-2 cursor-pointer"
        />
        <div className="flex items-center justify-between mt-2 text-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white bouncy-click" onClick={functions.togglePlay}>
              {controls.isPlaying ? <Pause /> : <Play />}
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white bouncy-click" onClick={() => functions.changePlaybackRate(-0.25)}>
                <Rewind />
              </Button>
              <span className="text-sm font-medium w-12 text-center tabular-nums">{controls.playbackRate.toFixed(2)}x</span>
              <Button variant="ghost" size="icon" className="text-white bouncy-click" onClick={() => functions.changePlaybackRate(0.25)}>
                <FastForward />
              </Button>
            </div>
            <div className="flex items-center gap-2 group w-40">
              <Button variant="ghost" size="icon" className="text-white" onClick={functions.toggleMute}>
                {controls.volume === 0 || controls.isMuted ? <VolumeX /> : controls.volume < 0.5 ? <Volume1 /> : <Volume2 />}
              </Button>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[controls.isMuted ? 0 : controls.volume]}
                onValueChange={handleVolumeChange}
                className="w-24 h-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
          <div className="text-sm font-medium tabular-nums">
            {formatTime(controls.progress)} / {formatTime(controls.duration)}
          </div>
        </div>
      </div>
    </div>
  );
}
