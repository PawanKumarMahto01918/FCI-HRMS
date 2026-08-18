import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

const dummyNotifications = [
  { id: 1, title: 'Leave Approved', desc: 'Your sick leave from 12 Dec to 14 Dec has been approved.', time: '2 hours ago', read: false },
  { id: 2, title: 'Salary Credited', desc: 'Your salary for November has been successfully credited.', time: '1 day ago', read: false },
  { id: 3, title: 'Holiday Alert', desc: 'Upcoming holiday on 25 Dec for Christmas.', time: '3 days ago', read: true },
  { id: 4, title: 'Policy Update', desc: 'Please review the updated remote work policy.', time: '1 week ago', read: true },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>

      {/* Title Row */}
      <View style={styles.titleRow}>
        <View style={styles.titleLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {dummyNotifications.map((notif, index) => (
            <View key={notif.id} style={[styles.notifItem, index === dummyNotifications.length - 1 && styles.lastItem]}>
              <View style={styles.iconWrapper}>
                <Ionicons name="notifications" size={20} color={notif.read ? '#999' : '#046835'} />
              </View>
              <View style={styles.contentWrapper}>
                <Text style={[styles.notifTitle, !notif.read && styles.unreadText]}>{notif.title}</Text>
                <Text style={styles.notifDesc}>{notif.desc}</Text>
                <Text style={styles.notifTime}>{notif.time}</Text>
              </View>
              {!notif.read && <View style={styles.unreadDot} />}
            </View>
          ))}
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
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    padding: 16,
  },
  notifItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastItem: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  iconWrapper: {
    marginRight: 12,
    marginTop: 2,
  },
  contentWrapper: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 15,
    fontFamily: 'Roboto_500Medium',
    color: '#333',
    marginBottom: 4,
  },
  unreadText: {
    fontFamily: 'Roboto_700Bold',
    color: '#111',
  },
  notifDesc: {
    fontSize: 13,
    fontFamily: 'Roboto_400Regular',
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
  },
  notifTime: {
    fontSize: 11,
    fontFamily: 'Roboto_400Regular',
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E74C3C',
    marginTop: 6,
    marginLeft: 8,
  },
});
