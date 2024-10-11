import './App.scss';

import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import routes from '@constants/routes';
import { SearchParamsProvider } from '@context/searchParamsContext';
import DetailedPage from '@pages/DetailedPage/DetailedPage';
import FavoritesPage from '@pages/FavoritesPage/FavoritesPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <SearchParamsProvider>
        <main>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Navigate to={routes.home} replace />} />
              <Route path={routes.home} element={<HomePage />} />
              <Route path={routes.favorites} element={<FavoritesPage />} />
              <Route path={routes.detailed} element={<DetailedPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </SearchParamsProvider>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
