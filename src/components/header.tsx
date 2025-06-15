"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 w-full"
      >
        {/* ヘッダー本体 - 統一されたブラー効果 */}
        <div className="h-14 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto flex h-full items-center justify-between px-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="text-xl font-bold hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                Reiji
              </Link>
            </div>

            {/* Desktop Navigation */}
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
                href="/about"
                className={`text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                About
              </Link>
              <Link
                href="/articles"
                className={`text-sm font-medium transition-colors ${
                  isActive("/articles")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Articles
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={toggleMenu}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - ヘッダーと完全に同じブラー効果 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-lg overflow-hidden md:hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-1">
                  <Link
                    href="/"
                    className={`text-sm font-medium transition-colors py-3 px-2 rounded hover:bg-muted ${
                      isActive("/")
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className={`text-sm font-medium transition-colors py-3 px-2 rounded hover:bg-muted ${
                      isActive("/about")
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={closeMenu}
                  >
                    About
                  </Link>
                  <Link
                    href="/articles"
                    className={`text-sm font-medium transition-colors py-3 px-2 rounded hover:bg-muted ${
                      isActive("/articles")
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={closeMenu}
                  >
                    Articles
                  </Link>
                  <Link
                    href="/contact"
                    className={`text-sm font-medium transition-colors py-3 px-2 rounded hover:bg-muted ${
                      isActive("/contact")
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={closeMenu}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* 背景オーバーレイ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ top: '56px' }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}