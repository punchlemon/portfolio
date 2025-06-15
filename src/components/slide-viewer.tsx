// src/components/slide-viewer.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
      <Card className="my-8">
        <CardContent className="p-8 text-center text-muted-foreground">
          スライドが見つかりません
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-8">
      <CardContent className="p-6">
        <div className="relative">
          {/* メインスライド */}
          <div className="relative aspect-[16/9] bg-muted rounded-lg overflow-hidden">
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
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* スライド番号 */}
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-sm px-2 py-1 rounded">
            {currentSlide + 1} / {images.length}
          </div>
        </div>

        {/* サムネイル */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative flex-shrink-0 w-20 h-12 rounded border-2 overflow-hidden transition-all ${
                  currentSlide === index
                    ? 'border-primary'
                    : 'border-border hover:border-primary/50'
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
      </CardContent>
    </Card>
  );
}