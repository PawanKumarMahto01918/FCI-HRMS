import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppTheme } from '../../context/ThemeContext';

export default function PrivacyScreen() {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.titleRow, { backgroundColor: colors.background }]}>
        <View style={styles.titleLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: isDark ? 'transparent' : '#000' }]}>
          <Text style={[styles.heading, { color: colors.text, marginTop: 0 }]}>Data Collection</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We collect personal data strictly necessary to provide HR management services. This includes but is not limited to your name, contact information, role details, and attendance records.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>Data Usage</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            Your data is used solely for internal HR operations, payroll processing, and compliance with local labor regulations. We do not sell or share your data with third-party marketing agencies.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>Security</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            All data is encrypted in transit and at rest. We employ industry-standard security protocols to ensure your personal information is protected from unauthorized access.
          </Text>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  titleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  titleLeft: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 16 },
  title: { fontSize: 18, fontFamily: 'Roboto_700Bold', color: '#111' },
  scroll: { flex: 1 },
  card: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 8, padding: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  heading: { fontSize: 16, fontFamily: 'Roboto_700Bold', color: '#111', marginBottom: 8, marginTop: 16 },
  paragraph: { fontSize: 14, fontFamily: 'Roboto_400Regular', color: '#555', lineHeight: 22 },
});
