import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppTheme } from '../../context/ThemeContext';

const attendanceData = [
  { date: '01-12-2024', day: 'Sunday', status: 'Week-Off', isWeekend: true },
  { date: '02-12-2024', day: 'Monday', status: 'Absent', isWeekend: false },
  { date: '03-12-2024', day: 'Tuesday', status: 'Absent', isWeekend: false },
  { date: '04-12-2024', day: 'Wednesday', status: 'Absent', isWeekend: false },
  { date: '05-12-2024', day: 'Thursday', status: 'Absent', isWeekend: false },
  { date: '06-12-2024', day: 'Friday', status: 'Absent', isWeekend: false },
  { date: '07-12-2024', day: 'Saturday', status: 'Absent', isWeekend: true },
  { date: '08-12-2024', day: 'Sunday', status: 'Week-Off', isWeekend: true },
  { date: '09-12-2024', day: 'Monday', status: 'Absent', isWeekend: false },
  { date: '10-12-2024', day: 'Tuesday', status: 'Absent', isWeekend: false },
  { date: '11-12-2024', day: 'Wednesday', status: 'Absent', isWeekend: false },
  { date: '12-12-2024', day: 'Thursday', status: 'Absent', isWeekend: false },
  { date: '13-12-2024', day: 'Friday', status: 'Absent', isWeekend: false },
];

export default function AttendanceScreen() {
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
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>My Attendance</Text>
        </View>
        
        <TouchableOpacity style={[styles.filterBtn, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <Ionicons name="options-outline" size={20} color={colors.textSecondary} />
          <Text style={[styles.filterText, { color: colors.textSecondary }]}>Filter</Text>
        </TouchableOpacity>
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
          <Text style={[styles.monthHeader, { color: colors.text }]}>December 2024</Text>
          
          {/* Table Header */}
          <View style={[styles.tableHeaderRow, { backgroundColor: isDark ? '#2A2A2A' : '#F8F9FA', borderBottomColor: colors.border }]}>
            <View style={[styles.colDate, styles.borderRight, { borderRightColor: colors.border }]}>
              <Text style={[styles.tableHeaderText, { color: colors.textSecondary }]}>Date</Text>
            </View>
            <View style={[styles.colDay, styles.borderRight, { borderRightColor: colors.border }]}>
              <Text style={[styles.tableHeaderText, { color: colors.textSecondary }]}>Day</Text>
            </View>
            <View style={styles.colStatus}>
              <Text style={[styles.tableHeaderText, { color: colors.textSecondary }]}>Status</Text>
            </View>
          </View>

          {/* Table Body */}
          {attendanceData.map((item, index) => {
            const isFaded = item.isWeekend;
            const statusColor = item.status === 'Absent' && !isFaded ? '#E74C3C' : (isFaded ? '#B0B5B9' : colors.text);
            const textColor = isFaded ? '#B0B5B9' : colors.text;

            return (
              <View key={index} style={[styles.tableRow, { borderBottomColor: colors.border }]}>
                <View style={[styles.colDate, styles.borderRight, { borderRightColor: colors.border }]}>
                  <Text style={[styles.cellText, { color: textColor }]}>{item.date}</Text>
                </View>
                <View style={[styles.colDay, styles.borderRight, { borderRightColor: colors.border }]}>
                  <Text style={[styles.cellText, { color: textColor }]}>{item.day}</Text>
                </View>
                <View style={styles.colStatus}>
                  <Text style={[styles.cellText, { color: statusColor }]}>{item.status}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    color: '#111',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Roboto_400Regular',
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    // Add subtle shadow or keep it flat per design
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  monthHeader: {
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F3F5',
  },
  tableHeaderText: {
    fontSize: 13,
    color: '#555',
    fontFamily: 'Roboto_500Medium',
  },
  tableRow: {
    flexDirection: 'row',
    // subtle bottom border for rows if needed, but screenshot just shows vertical lines mostly
  },
  colDate: {
    flex: 1.2,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  colDay: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  colStatus: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: '#F1F3F5',
  },
  cellText: {
    fontSize: 13,
    fontFamily: 'Roboto_400Regular',
  },
});
