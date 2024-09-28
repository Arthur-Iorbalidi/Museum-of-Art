import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import DetailedPage from './pages/DetailedPage/DetailedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/home/:id" element={<DetailedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
