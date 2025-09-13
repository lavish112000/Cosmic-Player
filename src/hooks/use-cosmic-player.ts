"use client";

import { useState, useRef, useEffect, useCallback } from 'react';

const DEFAULT_VIDEO_SRC = "https://firebasestudio-hosting-f2553.web.app/4k-video-sample.mp4";

export function useCosmicPlayer() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatioState] = useState<'contain' | 'cover' | 'fill'>('contain');
  const [subtitleTrack, setSubtitleTrack] = useState<string | null>(null);
  const [audioTrack, setAudioTrack] = useState(0);
  const availableSubtitleTracks = ['Off', 'English', 'Spanish', 'French', 'German'];
  const availableAudioTracks = ['Track 1 (Default)', 'Track 2', 'Track 3'];
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setVideoSrc(DEFAULT_VIDEO_SRC);
  }, []);

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
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if(!newMuted && volume === 0) {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };
  
  const changePlaybackRate = (delta: number) => {
    if (videoRef.current) {
      const newRate = Math.max(0.25, Math.min(4, videoRef.current.playbackRate + delta));
      videoRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  };
  
  const setAspectRatio = (ratio: 'contain' | 'cover' | 'fill') => {
    setAspectRatioState(ratio);
  };

  const changeZoom = (delta: number) => {
    setZoom(prev => Math.max(1, Math.min(3, prev + delta)));
  };

  const selectSubtitleTrack = (track: string | null) => {
    setSubtitleTrack(track);
  };

  const selectAudioTrack = (trackIndex: number) => {
    setAudioTrack(trackIndex);
  };

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
        // Revoke object URL to prevent memory leaks
        if (videoSrc && videoSrc.startsWith('blob:')) {
            URL.revokeObjectURL(videoSrc);
        }
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
      // Revoke previous object URL to prevent memory leaks
      if (videoSrc && videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
      }

      const url = URL.createObjectURL(file);
      setVideoSrc(url);

      if (videoRef.current) {
        // Reset muted state for new files to allow autoplay
        videoRef.current.muted = false;
        setIsMuted(false);
        setVolume(1); // Reset volume to 100%
      }
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
      setPlaybackRate(videoRef.current.playbackRate);

      // Try to autoplay, but handle cases where it's blocked
      const attemptAutoplay = async () => {
        try {
          await videoRef.current!.play();
          setIsPlaying(true);
        } catch (e) {
          // Autoplay was prevented, keep muted state and don't auto-play
          setIsPlaying(false);
          console.warn("Autoplay was prevented by browser:", e);
        }
      };

      attemptAutoplay();
    }
  };
  
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
  
  useEffect(() => {
    if (videoRef.current?.src) {
        setIsPlaying(true);
        resetControlsTimeout();
    }
  }, [resetControlsTimeout, videoSrc]);


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
      availableSubtitleTracks,
      availableAudioTracks,
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
      selectSubtitleTrack,
      selectAudioTrack,
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
