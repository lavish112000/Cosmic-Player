"use client";

import { useState, useRef, useEffect, useCallback } from 'react';

export function useCosmicPlayer() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState<'contain' | 'cover' | 'fill'>('contain');
  const [subtitleTrack, setSubtitleTrack] = useState<string | null>(null);
  const [audioTrack, setAudioTrack] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setAreControlsVisible(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setAreControlsVisible(false);
      }
    }, 3000);
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const seekTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const changeVolume = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const changePlaybackRate = (delta: number) => {
    if (videoRef.current) {
      const newRate = Math.max(0.25, Math.min(4, videoRef.current.playbackRate + delta));
      videoRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  };
  
  const changeZoom = (delta: number) => {
    setZoom(prev => Math.max(1, Math.min(3, prev + delta)));
  }

  const toggleFullScreen = useCallback(() => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const openFilePicker = () => fileInputRef.current?.click();
  const openFolderPicker = () => folderInputRef.current?.click();
  
  const exitPlayer = () => {
    if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
    }
    setVideoSrc(null);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };
  
  const handleContainerClick = () => {
     setAreControlsVisible(prev => !prev);
  };
  
  const handleContainerDoubleClick = () => {
    toggleFullScreen();
  };

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsPlaying(!videoRef.current.paused);
      setPlaybackRate(videoRef.current.playbackRate);
    }
  };
  
  useEffect(() => {
    if (videoSrc) {
        setIsPlaying(true);
        videoRef.current?.play();
    }
  }, [videoSrc]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      setAreControlsVisible(true);
    }
    return () => {
       if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    }
  }, [isPlaying, resetControlsTimeout]);


  return {
    videoSrc,
    controls: {
      isPlaying,
      progress,
      duration,
      volume,
      isMuted,
      playbackRate,
      isFullscreen,
      areControlsVisible,
      zoom,
      aspectRatio,
      subtitleTrack,
      audioTrack,
    },
    functions: {
      setIsPlaying,
      togglePlay,
      seekTo,
      setVolume: changeVolume,
      toggleMute,
      changePlaybackRate,
      toggleFullScreen,
      setAspectRatio,
      changeZoom,
      openFilePicker,
      openFolderPicker,
      exitPlayer,
    },
    refs: {
      videoRef,
      playerContainerRef,
      fileInputRef,
    },
    videoRef,
    playerContainerRef,
    fileInputRef,
    folderInputRef,
    clickHandlers: {
      handleFileChange,
      handleContainerClick,
      handleContainerDoubleClick,
      handleMouseMove,
      handleTimeUpdate,
      handleLoadedMetadata,
    }
  };
}
