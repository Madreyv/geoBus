import { StyleSheet } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './components/navigation/navigator.index';
import { AuthProvider } from './contexts/authContext';


export default function App() {
 
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
