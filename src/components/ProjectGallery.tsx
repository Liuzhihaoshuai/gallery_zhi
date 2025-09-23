import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types';

interface ProjectGalleryProps {
  filteredProjects: Project[];
  onAtTop?: (atTop: boolean) => void;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  scrollY: number;
  onClick: (project: Project) => void;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectCard = ({ project, index, scrollY, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      className="flex-shrink-0 cursor-pointer group relative"
      onClick={() => onClick(project)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-72 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
        {/* 图片容器 */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* 内容区域 */}
        <div className="p-5">
          {/* 分类 */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">{project.category}</span>
          </div>

          {/* 标题 */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {project.title}
          </h3>

          {/* 描述 */}
          {project.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {project.description}
            </p>
          )}

        </div>
      </div>
    </motion.div>
  );
};

// 项目详情弹窗组件
const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* 弹窗内容 */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "1.5vh" }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed inset-x-0 bottom-0 top-[1.5vh] bg-white rounded-t-2xl z-50 overflow-hidden"
          >
            {/* 关闭按钮 */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 弹窗内容 */}
            <div className="h-full overflow-y-auto">
              <div className="max-w-7xl mx-auto px-6">
                {/* 项目标题区域 */}
                <div className="py-6 border-b border-gray-100">
                  <h2 className="text-3xl font-light text-gray-900 mb-2">{project.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="text-sm">{project.category}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="text-sm">{project.year}</span>
                  </div>
                  <p className="mt-4 text-gray-700 leading-relaxed">{project.description}</p>
                </div>

                {/* 项目图片展示 */}
                <div className="py-6">
                  <h3 className="text-xl font-light text-gray-900 mb-6">设计成品</h3>
                  <div className="grid gap-6">
                    {project.images && project.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <img
                          src={image}
                          alt={`${project.title} - 图片 ${index + 1}`}
                          className="w-full h-auto rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 项目标签 */}
                {project.tags && project.tags.length > 0 && (
                  <div className="pb-6">
                    <h3 className="text-xl font-light text-gray-900 mb-4">相关标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const MobileCard = ({ project, onClick }: { project: Project; onClick: (p: Project) => void }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden" onClick={() => onClick(project)}>
      <div className="w-full overflow-hidden">
        <img src={project.thumbnail} alt={project.title} className="w-full h-auto object-cover block" />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">{project.category}</span>
          {project.year && <span className="text-xs text-gray-500">{project.year}</span>}
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{project.title}</h3>
        {project.description && (
          <p className="text-xs text-gray-600 line-clamp-2">{project.description}</p>
        )}
      </div>
    </div>
  );
};

const ProjectGallery = ({ filteredProjects, onAtTop }: ProjectGalleryProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 4;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // observe when the gallery top reaches near the viewport top and notify parent
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !onAtTop) return;
    const sentinel = document.getElementById('__gallery-top-sentinel');
    if (!sentinel) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        // when sentinel is not visible (scrolled past) we consider the gallery at top
        onAtTop(!e.isIntersecting);
      });
    }, { root: null, threshold: 0, rootMargin: '-60px 0px 0px 0px' });
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [onAtTop]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300); // 等待退出动画完成
  };

  if (!filteredProjects.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.p 
          className="text-gray-500 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          暂无项目
        </motion.p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* sentinel used by parent to detect when the gallery reaches the top */}
      <div id="__gallery-top-sentinel" className="w-full h-1 pointer-events-none" />

      {/* 项目卡片区域：水平滚动布局 */}
      <div className="relative">
        {isMobile ? (
          <div className="w-full px-4 py-6">
            <div style={{ columnCount: 2, columnGap: '0.75rem' }}>
              {filteredProjects.map((p) => (
                <div key={p.id} style={{ breakInside: 'avoid' as any, ['-webkit-column-break-inside' as any]: 'avoid', display: 'inline-block', width: '100%', marginBottom: '0.75rem' }}>
                  <MobileCard project={p} onClick={handleProjectClick} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-8 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Experience Top Adventures</h2>
              <p className="text-gray-600">探索精选的创意项目和设计作品</p>
            </div>

            {/* 水平滚动容器 */}
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const scrollPosition = container.scrollLeft;
                  const itemWidth = 288 + 24; // card width (w-72 = 288px) + gap (24px)
                  const newPage = Math.round(scrollPosition / (itemWidth * itemsPerPage));
                  setCurrentPage(newPage);
                }}
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    scrollY={scrollY}
                    onClick={handleProjectClick}
                  />
                ))}
              </div>

              {/* 分页指示点 */}
              {filteredProjects.length > itemsPerPage && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                  {Array.from({ length: Math.ceil(filteredProjects.length / itemsPerPage) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const itemWidth = 288 + 24;
                        const scrollPosition = index * itemsPerPage * itemWidth;
                        scrollContainerRef.current?.scrollTo({
                          left: scrollPosition,
                          behavior: 'smooth'
                        });
                        setCurrentPage(index);
                      }}
                      className={`transition-all duration-300 ${
                        currentPage === index
                          ? 'w-8 h-2 bg-gray-800 rounded-full'
                          : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>



      {/* 项目详情弹窗 */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProjectGallery;
