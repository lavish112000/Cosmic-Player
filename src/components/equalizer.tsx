"use client";

import React, { useState, useContext } from 'react';
import { PlayerContext } from '@/contexts/player-context';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  AudioWaveform,
  Volume2,
  RotateCcw,
  Settings,
  X,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EqualizerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EQBand {
  frequency: string;
  value: number;
  min: number;
  max: number;
}

export function Equalizer({ isOpen, onClose }: EqualizerProps) {
  const context = useContext(PlayerContext);
  const [eqBands, setEqBands] = useState<EQBand[]>([
    { frequency: '60Hz', value: 0, min: -12, max: 12 },
    { frequency: '150Hz', value: 0, min: -12, max: 12 },
    { frequency: '400Hz', value: 0, min: -12, max: 12 },
    { frequency: '1kHz', value: 0, min: -12, max: 12 },
    { frequency: '2.5kHz', value: 0, min: -12, max: 12 },
    { frequency: '6kHz', value: 0, min: -12, max: 12 },
    { frequency: '15kHz', value: 0, min: -12, max: 12 },
  ]);

  const presets = {
    flat: [0, 0, 0, 0, 0, 0, 0],
    rock: [2, 1, -1, -2, 1, 3, 4],
    pop: [-1, 0, 2, 3, 2, 0, -1],
    jazz: [3, 2, 0, 1, 2, 3, 2],
    classical: [2, 2, 0, 0, -1, -1, 1],
    electronic: [4, 2, -2, -3, 1, 3, 4],
    hiphop: [3, 1, -1, -2, 0, 1, 2],
  };

  const [currentPreset, setCurrentPreset] = useState<string>('flat');
  const [isEnabled, setIsEnabled] = useState(false);

  if (!context) return null;

  const handleBandChange = (index: number, value: number[]) => {
    const newBands = [...eqBands];
    newBands[index].value = value[0];
    setEqBands(newBands);
  };

  const applyPreset = (presetName: string) => {
    const preset = presets[presetName as keyof typeof presets];
    const newBands = eqBands.map((band, index) => ({
      ...band,
      value: preset[index]
    }));
    setEqBands(newBands);
    setCurrentPreset(presetName);
  };

  const resetEQ = () => {
    const resetBands = eqBands.map(band => ({ ...band, value: 0 }));
    setEqBands(resetBands);
    setCurrentPreset('flat');
  };

  const toggleEQ = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div
      className={cn(
        "absolute top-0 right-0 h-full w-96 bg-black/80 backdrop-blur-2xl z-20 transition-all duration-500 ease-out",
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
              <AudioWaveform className="w-8 h-8 text-cosmic-cyan" />
              <div className="absolute inset-0 w-8 h-8 bg-cosmic-cyan/20 rounded-full blur-md animate-pulse-glow" />
            </div>
            <div>
              <h3 className="text-xl font-headline font-bold text-gradient">Equalizer</h3>
              <p className="text-xs text-white/60">7-Band Audio Processor</p>
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

        <Separator className="bg-gradient-to-r from-transparent via-cosmic-cyan/50 to-transparent" />

        {/* Controls */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-10 h-10 rounded-full bouncy-click transition-all duration-300",
                isEnabled
                  ? "bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 glow-cyan"
                  : "bg-white/10 text-white/70 hover:text-cosmic-cyan hover:bg-cosmic-cyan/10"
              )}
              onClick={toggleEQ}
            >
              <Volume2 className="w-5 h-5" />
            </Button>
            <Badge
              variant="secondary"
              className={cn(
                "transition-colors",
                isEnabled ? "bg-cosmic-cyan/20 text-cosmic-cyan border-cosmic-cyan/30" : "bg-white/10 text-white/60"
              )}
            >
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-white/70 hover:text-cosmic-orange hover:bg-cosmic-orange/20 bouncy-click"
            onClick={resetEQ}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* EQ Bands */}
        <div className="flex-grow">
          <div className="grid grid-cols-7 gap-4 mb-6">
            {eqBands.map((band, index) => (
              <div key={band.frequency} className="flex flex-col items-center gap-3">
                <div className="text-xs text-white/60 font-medium">{band.frequency}</div>
                <div className="relative h-32 w-8">
                  {/* Background scale */}
                  <div className="absolute inset-0 flex flex-col justify-between py-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-px bg-white/20"
                        style={{ opacity: 0.3 + (i * 0.1) }}
                      />
                    ))}
                  </div>

                  {/* Slider */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Slider
                      orientation="vertical"
                      min={band.min}
                      max={band.max}
                      step={0.5}
                      value={[band.value]}
                      onValueChange={(value) => handleBandChange(index, value)}
                      className="h-full"
                      disabled={!isEnabled}
                    />
                  </div>

                  {/* Value display */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-cosmic-cyan font-mono">
                    {band.value > 0 ? '+' : ''}{band.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Frequency Response Visualization */}
          <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-cosmic-cyan" />
              <span className="text-sm text-white/80 font-medium">Frequency Response</span>
            </div>
            <div className="h-16 bg-black/20 rounded flex items-end justify-between px-2 py-1">
              {eqBands.map((band) => {
                const height = ((band.value - band.min) / (band.max - band.min)) * 100;
                return (
                  <div
                    key={band.frequency}
                    className="flex-1 mx-px bg-gradient-to-t from-cosmic-cyan to-cosmic-blue rounded-sm transition-all duration-300"
                    style={{
                      height: `${Math.max(10, height)}%`,
                      opacity: isEnabled ? 0.8 : 0.3
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white/80 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Presets
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(presets).map((preset) => (
              <Button
                key={preset}
                variant="ghost"
                size="sm"
                className={cn(
                  "capitalize text-xs bouncy-click transition-all duration-300",
                  currentPreset === preset
                    ? "bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple/30"
                    : "bg-white/5 text-white/70 hover:text-cosmic-purple hover:bg-cosmic-purple/10"
                )}
                onClick={() => applyPreset(preset)}
                disabled={!isEnabled}
              >
                {preset}
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Current: {currentPreset}</span>
            <Badge variant="outline" className="border-cosmic-cyan/30 text-cosmic-cyan">
              7-Band EQ
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}