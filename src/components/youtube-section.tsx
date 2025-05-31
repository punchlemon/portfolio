import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface YouTubeSectionProps {
  embedId: string;
  playlistUrl?: string;
  title?: string;
}

export function YouTubeSection({ embedId, playlistUrl, title = "開発動画" }: YouTubeSectionProps) {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${embedId}`}
            title="Project Development Video"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
        {playlistUrl && (
          <div className="mt-4">
            <Button variant="outline" asChild>
              <a 
                href={playlistUrl}
                target="_blank" 
                rel="noopener noreferrer"
              >
                プレイリスト全体を見る
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}