export const Architecture = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>System Architecture Overview</h2>
      <div style={{ maxWidth: 600, width: '100%', marginTop: 24 }}>
        <svg width="100%" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="40" width="120" height="40" rx="8" fill="#2196f3" />
          <text x="100" y="65" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Arial">User (Browser)</text>
          <rect x="220" y="40" width="160" height="40" rx="8" fill="#1976d2" />
          <text x="300" y="65" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Arial">Frontend (React + MUI)</text>
          <rect x="220" y="140" width="160" height="40" rx="8" fill="#388e3c" />
          <text x="300" y="165" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Arial">Backend (Django)</text>
          <rect x="440" y="140" width="120" height="40" rx="8" fill="#f50057" />
          <text x="500" y="165" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Arial">Database (PostgreSQL)</text>
          <line x1="160" y1="60" x2="220" y2="60" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="300" y1="80" x2="300" y2="140" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="380" y1="160" x2="440" y2="160" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="300" y1="60" x2="500" y2="140" stroke="#bbb" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrowhead)" />
          <line x1="100" y1="60" x2="300" y2="140" stroke="#bbb" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrowhead)" />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#888"/>
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}; 