import { useRef, useEffect, useState } from 'react';
import { artworks, type Artwork } from '../data/artworks';

const ArtworkGrid = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getArtworkStyle = (index: number) => {
    const positions = [
      { top: '10%', left: '5%', zIndex: 8 },
      { top: '25%', left: '25%', zIndex: 3 },
      { top: '8%', left: '45%', zIndex: 7 },
      { top: '30%', left: '65%', zIndex: 4 },
      { top: '15%', left: '75%', zIndex: 6 },
      { top: '55%', left: '15%', zIndex: 5 },
      { top: '45%', left: '80%', zIndex: 2 },
    ];

    const position = positions[index % positions.length];
    const parallaxOffset = (scrollY * (0.08 + index * 0.02)) % 30;

    return {
      position: 'absolute' as const,
      top: `calc(${position.top} + ${parallaxOffset}px)`,
      left: position.left,
      zIndex: position.zIndex,
      transform: `translateY(${parallaxOffset * 0.3}px) rotate(${(index % 3 - 1) * 2}deg)`,
      transition: 'all 0.3s ease-out',
    };
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {artworks.map((artwork, index) => (
        <div
          key={artwork.id}
          className="absolute transition-transform duration-300 hover:scale-105 cursor-pointer"
          style={getArtworkStyle(index)}
        >
          <div className="relative group">
            <div className="bg-white p-2 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="object-cover filter sepia-[0.1] contrast-[1.1] brightness-[0.95]"
                style={{
                  width: `${artwork.width}px`,
                  height: `${artwork.height}px`,
                }}
              />
              <div className="absolute inset-2 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>
            <div className="absolute -bottom-12 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-white/95 backdrop-blur-sm p-3 shadow-lg border border-gray-100">
                <h3 className="font-serif text-gray-900 text-sm font-medium">{artwork.title}</h3>
                <p className="text-gray-600 text-xs italic">{artwork.artist}, {artwork.year}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtworkGrid;