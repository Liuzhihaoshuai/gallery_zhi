import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import type { Project } from '../types';

interface ModernCarouselProps {
  filteredProjects: Project[];
}

const ModernCarousel = ({ filteredProjects }: ModernCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (filteredProjects.length === 0) return;
    
    setDirection(newDirection);
    const newIndex = currentIndex + newDirection;
    
    if (newIndex >= filteredProjects.length) {
      setCurrentIndex(0);
    } else if (newIndex < 0) {
      setCurrentIndex(filteredProjects.length - 1);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredProjects]);

  if (!filteredProjects.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 text-lg">暂无项目</p>
      </div>
    );
  }

  const currentProject = filteredProjects[currentIndex];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      {/* 轮播内容 */}
      <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto px-8">
        
        {/* 左侧导航按钮 */}
        <motion.button
          className="absolute left-8 z-10 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all duration-300 group"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* 项目卡片轮播区域 */}
        <div className="relative w-full max-w-4xl h-96">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center justify-center h-full">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full mx-4">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    
                    {/* 项目图片 */}
                    <div className="relative group">
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                        <img
                          src={currentProject.thumbnail}
                          alt={currentProject.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* 图片指示器 */}
                      {currentProject.images && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {currentProject.images.map((_, idx) => (
                            <div key={idx} className="w-2 h-2 bg-white/60 rounded-full"></div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 项目信息 */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                            {currentProject.category}
                          </span>
                          <span className="text-gray-500 text-sm">{currentProject.year}</span>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                          {currentProject.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed">
                          {currentProject.description}
                        </p>
                      </div>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-2">
                        {currentProject.tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 查看项目按钮 */}
                      <motion.button
                        className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>查看项目</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 右侧导航按钮 */}
        <motion.button
          className="absolute right-8 z-10 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all duration-300 group"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* 底部指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {filteredProjects.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-gray-900 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
          />
        ))}
      </div>

      {/* 项目计数 */}
      <div className="absolute top-8 right-8 text-gray-500 text-sm font-medium">
        {currentIndex + 1} / {filteredProjects.length}
      </div>
    </div>
  );
};

export default ModernCarousel;
