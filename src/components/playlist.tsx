'use client';

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
  FileVideo,
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

  if (!context) {
    return null;
  }

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
    setRepeatMode(
      repeatMode === 'none' ? 'all' : repeatMode === 'all' ? 'one' : 'none'
    );
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) {
      return '0 Bytes';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div
      className={cn(
        'absolute right-0 top-0 z-20 h-full w-80 bg-black/80 backdrop-blur-2xl transition-all duration-500 ease-out',
        'border-l border-white/20 shadow-2xl',
        'bg-gradient-to-b from-black/90 via-black/70 to-black/90',
        'overflow-hidden', // Prevent overflow
        isOpen
          ? 'translate-x-0 opacity-100'
          : 'pointer-events-none translate-x-full opacity-0'
      )}
    >
      <div className="flex h-full flex-col p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ListMusic className="h-8 w-8 text-cosmic-purple" />
              <div className="absolute inset-0 h-8 w-8 animate-pulse-glow rounded-full bg-cosmic-purple/20 blur-md" />
            </div>
            <div>
              <h3 className="text-gradient font-headline text-xl font-bold">
                Playlist
              </h3>
              <p className="text-xs text-white/60">{playlist.length} items</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bouncy-click h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
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
                'bouncy-click h-8 w-8',
                shuffleMode
                  ? 'bg-cosmic-green/20 text-cosmic-green'
                  : 'text-white/70 hover:bg-cosmic-green/10 hover:text-cosmic-green'
              )}
              onClick={handleShuffle}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'bouncy-click h-8 w-8',
                repeatMode !== 'none'
                  ? 'bg-cosmic-blue/20 text-cosmic-blue'
                  : 'text-white/70 hover:bg-cosmic-blue/10 hover:text-cosmic-blue'
              )}
              onClick={handleRepeat}
            >
              {repeatMode === 'one' ? (
                <Repeat1 className="h-4 w-4" />
              ) : (
                <Repeat className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Badge
            variant="secondary"
            className="border-cosmic-purple/30 bg-cosmic-purple/20 text-cosmic-purple"
          >
            {repeatMode === 'none'
              ? 'No Repeat'
              : repeatMode === 'all'
                ? 'Repeat All'
                : 'Repeat One'}
          </Badge>
        </div>

        {/* Playlist Items */}
        <ScrollArea className="flex-grow">
          <div className="space-y-2">
            {playlist.length === 0 ? (
              <div className="py-12 text-center">
                <FileVideo className="mx-auto mb-4 h-16 w-16 text-white/20" />
                <p className="text-sm text-white/60">No items in playlist</p>
                <p className="mt-2 text-xs text-white/40">
                  Add files to get started
                </p>
              </div>
            ) : (
              playlist.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    'group flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-all duration-300',
                    'hover-lift hover:bg-white/10',
                    index === currentIndex
                      ? 'border border-cosmic-purple/30 bg-cosmic-purple/20'
                      : 'bg-white/5'
                  )}
                  onClick={() => handlePlayItem(index)}
                >
                  <div className="relative flex-shrink-0">
                    {index === currentIndex ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-cosmic-purple hover:bg-cosmic-pink/20 hover:text-cosmic-pink"
                      >
                        {controls.isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-xs font-medium text-white/60">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-grow">
                    <p className="truncate text-sm font-medium text-white transition-colors group-hover:text-cosmic-cyan">
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
                    className="bouncy-click h-6 w-6 text-white/40 opacity-0 transition-all hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(index);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>
              Total:{' '}
              {formatTime(
                playlist.reduce((acc, item) => acc + item.duration, 0)
              )}
            </span>
            <span>{playlist.length} files</span>
          </div>
        </div>
      </div>
    </div>
  );
}
