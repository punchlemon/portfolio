import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PreviewSection } from "@/components/preview-section";
import Image from "next/image";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* プレビューと概要・機能を並べて表示 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 左カラム: プレビュー */}
          {project.preview && (
            <div className="flex items-start">
              <PreviewSection preview={project.preview} className="w-full" />
            </div>
          )}
          
          {/* 右カラム: 概要と機能のカードを縦に並べる */}
          <div className="space-y-8">
            {/* 概要カード */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>概要</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground">{project.longDescription}</p>
              </CardContent>
            </Card>
            
            {/* 主な機能カード */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>主な機能</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 技術的課題と解決策 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>技術的課題と解決策</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* サブプロジェクト一覧（最後に配置） */}
        {project.subProjects && project.subProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">サブプロジェクト</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {project.subProjects.map((subProject) => (
                <Card key={subProject.id} className="overflow-hidden">
                  {/* サムネイル画像またはプレビュー */}
                  <div className="aspect-video relative">
                    {subProject.preview?.type === 'video' ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube-nocookie.com/embed/${subProject.preview.embedId}?rel=0&modestbranding=1`}
                        title={subProject.preview.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : subProject.preview?.type === 'website' && subProject.preview.imageUrl ? (
                      <Image
                        src={subProject.preview.imageUrl}
                        alt={`${subProject.title} screenshot`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : subProject.thumbnail ? (
                      <Image
                        src={subProject.thumbnail}
                        alt={subProject.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No preview</span>
                      </div>
                    )}
                  </div>

                  {/* プロジェクト情報 */}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{subProject.title}</CardTitle>
                      <div className="flex gap-2">
                        {subProject.liveUrl && (
                          <Button size="sm" asChild>
                            <a 
                              href={subProject.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              {subProject.preview?.type === 'video' ? 'Watch' : 'Live'}
                            </a>
                          </Button>
                        )}
                        {subProject.githubUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a 
                              href={subProject.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Github className="w-4 h-4 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{subProject.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* 技術スタック */}
                    {subProject.technologies && subProject.technologies.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">技術スタック</h4>
                        <div className="flex flex-wrap gap-2">
                          {subProject.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 詳細説明 */}
                    {subProject.longDescription && (
                      <div>
                        <h4 className="font-semibold mb-2">詳細</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {subProject.longDescription}
                        </p>
                      </div>
                    )}

                    {/* 主な機能 */}
                    {subProject.features && subProject.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">主な機能</h4>
                        <ul className="space-y-1">
                          {subProject.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 技術的課題 */}
                    {subProject.challenges && subProject.challenges.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">技術的課題</h4>
                        <ul className="space-y-1">
                          {subProject.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5"></span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}