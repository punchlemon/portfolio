"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Reiji
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActive("/")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/projects"
            className={`text-sm font-medium transition-colors ${
              isActive("/projects")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${
              isActive("/contact")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button (将来的にモバイル対応時に使用) */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            Menu
          </Button>
        </div>
      </div>
    </motion.header>
  );
}