"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Hi, I&apos;m{" "}
          <span className="text-primary">Reiji</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Full-stack Developer
        </p>
        <Button size="lg" className="mr-4" asChild>
          <Link href="/projects">View My Work</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/contact">Contact Me</Link>
        </Button>
      </motion.div>
    </section>
  );
}