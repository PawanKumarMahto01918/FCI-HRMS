import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppTheme } from '../../context/ThemeContext';

const leaveData = [
  { id: '1', count: '3.5', label: 'Casual Leave' },
  { id: '2', count: '2', label: 'Restricted Holiday' },
  { id: '3', count: '0', label: 'Special Casual Leave' },
  { id: '4', count: '309', label: 'HPL/Medical Leave' },
  { id: '5', count: '7', label: 'Unavailed Joining Leave' },
  { id: '6', count: '170', label: 'Earned Leaves' },
  { id: '7', count: '0', label: 'Paternity Leave' },
  { id: '8', count: '0', label: 'Adoption Leave' },
  { id: '9', count: '715', label: 'Special Disability Leave' },
  { id: '10', count: '0', label: 'Study Leave' },
];

const appliedLeavesData = [
  { id: 'LA2649821', appliedOn: '15-07-2024' },
  { id: 'LA2636291', appliedOn: '11-07-2024', type: 'Casual Leave', from: '12-07-2024', to: '12-07-2024', status: 'Approved' },
  { id: 'LA2481950', appliedOn: '15-05-2024' },
  { id: 'LA2348741', appliedOn: '26-03-2024' },
  { id: 'LA2348192', appliedOn: '26-03-2024' },
  { id: 'LA2144498', appliedOn: '10-01-2024' },
  { id: 'LA1997369', appliedOn: '28-11-2023' },
];

export default function LeaveBalanceScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'balance' | 'applied'>('balance');
  const [expandedId, setExpandedId] = useState<string | null>('LA2636291');
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

      {/* Top Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'balance' ? styles.activeTab : [styles.inactiveTab, { backgroundColor: isDark ? colors.card : '#E0E0E0' }]]}
          onPress={() => setActiveTab('balance')}
        >
          <Text style={[activeTab === 'balance' ? styles.activeTabText : styles.inactiveTabText, { color: activeTab === 'balance' ? '#fff' : colors.textSecondary }]}>
            Leave Balance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'applied' ? styles.activeTab : [styles.inactiveTab, { backgroundColor: isDark ? colors.card : '#E0E0E0' }]]}
          onPress={() => setActiveTab('applied')}
        >
          <Text style={[activeTab === 'applied' ? styles.activeTabText : styles.inactiveTabText, { color: activeTab === 'applied' ? '#fff' : colors.textSecondary }]}>
            Applied Leaves
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent} 
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
        {/* Title Row */}
        <View style={[styles.titleRow, { backgroundColor: colors.background }]}>
          <View style={styles.titleLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>
              {activeTab === 'balance' ? 'Leave Type' : 'Availed Leave'}
            </Text>
          </View>
        </View>

        {/* Content based on Active Tab */}
        {activeTab === 'balance' ? (
          <View style={styles.grid}>
            {leaveData.map((item) => (
              <View key={item.id} style={[styles.card, { backgroundColor: colors.card, shadowColor: isDark ? 'transparent' : '#000' }]}>
                <Text style={[styles.countText, { color: colors.text }]}>{item.count}</Text>
                <Text style={[styles.labelText, { color: colors.textSecondary }]}>{item.label}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {appliedLeavesData.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.listItem, { backgroundColor: colors.card, shadowColor: isDark ? 'transparent' : '#000' }]}
                  activeOpacity={0.7}
                  onPress={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <View style={styles.listHeaderRow}>
                    <Text style={[styles.leaveIdText, { color: colors.text }]}>Leave ID - {item.id}</Text>
                    <Text style={[styles.appliedOnText, { color: colors.textSecondary }]}>Applied on: {item.appliedOn}</Text>
                  </View>
                  
                  {isExpanded && (
                    <View style={styles.expandedContent}>
                      <View style={styles.detailRow}>
                        <View style={styles.detailCol}>
                          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Leave Type</Text>
                          <Text style={[styles.detailValue, { color: colors.text }]}>{item.type || 'Casual Leave'}</Text>
                        </View>
                        <View style={styles.detailCol}>
                          <View style={styles.detailLabelRow}>
                            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>From</Text>
                          </View>
                          <Text style={[styles.detailValue, { color: colors.text }]}>{item.from || item.appliedOn}</Text>
                        </View>
                        <View style={styles.detailCol}>
                          <View style={styles.detailLabelRow}>
                            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>To</Text>
                          </View>
                          <Text style={[styles.detailValue, { color: colors.text }]}>{item.to || item.appliedOn}</Text>
                        </View>
                      </View>

                      <View style={styles.detailRow}>
                        <View style={styles.fullWidthCol}>
                          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Responsible / Officiating Employee in Absence</Text>
                          <Text style={[styles.detailValue, { color: colors.text }]}>—</Text>
                        </View>
                      </View>

                      <View style={styles.detailRowBottom}>
                        <View style={styles.bottomCol}>
                          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Attachment</Text>
                          <View style={styles.attachmentRow}>
                            <View style={styles.pdfIcon}>
                              <Text style={styles.pdfText}>PDF</Text>
                            </View>
                            <Text style={[styles.attachmentLink, { color: isDark ? colors.textSecondary : '#046835' }]}>View Document</Text>
                          </View>
                        </View>
                        
                        <View style={styles.bottomCol}>
                          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Status</Text>
                          <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>Approved</Text>
                            <Ionicons name="chevron-forward" size={12} color="#fff" />
                          </View>
                        </View>

                        <View style={styles.actionsCol}>
                          <TouchableOpacity style={[styles.actionBtnLeft, { backgroundColor: isDark ? colors.background : '#F0F0F0', borderRightColor: isDark ? colors.border : '#DDD' }]}>
                            <Ionicons name="eye" size={18} color={colors.icon} />
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.actionBtnRight, { backgroundColor: isDark ? colors.background : '#F0F0F0' }]}>
                            <Ionicons name="close" size={18} color={colors.icon} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[styles.fab, { bottom: insets.bottom + 20 }]} 
        activeOpacity={0.8}
        onPress={() => router.push('/features/apply-leave')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#046835', // Brand green instead of dark grey
  },
  inactiveTab: {
    backgroundColor: '#E2E6E9',
  },
  activeTabText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto_500Medium',
  },
  inactiveTabText: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    color: '#111',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  countText: {
    fontSize: 24,
    color: '#046835',
    fontFamily: 'Roboto_400Regular',
    marginBottom: 8,
  },
  labelText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  listItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leaveIdText: {
    fontSize: 14,
    fontFamily: 'Roboto_700Bold',
    color: '#046835',
  },
  appliedOnText: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#666',
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailCol: {
    flex: 1,
  },
  fullWidthCol: {
    flex: 1,
  },
  detailLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Roboto_700Bold',
    color: '#111',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#555',
  },
  detailRowBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  bottomCol: {
    flex: 1,
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pdfIcon: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  pdfText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  attachmentLink: {
    color: '#E74C3C',
    fontSize: 12,
    textDecorationLine: 'underline',
    fontFamily: 'Roboto_400Regular',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#046835',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    alignSelf: 'flex-start',
    gap: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Roboto_500Medium',
  },
  actionsCol: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  actionBtnLeft: {
    padding: 8,
    backgroundColor: '#F9F9F9',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  actionBtnRight: {
    padding: 8,
    backgroundColor: '#F9F9F9',
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#046835',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
