import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

const menuItems = [
  { id: 'dashboard', title: 'Dashboard', icon: 'home-outline', route: '/dashboard' },
  { id: 'profile', title: 'My Profile', icon: 'person-outline', route: '/features/profile' },
  { id: 'attendance', title: 'My Attendance', icon: 'calendar-outline', route: '/features/attendance' },
  { id: 'leave', title: 'Leave Balance', icon: 'document-text-outline', route: '/features/leave-balance' },
  { id: 'notifications', title: 'Notifications', icon: 'notifications-outline', route: '/features/notifications' },
];

export default function MenuScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>

      {/* Title Row */}
      <View style={styles.titleRow}>
        <View style={styles.titleLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="close" size={28} color="#111" />
          </TouchableOpacity>
          <Text style={styles.title}>Menu</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.menuItem, index === menuItems.length - 1 && styles.lastMenuItem]}
              onPress={() => router.push(item.route as any)}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name={item.icon as any} size={22} color="#046835" />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>
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
    fontSize: 22,
    fontFamily: 'Roboto_700Bold',
    color: '#111',
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F9F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    color: '#333',
  },
});
