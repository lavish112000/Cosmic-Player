"use client";

import React, { useState, useContext } from 'react';
import { PlayerContext } from '@/contexts/player-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  ListMusic,
  Play,
  Pause,
  X,
  Shuffle,
  Repeat,
  Repeat1,
  FileVideo
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/utils';

interface PlaylistItem {
  id: string;
  name: string;
  path: string;
  duration: number;
  size: number;
  type: string;
}

interface PlaylistProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Playlist({ isOpen, onClose }: PlaylistProps) {
  const context = useContext(PlayerContext);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('none');
  const [shuffleMode, setShuffleMode] = useState(false);

  if (!context) return null;

  const { controls } = context;

  const handlePlayItem = (index: number) => {
    setCurrentIndex(index);
    // Here you would implement the logic to load and play the selected file
    // functions.loadFile(playlist[index].path);
  };

  const handleRemoveItem = (index: number) => {
    const newPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(newPlaylist);
    if (index === currentIndex && newPlaylist.length > 0) {
      setCurrentIndex(Math.min(currentIndex, newPlaylist.length - 1));
    }
  };

  const handleShuffle = () => {
    setShuffleMode(!shuffleMode);
  };

  const handleRepeat = () => {
    setRepeatMode(repeatMode === 'none' ? 'all' : repeatMode === 'all' ? 'one' : 'none');
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div
      className={cn(
        "absolute top-0 right-0 h-full w-80 bg-black/80 backdrop-blur-2xl z-20 transition-all duration-500 ease-out",
        "border-l border-white/20 shadow-2xl",
        "bg-gradient-to-b from-black/90 via-black/70 to-black/90",
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
      )}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ListMusic className="w-8 h-8 text-cosmic-purple" />
              <div className="absolute inset-0 w-8 h-8 bg-cosmic-purple/20 rounded-full blur-md animate-pulse-glow" />
            </div>
            <div>
              <h3 className="text-xl font-headline font-bold text-gradient">Playlist</h3>
              <p className="text-xs text-white/60">{playlist.length} items</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-white/70 hover:text-white hover:bg-white/10 bouncy-click"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-cosmic-purple/50 to-transparent" />

        {/* Controls */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-8 h-8 bouncy-click",
                shuffleMode ? "text-cosmic-green bg-cosmic-green/20" : "text-white/70 hover:text-cosmic-green hover:bg-cosmic-green/10"
              )}
              onClick={handleShuffle}
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-8 h-8 bouncy-click",
                repeatMode !== 'none' ? "text-cosmic-blue bg-cosmic-blue/20" : "text-white/70 hover:text-cosmic-blue hover:bg-cosmic-blue/10"
              )}
              onClick={handleRepeat}
            >
              {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </Button>
          </div>
          <Badge variant="secondary" className="bg-cosmic-purple/20 text-cosmic-purple border-cosmic-purple/30">
            {repeatMode === 'none' ? 'No Repeat' : repeatMode === 'all' ? 'Repeat All' : 'Repeat One'}
          </Badge>
        </div>

        {/* Playlist Items */}
        <ScrollArea className="flex-grow">
          <div className="space-y-2">
            {playlist.length === 0 ? (
              <div className="text-center py-12">
                <FileVideo className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-sm">No items in playlist</p>
                <p className="text-white/40 text-xs mt-2">Add files to get started</p>
              </div>
            ) : (
              playlist.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer",
                    "hover:bg-white/10 hover-lift",
                    index === currentIndex ? "bg-cosmic-purple/20 border border-cosmic-purple/30" : "bg-white/5"
                  )}
                  onClick={() => handlePlayItem(index)}
                >
                  <div className="relative flex-shrink-0">
                    {index === currentIndex ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-cosmic-purple hover:text-cosmic-pink hover:bg-cosmic-pink/20"
                      >
                        {controls.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    ) : (
                      <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white/60 text-xs font-medium">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-grow min-w-0">
                    <p className="text-white text-sm font-medium truncate group-hover:text-cosmic-cyan transition-colors">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span>{formatTime(item.duration)}</span>
                      <span>•</span>
                      <span>{formatFileSize(item.size)}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 text-white/40 hover:text-red-400 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all bouncy-click"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(index);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Total: {formatTime(playlist.reduce((acc, item) => acc + item.duration, 0))}</span>
            <span>{playlist.length} files</span>
          </div>
        </div>
      </div>
    </div>
  );
}