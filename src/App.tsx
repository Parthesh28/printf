import * as React from 'react';
import { MD3DarkTheme, PaperProvider} from 'react-native-paper';
import { AuthProvider } from './context/authContext';
import Routes from './routes/router';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

GoogleSignin.configure({
  webClientId: '5347000708-huid8jinh9am79lkn3fvuf8ddisdconv.apps.googleusercontent.com',
  offlineAccess: true,
});

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider  >
        <PaperProvider theme={MD3DarkTheme}>
          <Routes />
        </PaperProvider>
      </AuthProvider> 
    </QueryClientProvider>
  );
}
