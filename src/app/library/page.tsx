import { Button } from '@/components/ui/button';
import { ListVideo } from 'lucide-react';

export default function LibraryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-8 text-center">My Library</h1>
      <div className="flex flex-col items-center justify-center h-[50vh] border-2 border-dashed rounded-lg">
        <ListVideo className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your library is empty</h2>
        <p className="text-muted-foreground mb-4">Videos you save will appear here.</p>
        <Button>Browse Videos</Button>
      </div>
    </main>
  );
}
