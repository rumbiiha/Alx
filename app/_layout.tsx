import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ApplicationProvider, TopNavigationAction } from '@ui-kitten/components';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/FontsFree-Net-SFProDisplay-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      myOwnColor: '#BADA55',
    },
  };

  const cThemeRed = {
    "color-primary-100": "#FFF2F2",
    "color-primary-200": "#FFD6D6",
    "color-primary-300": "#FFA3A3",
    "color-primary-400": "#FF6666",
    "color-primary-500": "#FF3333", // Primary primary
    "color-primary-600": "#DB2727",
    "color-primary-700": "#B81A1A",
    "color-primary-800": "#941010",
    "color-primary-900": "#7A0909",
    "color-primary-transparent-100": "rgba(255, 51, 51, 0.08)",
    "color-primary-transparent-200": "rgba(255, 51, 51, 0.16)",
    "color-primary-transparent-300": "rgba(255, 51, 51, 0.24)",
    "color-primary-transparent-400": "rgba(255, 51, 51, 0.32)",
    "color-primary-transparent-500": "rgba(255, 51, 51, 0.40)",
    "color-primary-transparent-600": "rgba(255, 51, 51, 0.48)",

    'text-font-family': 'SFPro',
    'text-heading-1-font-family': 'SFPro',
    'text-heading-2-font-family': 'SFPro',
    'text-heading-3-font-family': 'SFPro',

    // Override fonts for buttons or other components if needed
    'button-font-family': 'SFPro',
    'font-family': 'SFPro',
  };

  return (
    <Provider store={store}>
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...cThemeRed }}>
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
    </ApplicationProvider>
    </Provider>
  );
}
