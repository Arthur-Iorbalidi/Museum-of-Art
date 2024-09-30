import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from '@pages/FavoritesPage/FavoritesPage';
import DetailedPage from '@pages/DetailedPage/DetailedPage';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import { SearchParamsProvider } from '@context/searchParamsContext';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <SearchParamsProvider>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/home/:id" element={<DetailedPage />} />
          </Routes>
        </main>
      </SearchParamsProvider>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
