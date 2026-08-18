import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppTheme } from '../../context/ThemeContext';

export default function TermsScreen() {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.titleRow, { backgroundColor: colors.background }]}>
        <View style={styles.titleLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Terms & Conditions</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: isDark ? 'transparent' : '#000' }]}>
          <Text style={[styles.heading, { color: colors.text, marginTop: 0 }]}>1. Acceptance of Terms</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            By accessing and using the HRMS-FCI mobile application, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>2. Use License</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            Permission is granted to temporarily download one copy of the application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>3. Workplace Conduct</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            This application is intended for official use by authorized personnel. Any misuse, unauthorized access attempts, or falsification of records (e.g., attendance) may result in disciplinary action.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>4. Modifications</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We may revise these terms of service for its application at any time without notice. By using this application you are agreeing to be bound by the then current version of these terms.
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
