"use client";

import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export function ProjectsSection() {
	return (
		<section id="projects" className="py-8">
			<div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	);
}