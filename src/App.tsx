import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './context/authContext';
import Routes from './routes/router';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '5347000708-huid8jinh9am79lkn3fvuf8ddisdconv.apps.googleusercontent.com',
  offlineAccess: true,
});

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
       <Routes/>
      </PaperProvider>
    </AuthProvider>
  );
}
