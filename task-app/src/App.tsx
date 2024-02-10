import Home from './pages/home';
import ErrorBoundary from './shared/components/errors/error-boundary';
import { ThemeProvider } from './shared/components/provider/theme-provider';
import { Toaster } from './shared/components/ui/sonner';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Home />
        <Toaster duration={2000} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
