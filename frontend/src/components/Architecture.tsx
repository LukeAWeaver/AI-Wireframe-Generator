import { ReactComponent as DetailedArchitectureDiagram } from '@assets/svg/architecture-diagram.svg';

export const Architecture = () => (
  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h2>System Architecture Overview</h2>
    <p style={{ maxWidth: 900, margin: '16px auto 0', color: '#ccc', fontSize: '1.1rem', textAlign: 'center' }}>
      This system follows a modern, modular web architecture. The <b>User (Browser)</b> interacts with the <b>Frontend</b> (built with React and MUI), which serves static assets and provides a responsive UI. The frontend communicates with the <b>API Layer</b> (REST/GraphQL) for all dynamic data needs. Authentication is handled via a dedicated <b>Auth Service</b>, ensuring secure login and token management. The <b>Backend (Django)</b> implements business logic, orchestrates data flow, and exposes APIs. Persistent data is stored in a <b>PostgreSQL</b> database, accessed only by the backend. All flows are secured, and the architecture supports scalability, separation of concerns, and maintainability for enterprise-grade applications.
    </p>
    <div style={{ maxWidth: 900, width: '100%', marginTop: 24 }}>
      <DetailedArchitectureDiagram style={{ width: '100%', height: 'auto' }} />
    </div>
    <p style={{ maxWidth: 900, margin: '24px auto 0', color: '#ccc', fontSize: '1.1rem', textAlign: 'center' }}>
      <b>Wireframe Generation Purpose:</b> This platform enables users to describe UI layouts in natural language, which are then sent to the backend and integrated with the OpenAI API (ChatGPT). The backend processes the prompt, requests a wireframe from ChatGPT, and returns a rendered wireframe preview to the frontend. This workflow accelerates prototyping, bridges the gap between design and engineering, and leverages AI to turn ideas into interactive wireframes in real time.
    </p>
  </div>
); 