import { useState, useRef, useEffect } from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectCarouselProps {
  projects: Project[];
  title?: string;
  onProjectClick?: (projectId: string) => void;
}

const ProjectCarousel = ({ projects, title, onProjectClick }: ProjectCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleProjectClick = (projectId: string) => {
    onProjectClick?.(projectId);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">暂无项目</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-80"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProjectCard
              project={project}
              onClick={() => handleProjectClick(project.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;