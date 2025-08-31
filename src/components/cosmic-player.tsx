"use client";

import React from 'react';
import { useCosmicPlayer } from '@/hooks/use-cosmic-player';
import { PlayerProvider } from '@/contexts/player-context';
import { CosmicBackground } from '@/components/cosmic-background';
import { PlayerControls } from '@/components/player-controls';
import { RolloutNav } from '@/components/rollout-nav';
import { Button } from '@/components/ui/button';
import { FileVideo } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CosmicPlayer() {
  const playerState = useCosmicPlayer();
  const { playerContainerRef, videoRef, videoSrc, controls, clickHandlers, functions } = playerState;

  return (
    <PlayerProvider value={playerState}>
      <CosmicBackground />
      <div
        ref={playerContainerRef}
        className="relative w-full h-full bg-black/50 flex items-center justify-center"
        onClick={clickHandlers.handleContainerClick}
        onDoubleClick={clickHandlers.handleContainerDoubleClick}
        onMouseMove={clickHandlers.handleMouseMove}
      >
        <video
          ref={videoRef}
          src={videoSrc || ''}
          className="w-full h-full object-contain transition-all duration-300"
          style={{
            transform: `scale(${controls.zoom})`,
            objectFit: controls.aspectRatio,
          }}
          onTimeUpdate={clickHandlers.handleTimeUpdate}
          onLoadedMetadata={clickHandlers.handleLoadedMetadata}
          onError={clickHandlers.handleVideoError}
          onEnded={() => functions.setIsPlaying(false)}
          autoPlay
          muted
        />

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10",
            (videoSrc) ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-[0_2px_10px_hsl(var(--primary))]">
              Cosmic Player
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Open a file to begin your journey through space and sound.
            </p>
            <Button
              size="lg"
              className="font-bold text-lg bouncy-click"
              onClick={(e) => {
                e.stopPropagation();
                functions.openFilePicker();
              }}
            >
              <FileVideo className="mr-2" /> Open Video File
            </Button>
          </div>
        </div>

        <RolloutNav />
        <PlayerControls />
        <input
          type="file"
          ref={playerState.fileInputRef}
          className="hidden"
          accept="video/*"
          onChange={playerState.clickHandlers.handleFileChange}
        />
         <input
          type="file"
          ref={playerState.folderInputRef}
          className="hidden"
          accept="video/*"
  
          multiple
          {...({ webkitdirectory: "true", directory: "true" } as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      </div>
    </PlayerProvider>
  );
}
