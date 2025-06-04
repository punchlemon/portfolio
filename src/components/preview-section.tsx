import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Preview } from "@/lib/projects";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PreviewSectionProps {
  preview: Preview;
  className?: string;
}

export function PreviewSection({ preview, className }: PreviewSectionProps) {
  if (preview.type === 'video') {
    return (
      <Card className={cn("mb-12", className)}>
        <CardHeader>
          <CardTitle>{preview.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${preview.embedId}?rel=0&modestbranding=1`}
              title={preview.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
          {preview.playlistUrl && preview.playlistText && (
            <div className="mt-4">
              <Button variant="outline" asChild>
                <a 
                  href={preview.playlistUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {preview.playlistText}
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (preview.type === 'website') {
    return (
      <Card className={cn("mb-12", className)}>
        <CardHeader>
          <CardTitle>{preview.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video border rounded-lg overflow-hidden bg-gray-50 relative">
            {preview.imageUrl ? (
              <Image
                src={preview.imageUrl}
                alt={`${preview.title} screenshot`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">Website preview not available</p>
              </div>
            )}
          </div>
          {preview.url && preview.playlistText && (
            <div className="mt-4">
              <Button asChild>
                <a 
                  href={preview.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {preview.playlistText}
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
}