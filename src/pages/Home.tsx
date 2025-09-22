import { useState, useMemo } from 'react';
import Header from '../components/Header';
import ProjectGallery from '../components/ProjectGallery';
// ArtworkGrid and ModernCarousel are available but currently unused on the Home page
import { projects } from '../data/projects';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="pt-16">
        {/* <ArtworkGrid /> */}
        <ProjectGallery filteredProjects={filteredProjects} />
      </main>
    </div>
  );
};

export default Home;