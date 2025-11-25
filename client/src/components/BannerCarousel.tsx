import { trpc } from "@/_core/trpc";
import { Card } from "@/components/ui/card";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function BannerCarousel() {
  const { data: banners, isLoading } = trpc.banners.getActive.useQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // Trocar banner a cada 5 segundos

    return () => clearInterval(interval);
  }, [banners]);

  const goToPrevious = () => {
    if (!banners) return;
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (!banners) return;
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-muted rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  const BannerContent = () => (
    <div className="relative w-full h-96 overflow-hidden rounded-lg group">
      <img
        src={currentBanner.imageUrl}
        alt={currentBanner.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Overlay com informações */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
            {currentBanner.title}
          </h2>
          {currentBanner.description && (
            <p className="text-white/90 text-lg mb-4 max-w-2xl">
              {currentBanner.description}
            </p>
          )}
        </div>
      </div>

      {/* Controles de navegação */}
      {banners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            onClick={(e) => {
              e.preventDefault();
              goToPrevious();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  // Se o banner tiver link, envolver em Link, senão retornar apenas o conteúdo
  if (currentBanner.linkUrl) {
    return (
      <Link href={currentBanner.linkUrl}>
        <a className="block">
          <BannerContent />
        </a>
      </Link>
    );
  }

  return <BannerContent />;
}
