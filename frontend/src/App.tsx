import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { MediaLibrary } from './pages/MediaLibrary';
import { SectionEditorPage } from './pages/SectionEditorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/media/library" element={<MediaLibrary />} />
        <Route path="/dashboard/*" element={<SectionEditorPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
