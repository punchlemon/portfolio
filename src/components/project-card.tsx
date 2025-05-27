"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  delay?: number;
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({
  title,
  description,
  technologies,
  delay = 0,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            {liveUrl && (
              <Button size="sm" variant="outline">
                Live Demo
              </Button>
            )}
            {githubUrl && (
              <Button size="sm" variant="ghost">
                GitHub
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}