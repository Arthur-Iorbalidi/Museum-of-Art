import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from '@pages/FavoritesPage/FavoritesPage';
import DetailedPage from '@pages/DetailedPage/DetailedPage';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import { SearchParamsProvider } from '@context/searchParamsContext';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import routes from '@constants/routes';

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
