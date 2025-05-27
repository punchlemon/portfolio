"use client";

import { motion } from "framer-motion";
import { SkillCard } from "@/components/skill-card";

const skills = [
	{
		title: "Frontend Development",
		description: "モダンなUIライブラリとフレームワークを使用",
		technologies: "React, Next.js, TypeScript, Tailwind CSS",
		delay: 0.2,
		direction: "left" as const,
	},
	{
		title: "Backend Development",
		description: "スケーラブルなサーバーサイドソリューション",
		technologies: "Node.js, Python, Database Design",
		delay: 0.4,
		direction: "right" as const,
	},
];

export function AboutSection() {
	return (
		<section id="about" className="py-20 bg-muted/50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{skills.map((skill) => (
						<SkillCard
							key={skill.title}
							title={skill.title}
							description={skill.description}
							technologies={skill.technologies}
							delay={skill.delay}
							direction={skill.direction}
						/>
					))}
				</div>
			</div>
		</section>
	);
}