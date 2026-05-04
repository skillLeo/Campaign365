import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation';
import { AuthProvider } from './src/store/authStore';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
