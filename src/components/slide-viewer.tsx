// src/components/slide-viewer.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlideViewerProps {
  images: string[];
}

export function SlideViewer({ images }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="my-8 bg-muted/30 rounded-xl p-8 text-center text-muted-foreground">
        スライドが見つかりません
      </div>
    );
  }

  return (
    <div className="my-8">
      <div className="relative group">
        {/* メインスライド */}
        <div className="relative aspect-[16/9] bg-gradient-to-br from-muted/30 to-muted/60 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={images[currentSlide]}
            alt={`スライド ${currentSlide + 1}`}
            fill
            className="object-contain"
            priority={currentSlide === 0}
          />
        </div>

        {/* ナビゲーションボタン */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 hover:bg-black/40 backdrop-blur-sm border-0 text-white hover:text-white h-12 w-12 rounded-full"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 hover:bg-black/40 backdrop-blur-sm border-0 text-white hover:text-white h-12 w-12 rounded-full"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* スライド番号 */}
        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full font-medium">
          {currentSlide + 1} / {images.length}
        </div>
      </div>

      {/* サムネイル */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                currentSlide === index
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-lg'
                  : 'hover:scale-105 hover:shadow-md opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`スライド ${index + 1} サムネイル`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* スクロールバーを隠すCSS */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}