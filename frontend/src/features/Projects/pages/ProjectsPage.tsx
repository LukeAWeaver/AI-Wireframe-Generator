// ProjectsPage: main routed view for /projects
import { ProjectsCarousel } from '../components/ProjectsCarousel';
import { projects } from '../data/projects';

const ProjectsPage = () => <ProjectsCarousel projects={projects} />;

export default ProjectsPage;
