/**
 * App.tsx — entry point
 *
 * Renders providers in the correct order:
 *   SafeAreaProvider  (native safe-area insets)
 *   └── AuthContextProvider  (session restore + auth actions)
 *       └── AppRoot  (reads isLoading, then renders NavigationContainer)
 *
 * AppRoot is a separate component so it can consume AuthContext via the hook.
 * While the session is being restored from AsyncStorage it renders a plain
 * white screen — this prevents a brief flash of the Login screen for users
 * who are already logged in.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider, useAuthContext } from './src/context/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';

function AppRoot() {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    // Blank white screen while AsyncStorage session check runs
    return <View style={styles.loading} />;
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <AppRoot />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
