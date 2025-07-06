import { Typography } from '@mui/material';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Settings } from './app/settings';
import { Profile } from './app/profile';
import { Projects } from './app/projects';
import { Home } from './app/home';
import { Login } from './app/login';
import { WireframeGenerator } from './app/wireframe-generator';
import { PageWrapper } from './layouts/PageWrapper';
import { VerticalNav } from './navigation/VerticalNav';
import { useUser } from './hooks/useUser';
import { APP_VERSION } from './version';

function App() {
  const { isAuthenticated, username } = useUser();
  const location = useLocation(); 
  const fullscreenTabs = ["/wireframe-generator", "/projects"]
  return (
      <PageWrapper
        sidebarLeft={<VerticalNav />}
        footer={
          fullscreenTabs.includes(location.pathname) ? undefined :
          <Typography variant="body2" color="text.secondary" align="center">
            v{APP_VERSION}{username && (" - " + username)}
          </Typography>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          {/* <Route path="/architecture" element={<Architecture />} /> */}
          <Route path="/wireframe-generator" element={<WireframeGenerator />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </PageWrapper>
  );
}

export default App; 