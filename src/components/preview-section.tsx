import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Preview } from "@/lib/projects";

interface PreviewSectionProps {
  preview: Preview;
}

export function PreviewSection({ preview }: PreviewSectionProps) {
  if (preview.type === 'video') {
    return (
      <Card className="mb-12">
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
          {preview.playlistUrl && (
            <div className="mt-4">
              <Button variant="outline" asChild>
                <a 
                  href={preview.playlistUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {preview.playlistText || "プレイリストを見る"}
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
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>{preview.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video border rounded-lg overflow-hidden bg-gray-50">
            <iframe
              src={preview.url}
              title={preview.title}
              width="100%"
              height="100%"
              className="border-0"
            />
          </div>
          <div className="mt-4">
            <Button asChild>
              <a 
                href={preview.url}
                target="_blank" 
                rel="noopener noreferrer"
              >
                サイトを開く
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}