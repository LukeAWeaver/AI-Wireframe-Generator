import { Box } from '@components/Box';
import { FlippableCard } from '@components/FlippableCard';
import { ProjectCardSummary } from './ProjectCardSummary';
import { ProjectCardArchOverview } from './ProjectCardArchOverview';
import { IProject } from 'features/Projects/data/projects';

export interface ProjectCardProps extends Pick<IProject, "SvgDiagram" | "url" | "title" | "purpose" | "description"> {
  technologies: string[];
  isSelected: boolean;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProjectCard = (props: ProjectCardProps) => {
  const {
    title,
    description,
    technologies,
    SvgDiagram,
    isSelected,
    url,
    purpose,
  } = props;

  const frontContent = (
      <ProjectCardArchOverview title={title} SvgDiagram={SvgDiagram} url={url} />
  );

  const backContent = (
      <ProjectCardSummary purpose={purpose} description={description} technologiesUsed={technologies}/>
  );

  return (
    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: '100%',
      maxHeight: '80vh',
      height: 'auto',
    }}>
      <FlippableCard
        mustBeSelectedToFlip={isSelected}
        frontContent={frontContent}
        backContent={backContent}
      />
    </Box>
  );
}; 