import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppTheme } from '../../context/ThemeContext';

const dummyNotifications = [
  { id: 1, title: 'Leave Approved', desc: 'Your sick leave from 12 Dec to 14 Dec has been approved.', time: '2 hours ago', read: false },
  { id: 2, title: 'Salary Credited', desc: 'Your salary for November has been successfully credited.', time: '1 day ago', read: false },
  { id: 3, title: 'Meeting Scheduled', desc: 'You have a departmental review meeting at 3:00 PM tomorrow.', time: '1 day ago', read: false },
  { id: 4, title: 'Holiday Alert', desc: 'Upcoming holiday on 25 Dec for Christmas.', time: '3 days ago', read: true },
  { id: 5, title: 'Policy Update', desc: 'Please review the updated remote work policy by Friday.', time: '1 week ago', read: true },
  { id: 6, title: 'System Maintenance', desc: 'HRMS portal will be down for maintenance from 2:00 AM to 4:00 AM this Saturday.', time: '1 week ago', read: true },
  { id: 7, title: 'Document Required', desc: 'Please upload your latest investment proofs for tax declarations.', time: '2 weeks ago', read: true },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* Title Row */}
      <View style={[styles.titleRow, { backgroundColor: colors.background }]}>
        <View style={styles.titleLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scroll} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#046835']}
            tintColor={colors.textSecondary}
            title="Pull to refresh..."
            titleColor={colors.textSecondary}
          />
        }
      >
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: isDark ? 'transparent' : '#000' }]}>
          {dummyNotifications.map((notif, index) => (
            <View key={notif.id} style={[styles.notifItem, index === dummyNotifications.length - 1 && styles.lastItem, { borderBottomColor: colors.border }]}>
              <View style={styles.iconWrapper}>
                <Ionicons name="notifications" size={20} color={notif.read ? colors.textSecondary : (isDark ? colors.icon : '#046835')} />
              </View>
              <View style={styles.contentWrapper}>
                <Text style={[styles.notifTitle, { color: colors.text }, !notif.read && { fontFamily: 'Roboto_700Bold' }]}>{notif.title}</Text>
                <Text style={[styles.notifDesc, { color: colors.textSecondary }]}>{notif.desc}</Text>
                <Text style={[styles.notifTime, { color: colors.textSecondary }]}>{notif.time}</Text>
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
