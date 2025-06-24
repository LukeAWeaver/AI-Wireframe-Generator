import React from 'react';
import architectureDiagram from '@assets/svg/architecture-diagram.svg';

export const Architecture = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>System Architecture Overview</h2>
      <div style={{ maxWidth: 600, width: '100%', marginTop: 24 }}>
        <architectureDiagram style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}; 