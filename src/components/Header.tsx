import { categories } from '../data/projects';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Header = ({ activeCategory, onCategoryChange }: HeaderProps) => {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 左上角分类导航 (hidden on small screens; mobile tabs are shown in-page) */}
          <div className="relative hidden sm:block">
            <nav className="flex items-center space-x-1">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeCategory === category.value
                      ? 'bg-gray-900 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </nav>
          </div>

          {/* 中央品牌标识 */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Gallery
            </h1>
          </div>

          {/* 右侧菜单 */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="搜索"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="菜单"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;