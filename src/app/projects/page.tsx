import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      </div>
    </div>
  );
}