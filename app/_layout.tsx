import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout(): JSX.Element {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#F8FAFC" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#F8FAFC',
          },
        }}
      />
    </>
  );
}
