"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/projects";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

// プロジェクトIDから一意のグラデーションを生成
function getGradientForProject(projectId: string) {
  const gradients = [
    {
      bg: "bg-gradient-to-br from-blue-300 to-purple-400",
    },
    {
      bg: "bg-gradient-to-br from-pink-300 to-orange-400",
    },
    {
      bg: "bg-gradient-to-br from-green-300 to-emerald-400",
    },
    {
      bg: "bg-gradient-to-br from-cyan-300 to-blue-400",
    },
    {
      bg: "bg-gradient-to-br from-violet-300 to-fuchsia-400",
    },
    {
      bg: "bg-gradient-to-br from-amber-300 to-red-400",
    },
    {
      bg: "bg-gradient-to-br from-slate-300 to-gray-400",
    },
    {
      bg: "bg-gradient-to-br from-indigo-300 to-purple-400",
    },
  ];

  let hash = 0;
  for (let i = 0; i < projectId.length; i++) {
    hash = ((hash << 5) - hash + projectId.charCodeAt(i)) & 0xffffffff;
  }
  const index = Math.abs(hash) % gradients.length;

  return gradients[index];
}

export function ProjectCard({ project }: ProjectCardProps) {
  const gradient = getGradientForProject(project.id);

  // GitHub・Liveリンクのクリックハンドラ
  const handleExternalLinkClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: project.delay }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => window.location.href = `/projects/${project.id}`}
    >
      {/* Cardコンポーネントを使用せず、divで直接スタイリング */}
      <div className="h-full aspect-square bg-background border-0 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl group-hover:shadow-3xl">
        <div className="relative w-full h-full">
          {/* 背景画像または色グラデーション */}
          {project.images && project.images.length > 0 && project.images[0] ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className={`w-full h-full ${gradient.bg} group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}
            >
            </div>
          )}
          
          {/* 白いオーバーレイ（透明度を上げる） */}
          <div className="absolute inset-0 bg-white/20 group-hover:opacity-50 transition-opacity duration-300" />
          
          {/* カード内のコンテンツすべてをフレックスレイアウトで配置 */}
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            {/* 上部エリア - タイトル、説明（白色・サイズアップ） */}
            <div>
              <h3 className="text-white text-3xl font-bold drop-shadow-md group-hover:text-white transition-colors">
                {project.title}
              </h3>
            </div>
            
            {/* 下部エリア - テクノロジーバッジとアイコンボタン */}
            <div className="space-y-4">
              {/* テクノロジーバッジ */}
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs bg-white/60 text-slate-800 hover:bg-white/80">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-white/60 text-slate-800 hover:bg-white/80">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
              
              {/* アイコンボタン */}
              <div className="flex gap-2">
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/60 text-slate-800 border-slate-300/50 hover:bg-white/80"
                    onClick={(e) => handleExternalLinkClick(e, project.githubUrl!)}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                )}

                {project.liveUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/60 text-slate-800 border-slate-300/50 hover:bg-white/80"
                    onClick={(e) => handleExternalLinkClick(e, project.liveUrl!)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}