// import architectureDiagram from '@assets/svg/architecture-diagram.svg';

// Use public URL as fallback
// const architectureDiagram = '/architecture-diagram.svg';

// Embed SVG directly as fallback
const ArchitectureSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="1100" height="500" viewBox="0 0 1100 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: '#181818' }} {...props}>
    {/* User */}
    <rect x="40" y="100" width="180" height="50" rx="16" fill="#2196f3"/>
    <text x="130" y="130" textAnchor="middle" fill="#fff" fontSize="20" fontFamily="Arial">User (Browser)</text>
    {/* Frontend */}
    <rect x="300" y="100" width="220" height="50" rx="16" fill="#1976d2"/>
    <text x="410" y="130" textAnchor="middle" fill="#fff" fontSize="20" fontFamily="Arial">Frontend (React + MUI)</text>
    {/* Static Assets */}
    <rect x="300" y="40" width="220" height="40" rx="12" fill="#64b5f6"/>
    <text x="410" y="67" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Arial">Static Assets (JS/CSS)</text>
    {/* API Layer */}
    <rect x="300" y="180" width="220" height="40" rx="12" fill="#90caf9"/>
    <text x="410" y="207" textAnchor="middle" fill="#222" fontSize="16" fontFamily="Arial">API Layer (REST/GraphQL)</text>
    {/* Auth Service */}
    <rect x="560" y="100" width="140" height="50" rx="16" fill="#ffb300"/>
    <text x="630" y="130" textAnchor="middle" fill="#222" fontSize="18" fontFamily="Arial">Auth Service</text>
    {/* Backend */}
    <rect x="300" y="260" width="220" height="60" rx="16" fill="#388e3c"/>
    <text x="410" y="295" textAnchor="middle" fill="#fff" fontSize="22" fontFamily="Arial">Backend (Django)</text>
    {/* OpenAI API */}
    <rect x="600" y="340" width="200" height="50" rx="16" fill="#00a67e"/>
    <text x="700" y="370" textAnchor="middle" fill="#fff" fontSize="18" fontFamily="Arial">OpenAI API</text>
    {/* Database */}
    <rect x="600" y="260" width="220" height="60" rx="16" fill="#f50057"/>
    <text x="710" y="295" textAnchor="middle" fill="#fff" fontSize="22" fontFamily="Arial">Database (PostgreSQL)</text>
    {/* Monitoring/Logging */}
    <rect x="900" y="260" width="160" height="60" rx="16" fill="#607d8b"/>
    <text x="980" y="295" textAnchor="middle" fill="#fff" fontSize="18" fontFamily="Arial">Monitoring & Logging</text>
    {/* Arrows */}
    {/* User to Frontend */}
    <line x1="220" y1="125" x2="300" y2="125" stroke="#bbb" strokeWidth="3" markerEnd="url(#arrowhead)"/>
    {/* User to Static Assets */}
    <line x1="130" y1="100" x2="410" y2="40" stroke="#bbb" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrowhead)"/>
    {/* Frontend to API Layer */}
    <line x1="410" y1="150" x2="410" y2="180" stroke="#bbb" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    {/* Frontend to Auth Service */}
    <line x1="520" y1="125" x2="560" y2="125" stroke="#bbb" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    {/* API Layer to Backend */}
    <line x1="410" y1="220" x2="410" y2="260" stroke="#bbb" strokeWidth="3" markerEnd="url(#arrowhead)"/>
    {/* Backend to Database */}
    <line x1="520" y1="290" x2="600" y2="290" stroke="#bbb" strokeWidth="3" markerEnd="url(#arrowhead)"/>
    {/* Backend to OpenAI API */}
    <line x1="410" y1="320" x2="700" y2="340" stroke="#00a67e" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    {/* Backend to Monitoring/Logging */}
    <line x1="520" y1="290" x2="900" y2="290" stroke="#607d8b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    {/* Auth Service to Backend */}
    <line x1="630" y1="150" x2="410" y2="260" stroke="#ffb300" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrowhead)"/>
    {/* User to Auth Service (login) */}
    <line x1="220" y1="125" x2="560" y2="125" stroke="#ffb300" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrowhead)"/>
    <defs>
      <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#bbb"/>
      </marker>
    </defs>
  </svg>
);

console.log('Using embedded SVG component');

import { ArchitectureOverview } from '../components/compound/ArchitectureOverview';

export const Architecture = () => <ArchitectureOverview />; 