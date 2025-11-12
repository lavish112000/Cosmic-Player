'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const DEFAULT_VIDEO_SRC =
  'https://firebasestudio-hosting-f2553.web.app/4k-video-sample.mp4';

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
  const [aspectRatio, setAspectRatioState] = useState<
    'contain' | 'cover' | 'fill'
  >('contain');
  const [subtitleTrack, setSubtitleTrack] = useState<string | null>(null);
  const [audioTrack, setAudioTrack] = useState(0);
  const availableSubtitleTracks = [
    'Off',
    'English',
    'Spanish',
    'French',
    'German',
  ];
  const availableAudioTracks = ['Track 1 (Default)', 'Track 2', 'Track 3'];

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ===== INITIALIZATION =====
  // Load the default video when the component first mounts
  useEffect(() => {
    setVideoSrc(DEFAULT_VIDEO_SRC);
  }, []);

  /**
   * Reset the auto-hide timer for controls
   * Controls show when mouse moves, then hide after 3 seconds of inactivity
   */
  const resetControlsTimeout = useCallback(() => {
    // Clear any existing timer
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Show controls immediately
    setAreControlsVisible(true);
    // Hide controls after 3 seconds if video is playing
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setAreControlsVisible(false);
      }
    }, 3000);
  }, []);

  // ===== PLAYBACK CONTROLS =====

  /**
   * Toggle between play and pause
   */
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

  /**
   * Jump to a specific time in the video
   * @param time - Time in seconds to seek to
   */
  const seekTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setProgress(time);
    }
  };

  // ===== AUDIO CONTROLS =====

  /**
   * Change the volume level
   * @param newVolume - Volume from 0 (silent) to 1 (max)
   */
  const changeVolume = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      // Auto-mute if volume is set to 0
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  /**
   * Toggle mute on/off
   * If unmuting with 0 volume, set volume to 100%
   */
  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      // If unmuting and volume is 0, restore to full volume
      if (!newMuted && volume === 0) {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  // ===== PLAYBACK SPEED =====

  /**
   * Increase or decrease playback speed
   * @param delta - Amount to change speed (e.g., 0.25 or -0.25)
   * Range: 0.25x (slowest) to 4x (fastest)
   */
  const changePlaybackRate = (delta: number) => {
    if (videoRef.current) {
      const newRate = Math.max(
        0.25,
        Math.min(4, videoRef.current.playbackRate + delta)
      );
      videoRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  };

  // ===== DISPLAY SETTINGS =====

  /**
   * Set how the video fits in its container
   * @param ratio - 'contain' (fit inside), 'cover' (fill), or 'fill' (stretch)
   */
  const setAspectRatio = (ratio: 'contain' | 'cover' | 'fill') => {
    setAspectRatioState(ratio);
  };

  /**
   * Zoom in or out on the video
   * @param delta - Amount to zoom (e.g., 0.1 or -0.1)
   * Range: 1x (normal) to 3x (maximum zoom)
   */
  const changeZoom = (delta: number) => {
    setZoom((prev) => Math.max(1, Math.min(3, prev + delta)));
  };

  // ===== TRACK SELECTION =====

  /**
   * Select a subtitle track
   * @param track - Track name or null to disable subtitles
   */
  const selectSubtitleTrack = (track: string | null) => {
    setSubtitleTrack(track);
  };

  /**
   * Select an audio track
   * @param trackIndex - Index of the audio track to use
   */
  const selectAudioTrack = (trackIndex: number) => {
    setAudioTrack(trackIndex);
  };

  // ===== FULLSCREEN =====

  /**
   * Toggle fullscreen mode on/off
   */
  const toggleFullScreen = useCallback(() => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      // Enter fullscreen
      playerContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // ===== FILE OPERATIONS =====

  /**
   * Open file picker to select a single video
   */
  const openFilePicker = () => fileInputRef.current?.click();

  /**
   * Open folder picker to select multiple videos
   */
  const openFolderPicker = () => folderInputRef.current?.click();

  /**
   * Close/exit the current video
   * Stops playback and cleans up resources
   */
  const exitPlayer = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Revoke object URL to prevent memory leaks
      if (videoSrc && videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
      }
      videoRef.current.src = '';
    }
    // Reset all state to initial values
    setVideoSrc(null);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
  };

  // ===== EVENT HANDLERS =====

  /**
   * Handle file selection from file picker
   * Creates a blob URL and loads the video
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous object URL to prevent memory leaks
      if (videoSrc && videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
      }

      // Create a temporary URL for the selected file
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

  /**
   * Handle single click on player container
   * Toggles control visibility
   */
  const handleContainerClick = () => {
    setAreControlsVisible((prev) => !prev);
  };

  /**
   * Handle double click on player container
   * Toggles fullscreen mode
   */
  const handleContainerDoubleClick = () => {
    toggleFullScreen();
  };

  /**
   * Handle mouse movement over player
   * Shows controls and resets auto-hide timer
   */
  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  /**
   * Handle video time update (fires continuously during playback)
   * Updates the progress bar position
   */
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime);
    }
  };

  /**
   * Handle video metadata loaded (when video info is available)
   * Sets duration and attempts to autoplay
   */
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setPlaybackRate(videoRef.current.playbackRate);

      // Try to autoplay, but handle cases where it's blocked by browser
      const attemptAutoplay = async () => {
        try {
          await videoRef.current!.play();
          setIsPlaying(true);
        } catch (e) {
          // Autoplay was prevented, keep muted state and don't auto-play
          setIsPlaying(false);
          console.warn('Autoplay was prevented by browser:', e);
        }
      };

      attemptAutoplay();
    }
  };

  // ===== SIDE EFFECTS =====

  /**
   * Listen for fullscreen changes (user pressing ESC, etc.)
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  /**
   * Manage control visibility based on play state
   * Controls auto-hide during playback, stay visible when paused
   */
  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      // Keep controls visible when paused
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      setAreControlsVisible(true);
    }
    // Cleanup timeout on unmount
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, resetControlsTimeout]);

  /**
   * Auto-play when a new video is loaded
   */
  useEffect(() => {
    if (videoRef.current?.src) {
      setIsPlaying(true);
      resetControlsTimeout();
    }
  }, [resetControlsTimeout, videoSrc]);

  // ===== RETURN ALL STATE AND FUNCTIONS =====
  // This object is used by components to control the player
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
    // Also expose refs directly for convenience
    videoRef,
    playerContainerRef,
    fileInputRef,
    folderInputRef,
    // Event handlers for DOM elements
    clickHandlers: {
      handleFileChange,
      handleContainerClick,
      handleContainerDoubleClick,
      handleMouseMove,
      handleTimeUpdate,
      handleLoadedMetadata,
    },
  };
}
