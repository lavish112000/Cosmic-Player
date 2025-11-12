'use client';

import React, { useState } from 'react';
import { useCosmicPlayer } from '@/hooks/use-cosmic-player';
import { PlayerProvider } from '@/contexts/player-context';
import { CosmicBackground } from '@/components/cosmic-background';
import { PlayerControls } from '@/components/player-controls';
import { RolloutNav } from '@/components/rollout-nav';
import { Playlist } from '@/components/playlist';
import { Equalizer } from '@/components/equalizer';
import { MediaInfo } from '@/components/media-info';
import { Button } from '@/components/ui/button';
import {
  FileVideo,
  Folder,
  ListMusic,
  AudioWaveform,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function CosmicPlayer() {
  const playerState = useCosmicPlayer();
  const {
    playerContainerRef,
    videoRef,
    videoSrc,
    controls,
    clickHandlers,
    functions,
  } = playerState;

  // State for side panels
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [isMediaInfoOpen, setIsMediaInfoOpen] = useState(false);

  return (
    <PlayerProvider value={playerState}>
      <CosmicBackground />
      <div
        ref={playerContainerRef}
        className="relative flex h-full w-full items-center justify-center bg-black/50"
        onClick={clickHandlers.handleContainerClick}
        onDoubleClick={clickHandlers.handleContainerDoubleClick}
        onMouseMove={clickHandlers.handleMouseMove}
      >
        <video
          ref={videoRef}
          src={videoSrc || ''}
          className="h-full w-full object-contain transition-all duration-300"
          style={{
            transform: `scale(${controls.zoom})`,
            objectFit: controls.aspectRatio,
          }}
          onTimeUpdate={clickHandlers.handleTimeUpdate}
          onLoadedMetadata={clickHandlers.handleLoadedMetadata}
          onEnded={() => functions.setIsPlaying(false)}
          autoPlay
          muted
        />

        <div
          className={cn(
            'absolute inset-0 z-10 flex items-center justify-center transition-all duration-500',
            videoSrc ? 'pointer-events-none opacity-0' : 'opacity-100'
          )}
        >
          <div className="scale-in space-y-8 text-center">
            <div className="relative">
              <h1 className="text-gradient mb-4 font-headline text-6xl font-bold drop-shadow-[0_0_20px_hsl(var(--cosmic-purple))] md:text-8xl">
                Cosmic Player
              </h1>
              <div className="absolute inset-0 animate-pulse-glow font-headline text-6xl font-bold text-cosmic-purple opacity-20 blur-sm md:text-8xl">
                Cosmic Player
              </div>
            </div>
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
              Embark on an immersive journey through space and sound with our
              next-generation video player.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="glow-primary hover-glow hover-lift bouncy-click group border-0 bg-gradient-to-r from-cosmic-purple to-cosmic-pink px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:from-cosmic-pink hover:to-cosmic-purple"
                onClick={(e) => {
                  e.stopPropagation();
                  functions.openFilePicker();
                }}
              >
                <FileVideo className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Open Video File
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass hover-lift bouncy-click border-2 border-cosmic-cyan px-8 py-4 text-lg font-bold text-cosmic-cyan transition-all duration-300 hover:bg-cosmic-cyan hover:text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  functions.openFolderPicker();
                }}
              >
                <Folder className="mr-3 h-6 w-6" />
                Open Folder
              </Button>
            </div>
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

        {/* Side Panel Toggle Buttons */}
        <div className="absolute right-4 top-4 z-30 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'hover-glow hover-lift bouncy-click h-12 w-12 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-300 hover:border-cosmic-green/50 hover:bg-white/20',
              isPlaylistOpen && 'border-cosmic-green/50 bg-cosmic-green/20'
            )}
            onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
          >
            <ListMusic className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'hover-glow hover-lift bouncy-click h-12 w-12 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-300 hover:border-cosmic-cyan/50 hover:bg-white/20',
              isEqualizerOpen && 'border-cosmic-cyan/50 bg-cosmic-cyan/20'
            )}
            onClick={() => setIsEqualizerOpen(!isEqualizerOpen)}
          >
            <AudioWaveform className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'hover-glow hover-lift bouncy-click h-12 w-12 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-300 hover:border-cosmic-purple/50 hover:bg-white/20',
              isMediaInfoOpen && 'border-cosmic-purple/50 bg-cosmic-purple/20'
            )}
            onClick={() => setIsMediaInfoOpen(!isMediaInfoOpen)}
          >
            <Info className="h-6 w-6" />
          </Button>
        </div>

        <RolloutNav />
        <PlayerControls />
        <Playlist
          isOpen={isPlaylistOpen}
          onClose={() => setIsPlaylistOpen(false)}
        />
        <Equalizer
          isOpen={isEqualizerOpen}
          onClose={() => setIsEqualizerOpen(false)}
        />
        <MediaInfo
          isOpen={isMediaInfoOpen}
          onClose={() => setIsMediaInfoOpen(false)}
        />

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
          {...({
            webkitdirectory: 'true',
            directory: 'true',
          } as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      </div>
    </PlayerProvider>
  );
}
