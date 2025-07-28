import { Typography } from '@mui/material';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProjectsPage from './features/Projects/pages/ProjectsPage';
import WorkHistoryPage from './features/WorkHistory/pages/WorkHistoryPage';
import LoginPage from './features/Login/pages/LoginPage';
import SettingsPage from './features/Settings/pages/SettingsPage';
import { PageWrapper } from './layouts/PageWrapper';
import { VerticalNav } from './navigation/VerticalNav';
import { useUser } from './hooks/useUser';
import { APP_VERSION } from './version';
import HomePage from './features/Home/pages/HomePage';
import WireframePage from './features/WireframeGenerator/pages/WireframePage';

function App() {
  const { isAuthenticated, username } = useUser();
  const location = useLocation(); 
  const fullscreenTabs = ["/wireframe-generator", "/projects"];
  const disableFooter = true; //disable footer for now
  return (
      <PageWrapper
        sidebarLeft={<VerticalNav />}
        footer={ disableFooter ? null :
          fullscreenTabs.includes(location.pathname) ? undefined :
          <Typography variant="body2" color="text.secondary" align="center">
            v{APP_VERSION}{username && (" - " + username)}
          </Typography>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/settings" /> : <LoginPage />} />
          <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/work-history" element={<WorkHistoryPage />} />
          <Route path="/wireframe" element={<WireframePage />} />
        </Routes>
      </PageWrapper>
  );
}

export default App;