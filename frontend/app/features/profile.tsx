import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { useState, useEffect } from 'react';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [userName, setUserName] = useState('USER');

  useEffect(() => {
    AsyncStorage.getItem('userSession').then(session => {
      if (session) setUserName(session);
    });
  }, []);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Log Out', 
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userSession');
          router.replace('/');
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>

      {/* Title Row */}
      <View style={styles.titleRow}>
        <View style={styles.titleLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.title}>My Profile</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarLarge}>
              <Ionicons name="person" size={50} color="#888" />
            </View>
            <Text style={styles.profileName}>{userName.toUpperCase()}</Text>
            <Text style={styles.profileDesignation}>Software Engineer</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Details</Text>
            
            <View style={styles.detailRow}>
              <Ionicons name="mail-outline" size={20} color="#555" />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>test@test.com</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={20} color="#555" />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Phone Number</Text>
                <Text style={styles.detailValue}>+91 9876543210</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="business-outline" size={20} color="#555" />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Department</Text>
                <Text style={styles.detailValue}>IT</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 1,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
    color: '#111',
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingBottom: 20,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontFamily: 'Roboto_700Bold',
    color: '#111',
    marginBottom: 4,
  },
  profileDesignation: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    color: '#333',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailTextContainer: {
    marginLeft: 16,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#888',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontFamily: 'Roboto_500Medium',
    color: '#111',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C',
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 10,
    gap: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
  },
});
