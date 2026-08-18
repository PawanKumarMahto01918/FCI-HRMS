import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { NotoSansDevanagari_400Regular, NotoSansDevanagari_700Bold } from '@expo-google-fonts/noto-sans-devanagari';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { usePathname, router } from 'expo-router';
import { View } from 'react-native';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { ThemeProvider, useAppTheme } from '../context/ThemeContext';

import '../i18n';

SplashScreen.preventAutoHideAsync();

function AppStack() {
  const pathname = usePathname();
  const { colors } = useAppTheme();
  const isAuth = pathname === '/';
  
  // Decide left icon: always show hamburger menu across all screens
  let leftIcon: 'menu' | 'home' | 'none' = 'menu';

  const handleLeftIconPress = () => {
    router.push('/features/menu' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="dark" />
      {!isAuth && (
        <DashboardHeader 
          leftIcon={leftIcon}
          onLeftIconPress={handleLeftIconPress}
        />
      )}
      <Stack screenOptions={{ 
        headerShown: false, 
        animation: 'none',
        contentStyle: { backgroundColor: colors.background }
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard/index" />
        <Stack.Screen name="features/leave-balance" />
        <Stack.Screen name="features/attendance" />
        <Stack.Screen name="features/apply-leave" />
        <Stack.Screen name="features/profile" />
        <Stack.Screen name="features/menu" />
        <Stack.Screen name="features/notifications" />
        <Stack.Screen name="features/settings" />
        <Stack.Screen name="features/support" />
        <Stack.Screen name="features/privacy" />
        <Stack.Screen name="features/terms" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    NotoSansDevanagari_400Regular,
    NotoSansDevanagari_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppStack />
    </ThemeProvider>
  );
}
