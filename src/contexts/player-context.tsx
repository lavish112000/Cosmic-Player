'use client';

import React from 'react';
import { useCosmicPlayer } from '@/hooks/use-cosmic-player';

type PlayerContextType = ReturnType<typeof useCosmicPlayer> | null;

export const PlayerContext = React.createContext<PlayerContextType>(null);

export const PlayerProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: PlayerContextType;
}) => {
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
