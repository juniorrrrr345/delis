import { Router, Route, Switch } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import { Toaster } from './components/ui/toaster'

// Configuration du client de requête
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/contact" component={ContactPage} />
            <Route>
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>
                  <p className="text-muted-foreground">La page que vous cherchez n'existe pas.</p>
                </div>
              </div>
            </Route>
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App