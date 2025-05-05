import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AuthProvider } from './contexts/AuthContext';
import { ServerProvider } from './contexts/ServerContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import CustomSnackbar from './components/CustomSnackbar';
import Router from './router/router';

function App() {
  return (
    <div className="App bg-zinc-950	min-h-[100vh]">
      <SnackbarProvider>
        <AuthProvider>
          <ServerProvider>
            <Router />
            <CustomSnackbar />
          </ServerProvider>
        </AuthProvider>
      </SnackbarProvider>
    </div>
  )
}

export default App
