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
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { LCIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Home, Compass, Library, HelpCircle, X, Maximize, Minimize, ZoomIn, ZoomOut, MonitorUp, Languages, AudioWaveform, RectangleHorizontal, RectangleVertical, Crop, ChevronsRight, ChevronsLeft, File, Folder, Clock, RefreshCw, Info, Send, ListMusic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function RolloutNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
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
  
  const renderNavButton = (Icon: React.ElementType, label: string, onClick?: () => void, selectedValue?: string) => (
    <Button variant="ghost" className="w-full justify-start gap-2 bouncy-click" onClick={onClick}>
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {selectedValue && <span className="ml-auto text-muted-foreground text-xs">{selectedValue}</span>}
    </Button>
  );

  return (
    <>
      <div
        className={cn(
          "absolute top-4 left-4 z-30 transition-all duration-300",
          isOpen && "translate-x-[280px]"
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm bouncy-click">
          <LCIcon className="w-8 h-8 text-white drop-shadow-[0_0_8px_hsl(var(--primary))]" />
        </Button>
      </div>

      <div
        className={cn(
          "absolute top-0 left-0 h-full w-72 bg-black/50 backdrop-blur-md z-20 transition-transform duration-300 ease-in-out",
          "border-r border-white/10 shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <LCIcon className="w-8 h-8 text-white" />
            <h2 className="text-xl font-headline font-bold text-white">Cosmic Player</h2>
          </div>
          <Separator className="bg-white/20" />
          <Accordion type="multiple" className="w-full overflow-y-auto flex-grow mt-2 text-white">
            <AccordionItem value="home">
              <AccordionTrigger className="hover:no-underline"><Home className="mr-2"/>Home</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 pl-2">
                {renderNavButton(Languages, "Subtitles", () => {}, controls.subtitleTrack || 'Off')}
                {renderNavButton(AudioWaveform, "Audio Track", () => {}, `Track ${controls.audioTrack}`)}
                {renderNavButton(MonitorUp, "Audio Device")}
                {renderNavButton(controls.isFullscreen ? Minimize : Maximize, "Fullscreen", functions.toggleFullScreen)}
                <div className="flex items-center gap-1">{renderNavButton(ZoomOut, "Zoom Out", () => functions.changeZoom(-0.1))} {renderNavButton(ZoomIn, "Zoom In", () => functions.changeZoom(0.1))}</div>
                <Select onValueChange={(v) => functions.setAspectRatio(v as any)} defaultValue={controls.aspectRatio}>
                    <SelectTrigger className="w-full justify-start gap-2 bouncy-click bg-transparent border-0 hover:bg-accent/50"><RectangleHorizontal className="w-4 h-4"/>Aspect Ratio</SelectTrigger>
                    <SelectContent><SelectItem value="contain">Auto</SelectItem><SelectItem value="fill">Fill</SelectItem><SelectItem value="cover">Cover</SelectItem></SelectContent>
                </Select>
                {renderNavButton(Crop, "Crop")}
                <div className="flex items-center gap-1">{renderNavButton(ChevronsLeft, "Slower", () => functions.changePlaybackRate(-0.25))} {renderNavButton(ChevronsRight, "Faster", () => functions.changePlaybackRate(0.25))}</div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="explore">
              <AccordionTrigger className="hover:no-underline"><Compass className="mr-2"/>Explore</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 pl-2">
                {renderNavButton(File, "Open File", functions.openFilePicker)}
                {renderNavButton(Folder, "Open Folder", functions.openFolderPicker)}
                {renderNavButton(Clock, "Recent Media")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="library">
              <AccordionTrigger className="hover:no-underline"><Library className="mr-2"/>Library</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 pl-2">
                {renderNavButton(ListMusic, "Recent Playlist")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="help">
              <AccordionTrigger className="hover:no-underline"><HelpCircle className="mr-2"/>Help</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 pl-2">
                {renderNavButton(RefreshCw, "Check for Updates", handleUpdateCheck)}
                {renderNavButton(Info, "About Us", () => setAboutOpen(true))}
                <a href="mailto:lalitchoudhary112000@gmail.com">
                  {renderNavButton(Send, "Connect With Us")}
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="bg-white/20 mt-auto" />
          <div className="p-2">
             {renderNavButton(X, "Exit", functions.exitPlayer)}
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
    </>
  );
}
