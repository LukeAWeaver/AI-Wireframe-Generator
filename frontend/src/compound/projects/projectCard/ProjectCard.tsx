import { Box } from '@components/Box';
import { FlippableCard } from '@components/FlippableCard';
import { ProjectCardSummary } from './ProjectCardSummary';
import { ProjectCardArchOverview } from './ProjectCardArchOverview';

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  purpose: string;
  imageUrl: string;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isSelected: boolean
  url?: string;
}

export const ProjectCard = (props: ProjectCardProps) => {
  const {
    title,
    description,
    technologies,
    imageUrl,
    isSelected,
    url,
    purpose,
  } = props;

  const frontContent = (
      <ProjectCardArchOverview title={title} imageUrl={imageUrl} url={url} />
  );

  const backContent = (
      <ProjectCardSummary purpose={purpose} description={description} technologiesUsed={technologies}/>
  );

  return (
    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      width: "100%", 
    }}>
    <FlippableCard flexHeight={true} mustBeSelectedToFlip={isSelected} frontContent={frontContent} backContent={backContent} />
    </Box>
  );
}; 