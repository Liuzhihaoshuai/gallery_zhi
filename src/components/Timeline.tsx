const Timeline = () => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center space-x-4 bg-white bg-opacity-80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
        <span className="text-4xl font-light text-gray-800 tracking-wider">1635</span>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-px bg-gray-400"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-16 h-px bg-gray-400"></div>
        </div>
        <span className="text-4xl font-light text-gray-800 tracking-wider">1847</span>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-600 tracking-widest uppercase">
          SCROLL TO EXPLORE
        </p>
      </div>
    </div>
  );
};

export default Timeline;