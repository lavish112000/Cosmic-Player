'use client';

import React, { useContext } from 'react';
import { PlayerContext } from '@/contexts/player-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Info,
  X,
  FileVideo,
  Clock,
  HardDrive,
  Monitor,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/utils';

interface MediaInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MediaInfo({ isOpen, onClose }: MediaInfoProps) {
  const context = useContext(PlayerContext);

  if (!context) {
    return null;
  }

  const { controls, functions, videoSrc } = context;

  const formatFileSize = (bytes: number) => {
    if (!bytes) {
      return 'Unknown';
    }
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getVideoInfo = () => {
    if (!videoSrc) {
      return null;
    }

    // This would normally come from the video element or file metadata
    return {
      name: videoSrc.split('/').pop() || 'Unknown',
      path: videoSrc,
      size: 0, // Would be populated from file system
      duration: controls.duration,
      resolution: '1920x1080', // Would be detected from video
      bitrate: '5000 kbps', // Would be calculated
      codec: 'H.264', // Would be detected
      frameRate: '30 fps', // Would be detected
    };
  };

  const videoInfo = getVideoInfo();

  if (!videoInfo) {
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
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Info className="h-8 w-8 text-cosmic-green" />
                <div className="absolute inset-0 h-8 w-8 animate-pulse-glow rounded-full bg-cosmic-green/20 blur-md" />
              </div>
              <div>
                <h3 className="text-gradient font-headline text-xl font-bold">
                  Media Info
                </h3>
                <p className="text-xs text-white/60">No media loaded</p>
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

          <div className="flex flex-grow items-center justify-center">
            <div className="text-center">
              <FileVideo className="mx-auto mb-4 h-16 w-16 text-white/20" />
              <p className="text-white/60">
                Load a video to see media information
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <Info className="h-8 w-8 text-cosmic-green" />
              <div className="absolute inset-0 h-8 w-8 animate-pulse-glow rounded-full bg-cosmic-green/20 blur-md" />
            </div>
            <div>
              <h3 className="text-gradient font-headline text-xl font-bold">
                Media Info
              </h3>
              <p
                className="truncate text-xs text-white/60"
                title={videoInfo.name}
              >
                {videoInfo.name}
              </p>
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

        <Separator className="bg-gradient-to-r from-transparent via-cosmic-green/50 to-transparent" />

        {/* Quick Controls */}
        <div className="flex items-center justify-center gap-2 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="bouncy-click h-10 w-10 text-white/70 hover:bg-cosmic-cyan/20 hover:text-cosmic-cyan"
            onClick={() =>
              functions.seekTo(Math.max(0, controls.progress - 10))
            }
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bouncy-click h-12 w-12 text-white hover:bg-cosmic-purple/20 hover:text-cosmic-purple"
            onClick={functions.togglePlay}
          >
            {controls.isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bouncy-click h-10 w-10 text-white/70 hover:bg-cosmic-cyan/20 hover:text-cosmic-cyan"
            onClick={() =>
              functions.seekTo(
                Math.min(controls.duration, controls.progress + 10)
              )
            }
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm text-white/80">
            <span>{formatTime(controls.progress)}</span>
            <span>{formatTime(controls.duration)}</span>
          </div>
          <Progress
            value={(controls.progress / controls.duration) * 100}
            className="h-2 bg-white/20"
          />
        </div>

        {/* Media Details */}
        <div className="flex-grow space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
              <FileVideo className="h-5 w-5 flex-shrink-0 text-cosmic-blue" />
              <div className="min-w-0">
                <p className="text-xs text-white/60">Filename</p>
                <p
                  className="truncate text-sm text-white"
                  title={videoInfo.name}
                >
                  {videoInfo.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
              <Clock className="h-5 w-5 flex-shrink-0 text-cosmic-green" />
              <div>
                <p className="text-xs text-white/60">Duration</p>
                <p className="text-sm text-white">
                  {formatTime(videoInfo.duration)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
              <HardDrive className="h-5 w-5 flex-shrink-0 text-cosmic-orange" />
              <div>
                <p className="text-xs text-white/60">File Size</p>
                <p className="text-sm text-white">
                  {formatFileSize(videoInfo.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
              <Monitor className="h-5 w-5 flex-shrink-0 text-cosmic-purple" />
              <div>
                <p className="text-xs text-white/60">Resolution</p>
                <p className="text-sm text-white">{videoInfo.resolution}</p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">
              Technical Details
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Badge
                variant="secondary"
                className="border-cosmic-cyan/30 bg-cosmic-cyan/20 text-cosmic-cyan"
              >
                {videoInfo.codec}
              </Badge>
              <Badge
                variant="secondary"
                className="border-cosmic-pink/30 bg-cosmic-pink/20 text-cosmic-pink"
              >
                {videoInfo.frameRate}
              </Badge>
              <Badge
                variant="secondary"
                className="border-cosmic-yellow/30 bg-cosmic-yellow/20 text-cosmic-yellow"
              >
                {videoInfo.bitrate}
              </Badge>
              <Badge
                variant="secondary"
                className="border-cosmic-green/30 bg-cosmic-green/20 text-cosmic-green"
              >
                {controls.aspectRatio}
              </Badge>
            </div>
          </div>

          {/* Playback Stats */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">
              Playback Stats
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded bg-white/5 p-2">
                <p className="text-white/60">Playback Rate</p>
                <p className="font-medium text-white">
                  {controls.playbackRate.toFixed(2)}x
                </p>
              </div>
              <div className="rounded bg-white/5 p-2">
                <p className="text-white/60">Volume</p>
                <p className="font-medium text-white">
                  {Math.round((controls.isMuted ? 0 : controls.volume) * 100)}%
                </p>
              </div>
              <div className="rounded bg-white/5 p-2">
                <p className="text-white/60">Zoom</p>
                <p className="font-medium text-white">
                  {controls.zoom.toFixed(1)}x
                </p>
              </div>
              <div className="rounded bg-white/5 p-2">
                <p className="text-white/60">Status</p>
                <p className="font-medium text-white">
                  {controls.isPlaying ? 'Playing' : 'Paused'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Aspect Ratio: {controls.aspectRatio}</span>
            <Badge
              variant="outline"
              className="border-cosmic-green/30 text-cosmic-green"
            >
              Active
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
