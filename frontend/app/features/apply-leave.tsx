import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Custom component for outlined form fields
const OutlinedField = ({ label, value, icon, isDropdown = false, width = '100%' }: any) => (
  <View style={[styles.fieldContainer, { width }]}>
    <View style={styles.floatingLabelContainer}>
      <Text style={styles.floatingLabel}>{label}</Text>
    </View>
    <View style={styles.fieldBox}>
      <Text style={styles.fieldValue}>{value}</Text>
      {icon ? (
        <Ionicons name={icon} size={20} color="#666" />
      ) : isDropdown ? (
        <Ionicons name="chevron-down" size={20} color="#666" />
      ) : null}
    </View>
  </View>
);

export default function ApplyLeaveScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title Row */}
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.title}>Apply Leave</Text>
        </View>

        <View style={styles.card}>
          {/* Employee Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={styles.iconCircle}>
                <Ionicons name="person-outline" size={22} color="#046835" />
              </View>
              <View>
                <Text style={styles.detailLabel}>Employee name</Text>
                <Text style={styles.detailValue}>152770</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.iconCircle}>
                <Ionicons name="business-outline" size={22} color="#046835" />
              </View>
              <View>
                <Text style={styles.detailLabel}>Office</Text>
                <Text style={styles.detailValue}>DO KARNAL</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.iconCircle}>
                <Ionicons name="briefcase-outline" size={22} color="#046835" />
              </View>
              <View style={styles.detailTextWrapper}>
                <Text style={styles.detailLabel}>Division</Text>
                <Text style={styles.detailValue}>General Administration</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.iconCircle}>
                <Ionicons name="medal-outline" size={22} color="#046835" />
              </View>
              <View style={styles.detailTextWrapper}>
                <Text style={styles.detailLabel}>Designation</Text>
                <Text style={styles.detailValue}>Assistant General Manager</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.iconCircle}>
                <Ionicons name="people-outline" size={22} color="#046835" />
              </View>
              <View>
                <Text style={styles.detailLabel}>Cadre</Text>
                <Text style={styles.detailValue}>General</Text>
              </View>
            </View>
          </View>

          {/* Form Section */}
          <Text style={styles.sectionTitle}>Leave Type</Text>
          <OutlinedField label="Leave Type" value="Casual Leave" isDropdown />

          <View style={styles.row}>
            <OutlinedField label="From" value="18-12-2024" icon="calendar-outline" width="48%" />
            <OutlinedField label="To" value="20-12-2024" icon="calendar-outline" width="48%" />
          </View>

          <OutlinedField label="Session" value="Full Day" isDropdown />

          <Text style={styles.sectionTitle}>Whether Going Out Of Station</Text>
          <OutlinedField label="Whether Going Out Of Station" value="No" isDropdown />
          <OutlinedField label="Reason" value="Others" isDropdown />

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
