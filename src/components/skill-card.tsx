"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SkillCardProps {
  title: string;
  description: string;
  technologies: string;
  delay?: number;
  direction?: "left" | "right";
}

export function SkillCard({
  title,
  description,
  technologies,
  delay = 0,
  direction = "left",
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{technologies}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}