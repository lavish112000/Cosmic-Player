"use client";

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
import { FileVideo, Folder, ListMusic, AudioWaveform, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CosmicPlayer() {
  const playerState = useCosmicPlayer();
  const { playerContainerRef, videoRef, videoSrc, controls, clickHandlers, functions } = playerState;

  // State for side panels
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState(false);
  const [isMediaInfoOpen, setIsMediaInfoOpen] = useState(false);

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
          onEnded={() => functions.setIsPlaying(false)}
          autoPlay
          muted
        />

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 z-10",
            (videoSrc) ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="text-center space-y-8 scale-in">
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-headline font-bold text-gradient mb-4 drop-shadow-[0_0_20px_hsl(var(--cosmic-purple))]">
                Cosmic Player
              </h1>
              <div className="absolute inset-0 text-6xl md:text-8xl font-headline font-bold text-cosmic-purple opacity-20 blur-sm animate-pulse-glow">
                Cosmic Player
              </div>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Embark on an immersive journey through space and sound with our next-generation video player.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="font-bold text-lg px-8 py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-pink hover:from-cosmic-pink hover:to-cosmic-purple text-white border-0 glow-primary hover-glow hover-lift transition-all duration-300 bouncy-click group"
                onClick={(e) => {
                  e.stopPropagation();
                  functions.openFilePicker();
                }}
              >
                <FileVideo className="mr-3 w-6 h-6 group-hover:animate-pulse" />
                Open Video File
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold text-lg px-8 py-4 border-2 border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan hover:text-black glass hover-lift transition-all duration-300 bouncy-click"
                onClick={(e) => {
                  e.stopPropagation();
                  functions.openFolderPicker();
                }}
              >
                <Folder className="mr-3 w-6 h-6" />
                Open Folder
              </Button>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              <div className="w-3 h-3 bg-cosmic-purple rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-cosmic-pink rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-cosmic-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-3 h-3 bg-cosmic-cyan rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>

        {/* Side Panel Toggle Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-cosmic-green/50 hover-glow hover-lift transition-all duration-300 bouncy-click",
              isPlaylistOpen && "bg-cosmic-green/20 border-cosmic-green/50"
            )}
            onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
          >
            <ListMusic className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-cosmic-cyan/50 hover-glow hover-lift transition-all duration-300 bouncy-click",
              isEqualizerOpen && "bg-cosmic-cyan/20 border-cosmic-cyan/50"
            )}
            onClick={() => setIsEqualizerOpen(!isEqualizerOpen)}
          >
            <AudioWaveform className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-cosmic-purple/50 hover-glow hover-lift transition-all duration-300 bouncy-click",
              isMediaInfoOpen && "bg-cosmic-purple/20 border-cosmic-purple/50"
            )}
            onClick={() => setIsMediaInfoOpen(!isMediaInfoOpen)}
          >
            <Info className="w-6 h-6" />
          </Button>
        </div>

        <RolloutNav />
        <PlayerControls />
        <Playlist isOpen={isPlaylistOpen} onClose={() => setIsPlaylistOpen(false)} />
        <Equalizer isOpen={isEqualizerOpen} onClose={() => setIsEqualizerOpen(false)} />
        <MediaInfo isOpen={isMediaInfoOpen} onClose={() => setIsMediaInfoOpen(false)} />

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
