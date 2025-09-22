import { useState, useMemo, useEffect, useRef } from 'react';
import Header from '../components/Header';
import ProjectGallery from '../components/ProjectGallery';
// ArtworkGrid and ModernCarousel are available but currently unused on the Home page
import { projects, categories } from '../data/projects';

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
        {/* Mobile tabs area: rendered in-flow so it pushes the gallery down and doesn't overlap */}
        <MobileTabsWrapper
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* <ArtworkGrid /> */}
        <ProjectGallery filteredProjects={filteredProjects} onAtTop={(atTop) => {
          /* MobileTabsWrapper listens to gallery top via a global event - simplified here by
             using a small global store: we trigger a custom event so the wrapper can react. */
          window.dispatchEvent(new CustomEvent('__gallery_at_top', { detail: { atTop } }));
        }} />
      </main>
    </div>
  );
};

export default Home;

// MobileTabsWrapper component (kept here for small scope). It listens to the custom event
// dispatched by ProjectGallery and shows/hides an in-flow tab bar on small screens.

function MobileTabsWrapper({ activeCategory, onCategoryChange }: { activeCategory: string; onCategoryChange: (c: string) => void }) {
  // visible is true when the bar should be shown; start visible so mobile users see it on first load
  const [visible, setVisible] = useState(true);
  const hideTimer = useRef<number | null>(null);

  // listen for gallery at-top events and show the bar for a longer duration (8s)
  useEffect(() => {
    const handler = (e: any) => {
      const atTop = !!e.detail?.atTop;
      if (atTop) {
        setVisible(true);
        // clear existing timer
        if (hideTimer.current) {
          window.clearTimeout(hideTimer.current);
        }
        // keep visible for 8s, then hide (long hover)
        hideTimer.current = window.setTimeout(() => {
          setVisible(false);
          hideTimer.current = null;
        }, 8000);
      }
    };

    window.addEventListener('__gallery_at_top', handler as EventListener);
    return () => {
      window.removeEventListener('__gallery_at_top', handler as EventListener);
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
      }
    };
  }, []);

  // Reserve the green zone height (h-14) so the gallery is never covered when the bar appears.
  // Make the inner bar sticky and centered so it visually floats in the green box.
  return (
    <div className={`sm:hidden overflow-hidden transition-all duration-300 h-14` }>
      <div className={`bg-green-50 h-14 flex items-center px-4 transition-opacity duration-300 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-full max-w-3xl mx-auto">
          <div className="sticky top-16 flex items-center justify-center">
            <div className="inline-flex items-center space-x-3 bg-white/80 px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onCategoryChange(c.value)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeCategory === c.value ? 'bg-green-600 text-white' : 'bg-transparent text-gray-700'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}