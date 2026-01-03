import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
     <Routes>
       {/* auth setup */}
       <Route path="/" element={<Navigate to="/auth" /> } />
       <Route path="/auth" element={<AuthPage />} />

       {/*Page*/}
         <Route path="/home" element={<HomePage />} />

       {/* 404 Handler */}
       <Route path="*" element={<h1>Page Not Found</h1>} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
