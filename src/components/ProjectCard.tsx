import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div
      className="group cursor-pointer bg-white overflow-hidden transition-all duration-300"
      onClick={onClick}
    >
      {/* Mobile-only badge above the image to avoid overlapping title */}
      <div className="px-3 pt-3 sm:hidden">
        <div className="inline-flex items-center bg-white/90 text-xs text-gray-700 px-2 py-1 rounded-md shadow">
          {project.images?.length ?? 0} 个项目
        </div>
      </div>
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{project.category}</span>
          {project.year && (
            <span className="text-xs text-gray-500">{project.year}</span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 text-xs text-gray-500">
            {project.tags.slice(0, 3).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;