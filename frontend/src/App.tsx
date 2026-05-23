import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { MediaLibrary } from './pages/MediaLibrary';
import { SectionEditorPage } from './pages/SectionEditorPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
//          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/media/library" element={<MediaLibrary />} />
            <Route path="/dashboard/*" element={<SectionEditorPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
