"use client";

import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
	return (
		<main className="min-h-screen bg-background">
			<HeroSection />
			<AboutSection />
			<ProjectsSection />
		</main>
	);
}
