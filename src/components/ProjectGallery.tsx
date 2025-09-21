import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types';

interface ProjectGalleryProps {
  filteredProjects: Project[];
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
  const getCardStyle = (index: number) => {
    const positions = [
      { top: '10%', left: '8%', width: 320, height: 400, zIndex: 8 },
      { top: '25%', left: '28%', width: 240, height: 300, zIndex: 3 },
      { top: '8%', left: '50%', width: 400, height: 500, zIndex: 7 },
      { top: '35%', left: '70%', width: 280, height: 350, zIndex: 4 },
      { top: '15%', left: '78%', width: 200, height: 280, zIndex: 6 },
      { top: '65%', left: '15%', width: 360, height: 450, zIndex: 5 },
      { top: '55%', left: '85%', width: 240, height: 320, zIndex: 2 },
    ];

    const position = positions[index % positions.length];
    const parallaxOffset = (scrollY * (0.1 + index * 0.02)) % 40;

    return {
      position: 'absolute' as const,
      top: `calc(${position.top} + ${parallaxOffset}px)`,
      left: position.left,
      width: `${position.width}px`,
      height: `${position.height}px`,
      zIndex: position.zIndex,
      transform: `translateY(${parallaxOffset * 0.3}px) rotate(${(index % 4 - 1.5) * 1.5}deg)`,
    };
  };

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={getCardStyle(index)}
      onClick={() => onClick(project)}
      whileHover={{ 
        scale: 1.05,
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        type: "spring"
      }}
    >
      {/* 画框效果 */}
      <div className="relative w-full h-full bg-white p-3 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* 悬浮时的淡雅渐变层 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          
          {/* 悬浮时的优雅信息遮罩 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <div className="elegant-glass w-full h-full rounded-lg flex flex-col justify-end p-6">
              <div className="space-y-2">
                <h3 className="text-white text-xl font-light tracking-wide">
                  {project.title}
                </h3>
                <div className="flex items-center space-x-3 text-white/80 text-sm">
                  <span className="font-light">{project.category}</span>
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                  <span className="font-light">{project.year}</span>
                </div>
                <p className="text-white/70 text-sm font-light leading-relaxed line-clamp-2 mt-3">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
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

const ProjectGallery = ({ filteredProjects }: ProjectGalleryProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-float animation-delay-200"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-3xl animate-float animation-delay-400"></div>
      </div>

      {/* 项目卡片网格 */}
      <div className="relative">
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


      {/* 滚动指示器 */}
      <div className="fixed bottom-8 right-8 z-40">
        <motion.div 
          className="elegant-glass rounded-full p-3"
          whileHover={{ scale: 1.05 }}
        >
          <svg className="w-5 h-5 text-gray-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* 项目总数显示 */}
      <div className="fixed top-24 right-8 z-40">
        <motion.div 
          className="elegant-glass rounded-lg px-4 py-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-sm text-gray-500 font-light">
            {filteredProjects.length} 个项目
          </span>
        </motion.div>
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
