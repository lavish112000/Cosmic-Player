"use client";

import React, { useState, useContext } from 'react';
import { PlayerContext } from '@/contexts/player-context';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { LCIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Home, Compass, Library, HelpCircle, X, Maximize, Minimize, ZoomIn, ZoomOut, MonitorUp, Languages, AudioWaveform, RectangleHorizontal, Crop, ChevronsRight, ChevronsLeft, File, Folder, Clock, RefreshCw, Info, Send, ListMusic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function RolloutNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const [isSubtitleDialogOpen, setIsSubtitleDialogOpen] = useState(false);
  const [isAudioDialogOpen, setIsAudioDialogOpen] = useState(false);
  const context = useContext(PlayerContext);
  const { toast } = useToast();

  if (!context) return null;

  const { controls, functions } = context;

  const handleUpdateCheck = () => {
    toast({
      title: "Up to date!",
      description: "You are running the latest version of Cosmic Player.",
    });
  };
  
  const renderNavButton = (Icon: React.ElementType, label: string, onClick?: () => void, selectedValue?: string, customClass?: string) => (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3 py-2 rounded-lg transition-all duration-300 bouncy-click hover-lift",
        "bg-transparent hover:bg-white/10 border-0 text-left",
        customClass
      )}
      onClick={onClick}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-grow">{label}</span>
      {selectedValue && <span className="ml-auto text-muted-foreground text-xs bg-white/10 px-2 py-1 rounded-full">{selectedValue}</span>}
    </Button>
  );

  return (
    <>
      <div
        className={cn(
          "absolute top-4 left-4 z-30 transition-all duration-500",
          isOpen && "translate-x-[320px]"
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-cosmic-purple/50 hover-glow hover-lift transition-all duration-300 bouncy-click group"
        >
          <LCIcon className="w-8 h-8 text-cosmic-purple group-hover:text-cosmic-pink transition-colors duration-300 drop-shadow-[0_0_10px_hsl(var(--cosmic-purple))]" />
        </Button>
      </div>

      <div
        className={cn(
          "absolute top-0 left-0 h-full w-80 bg-black/60 backdrop-blur-2xl z-20 transition-all duration-500 ease-out",
          "border-r border-white/20 shadow-2xl",
          "bg-gradient-to-b from-black/80 via-black/60 to-black/80",
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <LCIcon className="w-10 h-10 text-cosmic-purple drop-shadow-[0_0_15px_hsl(var(--cosmic-purple))]" />
              <div className="absolute inset-0 w-10 h-10 bg-cosmic-purple/20 rounded-full blur-md animate-pulse-glow" />
            </div>
            <div>
              <h2 className="text-2xl font-headline font-bold text-gradient">Cosmic Player</h2>
              <p className="text-xs text-white/60">v2.0 - Futuristic Edition</p>
            </div>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-cosmic-purple/50 to-transparent" />

          {/* Navigation Menu */}
          <Accordion type="multiple" className="w-full overflow-y-auto flex-grow mt-6 text-white space-y-2">
            <AccordionItem value="home" className="border-b border-white/10">
              <AccordionTrigger className="hover:no-underline hover:bg-white/5 px-3 py-2 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-cosmic-blue group-hover:text-cosmic-cyan transition-colors" />
                  <span className="font-medium">Home</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 pl-8 mt-2">
                {renderNavButton(Languages, "Subtitles", () => setIsSubtitleDialogOpen(true), controls.subtitleTrack || 'Off', "text-cosmic-green hover:text-cosmic-green hover:bg-cosmic-green/20")}
                {renderNavButton(AudioWaveform, "Audio Track", () => setIsAudioDialogOpen(true), controls.availableAudioTracks[controls.audioTrack], "text-cosmic-orange hover:text-cosmic-orange hover:bg-cosmic-orange/20")}
                {renderNavButton(MonitorUp, "Audio Device", () => {}, "", "text-cosmic-pink hover:text-cosmic-pink hover:bg-cosmic-pink/20")}
                {renderNavButton(controls.isFullscreen ? Minimize : Maximize, "Fullscreen", functions.toggleFullScreen, "", "text-cosmic-purple hover:text-cosmic-purple hover:bg-cosmic-purple/20")}
                <div className="flex items-center gap-2 mt-2">
                  {renderNavButton(ZoomOut, "Zoom Out", () => functions.changeZoom(-0.1), "", "text-cosmic-cyan hover:text-cosmic-cyan hover:bg-cosmic-cyan/20")}
                  {renderNavButton(ZoomIn, "Zoom In", () => functions.changeZoom(0.1), "", "text-cosmic-cyan hover:text-cosmic-cyan hover:bg-cosmic-cyan/20")}
                </div>
                <Select onValueChange={(v: string) => functions.setAspectRatio(v as "contain" | "fill" | "cover")} defaultValue={controls.aspectRatio}>
                  <SelectTrigger className="w-full justify-start gap-2 bouncy-click bg-white/5 border-white/20 hover:bg-white/10 hover:border-cosmic-blue/50 text-cosmic-blue mt-2">
                    <RectangleHorizontal className="w-4 h-4" />
                    <span>Aspect Ratio</span>
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                    <SelectItem value="contain" className="text-white hover:bg-cosmic-purple/20">Auto</SelectItem>
                    <SelectItem value="fill" className="text-white hover:bg-cosmic-purple/20">Fill</SelectItem>
                    <SelectItem value="cover" className="text-white hover:bg-cosmic-purple/20">Cover</SelectItem>
                  </SelectContent>
                </Select>
                {renderNavButton(Crop, "Crop", () => {}, "", "text-cosmic-yellow hover:text-cosmic-yellow hover:bg-cosmic-yellow/20")}
                <div className="flex items-center gap-2 mt-2">
                  {renderNavButton(ChevronsLeft, "Slower", () => functions.changePlaybackRate(-0.25), "", "text-cosmic-red hover:text-cosmic-red hover:bg-cosmic-red/20")}
                  {renderNavButton(ChevronsRight, "Faster", () => functions.changePlaybackRate(0.25), "", "text-cosmic-red hover:text-cosmic-red hover:bg-cosmic-red/20")}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="explore" className="border-b border-white/10">
              <AccordionTrigger className="hover:no-underline hover:bg-white/5 px-3 py-2 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-cosmic-pink group-hover:text-cosmic-purple transition-colors" />
                  <span className="font-medium">Explore</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 pl-8 mt-2">
                {renderNavButton(File, "Open File", functions.openFilePicker, "", "text-cosmic-cyan hover:text-cosmic-cyan hover:bg-cosmic-cyan/20")}
                {renderNavButton(Folder, "Open Folder", functions.openFolderPicker, "", "text-cosmic-cyan hover:text-cosmic-cyan hover:bg-cosmic-cyan/20")}
                {renderNavButton(Clock, "Recent Media", () => {}, "", "text-cosmic-orange hover:text-cosmic-orange hover:bg-cosmic-orange/20")}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="library" className="border-b border-white/10">
              <AccordionTrigger className="hover:no-underline hover:bg-white/5 px-3 py-2 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <Library className="w-5 h-5 text-cosmic-green group-hover:text-cosmic-cyan transition-colors" />
                  <span className="font-medium">Library</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 pl-8 mt-2">
                {renderNavButton(ListMusic, "Recent Playlist", () => {}, "", "text-cosmic-green hover:text-cosmic-green hover:bg-cosmic-green/20")}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="help">
              <AccordionTrigger className="hover:no-underline hover:bg-white/5 px-3 py-2 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-cosmic-yellow group-hover:text-cosmic-orange transition-colors" />
                  <span className="font-medium">Help</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 pl-8 mt-2">
                {renderNavButton(RefreshCw, "Check for Updates", handleUpdateCheck, "", "text-cosmic-blue hover:text-cosmic-blue hover:bg-cosmic-blue/20")}
                {renderNavButton(Info, "About Us", () => setAboutOpen(true), "", "text-cosmic-purple hover:text-cosmic-purple hover:bg-cosmic-purple/20")}
                <a href="mailto:lalitchoudhary112000@gmail.com" className="block">
                  {renderNavButton(Send, "Connect With Us", () => {}, "", "text-cosmic-pink hover:text-cosmic-pink hover:bg-cosmic-pink/20")}
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="bg-gradient-to-r from-transparent via-cosmic-purple/50 to-transparent mt-auto" />

          {/* Footer */}
          <div className="p-4">
            {renderNavButton(X, "Exit", functions.exitPlayer, "", "text-red-400 hover:text-red-300 hover:bg-red-500/20")}
          </div>
        </div>
      </div>
      <Dialog open={isAboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>About Cosmic Player</DialogTitle>
                <DialogDescription>
                    Cosmic Player is a modern, interactive video player designed for an immersive viewing experience. Built with Next.js and Tailwind CSS.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={() => setAboutOpen(false)}>Close</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Subtitle Track Selection Dialog */}
      <Dialog open={isSubtitleDialogOpen} onOpenChange={setIsSubtitleDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Select Subtitle Track</DialogTitle>
                <DialogDescription>
                    Choose a subtitle track for the video.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
                {controls.availableSubtitleTracks.map((track) => (
                    <Button
                        key={track}
                        variant={controls.subtitleTrack === (track === 'Off' ? null : track) ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                            functions.selectSubtitleTrack(track === 'Off' ? null : track);
                            setIsSubtitleDialogOpen(false);
                            toast({
                                title: "Subtitle Track Changed",
                                description: `Selected: ${track}`,
                            });
                        }}
                    >
                        {track}
                    </Button>
                ))}
            </div>
            <DialogFooter>
                <Button onClick={() => setIsSubtitleDialogOpen(false)}>Cancel</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Audio Track Selection Dialog */}
      <Dialog open={isAudioDialogOpen} onOpenChange={setIsAudioDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Select Audio Track</DialogTitle>
                <DialogDescription>
                    Choose an audio track for the video.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
                {controls.availableAudioTracks.map((track, index) => (
                    <Button
                        key={track}
                        variant={controls.audioTrack === index ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                            functions.selectAudioTrack(index);
                            setIsAudioDialogOpen(false);
                            toast({
                                title: "Audio Track Changed",
                                description: `Selected: ${track}`,
                            });
                        }}
                    >
                        {track}
                    </Button>
                ))}
            </div>
            <DialogFooter>
                <Button onClick={() => setIsAudioDialogOpen(false)}>Cancel</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
