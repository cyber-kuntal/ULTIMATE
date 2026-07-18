import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/Home';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import BackgroundMusic from '@/components/ui/BackgroundMusic';

const queryClient = new QueryClient();

// Optional 404 page styled to match
function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-deep text-center px-6 selection:bg-neon-primary selection:text-bg-deep">
      <div className="space-y-6">
        <h1 className="text-8xl font-display font-black text-neon-primary drop-shadow-[0_0_15px_rgba(0,255,198,0.5)]">404</h1>
        <div className="inline-block px-4 py-2 border border-destructive text-destructive font-mono uppercase tracking-widest bg-destructive/10">
          ERR_FILE_NOT_FOUND
        </div>
        <p className="text-text-muted font-mono max-w-md mx-auto">
          The requested system file or directive does not exist. 
          Return to base coordinates immediately.
        </p>
        <div className="pt-8">
          <a href="/" className="inline-block px-8 py-3 border border-neon-primary text-neon-primary font-mono hover:bg-neon-primary hover:text-bg-deep hover:shadow-[0_0_20px_rgba(0,255,198,0.5)] transition-all">
            RETURN_TO_BASE
          </a>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <BackgroundMusic />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;