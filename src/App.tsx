import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import Login from './screens/Login';

export default function App() {
  return (
    <PaperProvider>
      <Login/>
    </PaperProvider>
  );
}
