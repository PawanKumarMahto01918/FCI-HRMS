import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';
import Header from '../components/Header';
import TitleCard from '../components/TitleCard';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
          // User is logged in, skip the login screen
          router.replace('/dashboard' as any);
        } else {
          // User is not logged in, show the login form and fade it in
          setIsReady(true);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      } catch (e) {
        setIsReady(true);
      }
    };
    
    checkSession();
  }, [fadeAnim]);

  if (!isReady) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.webContainer}>
          <Header />
          <TitleCard />
          <View style={styles.formContainer}>
            <LoginForm />
          </View>
          <Footer />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryGreen,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryGreen,
  },
  webContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },
});
