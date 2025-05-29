import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              ← Back to Home
            </Link>
          </Button>
        </div>

        {/* Projects Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            これまでに取り組んだすべてのプロジェクトをご覧ください
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* YouTube Video Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>開発動画</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/KUKAEwzjxfY"
                title="Bevy Game Development"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild>
                <a 
                  href="https://www.youtube.com/playlist?list=PL2PifUeuI0TDeg8msv-R85gxSZbkj7sVo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  プレイリスト全体を見る
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}