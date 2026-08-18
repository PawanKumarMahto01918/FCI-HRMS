import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppTheme } from '../../context/ThemeContext';

// Custom component for outlined form fields
const OutlinedField = ({ label, value, icon, isDropdown = false, width = '100%', colors, isDark }: any) => (
  <View style={[styles.fieldContainer, { width }]}>
    <View style={[styles.floatingLabelContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.floatingLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
    <View style={[styles.fieldBox, { borderColor: colors.border, backgroundColor: isDark ? colors.background : '#fff' }]}>
      <Text style={[styles.fieldValue, { color: colors.text }]}>{value}</Text>
      {icon ? (
        <Ionicons name={icon} size={20} color={colors.textSecondary} />
      ) : isDropdown ? (
        <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
      ) : null}
    </View>
  </View>
);

export default function ApplyLeaveScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title Row */}
        <View style={[styles.titleRow, { backgroundColor: colors.background }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Apply Leave</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: isDark ? 'transparent' : '#000' }]}>
          {/* Employee Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={[styles.iconCircle, { backgroundColor: isDark ? '#04683525' : '#F4F9F6' }]}>
                <Ionicons name="person-outline" size={22} color="#046835" />
              </View>
              <View>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Employee name</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>152770</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={[styles.iconCircle, { backgroundColor: isDark ? '#04683525' : '#F4F9F6' }]}>
                <Ionicons name="business-outline" size={22} color="#046835" />
              </View>
              <View>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Office</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>DO KARNAL</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={[styles.iconCircle, { backgroundColor: isDark ? '#04683525' : '#F4F9F6' }]}>
                <Ionicons name="briefcase-outline" size={22} color="#046835" />
              </View>
              <View style={styles.detailTextWrapper}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Division</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>General Administration</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={[styles.iconCircle, { backgroundColor: isDark ? '#04683525' : '#F4F9F6' }]}>
                <Ionicons name="medal-outline" size={22} color="#046835" />
              </View>
              <View style={styles.detailTextWrapper}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Designation</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>Assistant General Manager</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={[styles.iconCircle, { backgroundColor: isDark ? '#04683525' : '#F4F9F6' }]}>
                <Ionicons name="people-outline" size={22} color="#046835" />
              </View>
              <View>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Cadre</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>General</Text>
              </View>
            </View>
          </View>

          {/* Form Section */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Leave Type</Text>
          <OutlinedField label="Leave Type" value="Casual Leave" isDropdown colors={colors} isDark={isDark} />

          <View style={styles.row}>
            <OutlinedField label="From" value="18-12-2024" icon="calendar-outline" width="48%" colors={colors} isDark={isDark} />
            <OutlinedField label="To" value="20-12-2024" icon="calendar-outline" width="48%" colors={colors} isDark={isDark} />
          </View>

          <OutlinedField label="Session" value="Full Day" isDropdown colors={colors} isDark={isDark} />

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Whether Going Out Of Station</Text>
          <OutlinedField label="Whether Going Out Of Station" value="No" isDropdown colors={colors} isDark={isDark} />
          <OutlinedField label="Reason" value="Others" isDropdown colors={colors} isDark={isDark} />

          {/* Bottom Padding */}
          <View style={{ height: 40 }} />
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
  scroll: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 1,
  },
  backBtn: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
    color: '#111',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  detailItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingRight: 8,
  },
  iconCircle: {
    marginRight: 10,
    marginTop: 2,
  },
  detailTextWrapper: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    fontFamily: 'Roboto_700Bold',
    color: '#111',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    fontFamily: 'Roboto_400Regular',
    color: '#666',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Roboto_700Bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  fieldContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  floatingLabelContainer: {
    position: 'absolute',
    top: -8,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  floatingLabel: {
    fontSize: 11,
    color: '#046835',
    fontFamily: 'Roboto_400Regular',
  },
  fieldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  fieldValue: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Roboto_400Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
