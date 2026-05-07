import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Subject } from './pages/Subject';
import { Header } from './components/Header';
import { AppProvider } from './context/AppContext';
import { Toaster } from './components/ui/sonner';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main>{children}</main>
        <Toaster />
      </div>
    </AppProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: '/subject/:subjectId',
    element: (
      <Layout>
        <Subject />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-muted-foreground mb-6">Página não encontrada</p>
            <a href="/" className="text-blue-600 hover:underline">
              Voltar para Home
            </a>
          </div>
        </div>
      </Layout>
    ),
  },
]);
