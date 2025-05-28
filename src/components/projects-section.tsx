"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Featured projects（最初の3つだけ表示）
const featuredProjects = projects.slice(0, 3);

export function ProjectsSection() {
	return (
		<section id="projects" className="py-20">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Featured Projects
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						最近取り組んだプロジェクトの一部をご紹介します
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
					{featuredProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>

				{/* View All Projects Button */}
				<div className="text-center">
					<Button variant="outline" size="lg" asChild>
						<Link href="/projects">View All Projects</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}