import { ReactComponent as DetailedArchitectureDiagram } from '@assets/svg/detailed-architecture.svg';

export const Architecture = () => (
  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h2>System Architecture Overview</h2>
    <p style={{ maxWidth: 900, margin: '16px auto 0', color: '#ccc', fontSize: '1.1rem', textAlign: 'center' }}>
      This system follows a modern, modular web architecture. The <b>User (Browser)</b> interacts with the <b>Frontend</b> (built with React and MUI), which serves static assets and provides a responsive UI. The frontend communicates with the <b>API Layer</b> (REST/GraphQL) for all dynamic data needs. Authentication is handled via a dedicated <b>Auth Service</b>, ensuring secure login and token management. The <b>Backend (Django)</b> implements business logic, orchestrates data flow, and exposes APIs. Persistent data is stored in a <b>PostgreSQL</b> database, accessed only by the backend. All flows are secured, and the architecture supports scalability, separation of concerns, and maintainability for enterprise-grade applications.
    </p>
    <div style={{ maxWidth: 900, width: '100%', marginTop: 24 }}>
      <DetailedArchitectureDiagram style={{ width: '100%', height: 'auto' }} />
    </div>
  </div>
); 