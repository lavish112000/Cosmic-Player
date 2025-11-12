import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function BrowsePage() {
  const videos = [
    {
      id: 1,
      title: 'Galaxy Exploration',
      description: 'Journey through the Andromeda galaxy.',
      thumbnail: 'https://placehold.co/600x400.png',
      dataAiHint: 'galaxy space',
    },
    {
      id: 2,
      title: 'Black Holes Explained',
      description: 'A deep dive into the physics of black holes.',
      thumbnail: 'https://placehold.co/600x400.png',
      dataAiHint: 'black hole',
    },
    {
      id: 3,
      title: 'The Beauty of Nebulae',
      description: 'Stunning visuals of cosmic clouds.',
      thumbnail: 'https://placehold.co/600x400.png',
      dataAiHint: 'nebula stars',
    },
    {
      id: 4,
      title: 'Life on Mars?',
      description: 'Investigating the possibility of life on the red planet.',
      thumbnail: 'https://placehold.co/600x400.png',
      dataAiHint: 'mars planet',
    },
    {
      id: 5,
      title: 'The Future of Space Travel',
      description: "What's next for humanity's cosmic journey.",
      thumbnail: 'https://placehold.co/600x400.png',
      dataAiHint: 'space travel',
    },
    {
      id: 6,
      title: 'Cosmic Mysteries',
      description: "Unraveling the universe's biggest secrets.",
      thumbnail: 'https://placehold.co/600x400.png',
      dataAiHint: 'cosmic mystery',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center font-headline text-4xl font-bold">
        Browse Videos
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card
            key={video.id}
            className="overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <CardHeader className="p-0">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={600}
                height={400}
                className="h-auto w-full object-cover"
                data-ai-hint={video.dataAiHint}
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-2 text-xl font-bold">
                {video.title}
              </CardTitle>
              <p className="text-muted-foreground">{video.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
