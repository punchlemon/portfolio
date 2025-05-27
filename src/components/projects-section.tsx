"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";

const projects = [
	{
		title: "E-commerce Platform",
		description: "Next.jsとStripeを使った現代的なECサイト",
		technologies: ["Next.js", "TypeScript", "Stripe"],
		delay: 0.1,
		liveUrl: "#", // 追加
		githubUrl: "#", // 追加
	},
	{
		title: "Task Management App",
		description: "リアルタイム機能付きのタスク管理アプリ",
		technologies: ["React", "Node.js", "Socket.io"],
		delay: 0.2,
		liveUrl: "#", // 追加
		githubUrl: "#", // 追加
	},
	{
		title: "Weather Dashboard",
		description: "APIを活用した天気予報ダッシュボード",
		technologies: ["React", "Chart.js", "API"],
		delay: 0.3,
		liveUrl: "#", // 追加
		githubUrl: "#", // 追加
	},
];

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

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{projects.map((project) => (
						<ProjectCard
							key={project.title}
							title={project.title}
							description={project.description}
							technologies={project.technologies}
							delay={project.delay}
							liveUrl={project.liveUrl} // 追加
							githubUrl={project.githubUrl} // 追加
						/>
					))}
				</div>
			</div>
		</section>
	);
}