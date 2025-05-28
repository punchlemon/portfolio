"use client";

import { motion } from "framer-motion";
// import { SkillCard } from "@/components/skill-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const aboutData = {
	introduction:
		"電子工学のバックグラウンドを持ち、生体情報の活用研究からコンピューターサイエンスの世界へ。42tokyoでのハンズオン学習を通じて、システムレベルからWebアプリケーションまで幅広い技術領域に取り組んでいます。",
	skills: [
		{
			title: "System Programming",
			description: "低レベルプログラミングと高性能なシステム開発",
			technologies: "C, Rust, Go, システム設計",
			icon: "⚡",
			delay: 0.2,
			direction: "left" as const,
		},
		{
			title: "Data & Research",
			description: "電子工学と生体情報処理の研究経験を活用",
			technologies: "Python, データ解析, 研究手法, 信号処理",
			icon: "🔬",
			delay: 0.4,
			direction: "right" as const,
		},
		{
			title: "Hardware & Making",
			description: "ソフトウェアとハードウェアの融合に興味",
			technologies: "3Dプリンター, 基板設計, キーボード自作, IoT",
			icon: "🔧",
			delay: 0.6,
			direction: "left" as const,
		},
	],
	journey: [
		{
			period: "大学1年〜",
			title: "プログラミング学習開始",
			description: "独学でプログラミングを学び始める",
		},
		{
			period: "大学時代",
			title: "電子工学・生体情報研究",
			description: "生体電子工学研究室で生体情報の活用について研究",
		},
		{
			period: "現在",
			title: "42tokyo & インターン",
			description: "実践的なCS学習とエンジニアとしての実務経験",
		},
	],
};

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
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{aboutData.introduction}
					</p>
				</motion.div>

				{/* Skills Grid */}
				<div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
					{aboutData.skills.map((skill) => (
						<motion.div
							key={skill.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: skill.delay }}
							viewport={{ once: true }}
						>
							<Card className="h-full text-center">
								<CardHeader>
									<div className="text-4xl mb-2">{skill.icon}</div>
									<CardTitle className="text-xl">{skill.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										{skill.description}
									</p>
									<div className="flex flex-wrap gap-1 justify-center">
										{skill.technologies.split(", ").map((tech) => (
											<Badge key={tech} variant="secondary" className="text-xs">
												{tech}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Journey Timeline */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					viewport={{ once: true }}
					className="max-w-4xl mx-auto"
				>
					<h3 className="text-2xl font-bold text-center mb-8">My Journey</h3>
					<div className="grid md:grid-cols-3 gap-6">
						{aboutData.journey.map((item, index) => (
							<Card key={index} className="text-center">
								<CardHeader>
									<Badge variant="outline" className="w-fit mx-auto mb-2">
										{item.period}
									</Badge>
									<CardTitle className="text-lg">{item.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">
										{item.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}