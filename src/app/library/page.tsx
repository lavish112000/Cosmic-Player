import { Button } from '@/components/ui/button';
import { ListVideo } from 'lucide-react';

export default function LibraryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center font-headline text-4xl font-bold">
        My Library
      </h1>
      <div className="flex h-[50vh] flex-col items-center justify-center rounded-lg border-2 border-dashed">
        <ListVideo className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="mb-2 text-2xl font-semibold">Your library is empty</h2>
        <p className="mb-4 text-muted-foreground">
          Videos you save will appear here.
        </p>
        <Button>Browse Videos</Button>
      </div>
    </main>
  );
}
