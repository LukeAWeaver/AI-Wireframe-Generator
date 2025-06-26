import { Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { UserProfile } from './components/UserProfile';
import { PageWrapper } from './components/PageWrapper';
import { VerticalNav } from './components/VerticalNav';
import { useUser } from './hooks/useUser';
import { APP_VERSION } from './version';
import { Settings } from './components/Settings';
import { Architecture } from './components/Architecture';
import { WireframeGenerator } from './components/WireframeGenerator';
import { Projects } from './components/Projects';

const Home = () => (
  <Typography variant="h4">Welcome to the AI Feature Explorer!</Typography>
);

function App() {
  const { isAuthenticated, username } = useUser();

  return (
      <PageWrapper
        sidebarLeft={<VerticalNav />}
        footer={
          <Typography variant="body2" color="text.secondary" align="center" sx={{ p: 2 }}>
            v{APP_VERSION} - {username}
          </Typography>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <LoginForm />} />
          <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/wireframe-generator" element={<WireframeGenerator />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </PageWrapper>
  );
}

export default App; 