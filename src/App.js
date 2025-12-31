import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Navigate to="/auth" /> } />
       <Route path="/auth" element={<AuthPage />} />

       {/* 404 Handler */}
       <Route path="*" element={<h1>Page Not Found</h1>} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
