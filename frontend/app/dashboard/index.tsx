import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import DashboardGrid from '../../components/dashboard/DashboardGrid';

export default function DashboardScreen() {
  // userName passed from login via router params
  const { userName } = useLocalSearchParams<{ userName?: string }>();
  const displayName = userName ? userName.toUpperCase() : 'USER';

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.dashboardLabel}>Employee Dashboard</Text>
          <Text style={styles.welcomeText}>Welcome {displayName} !</Text>
        </View>

        {/* Feature Grid */}
        <DashboardGrid />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Copyright ©  2024 FCI India. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Off-white background for the scrollable content
  },
  scrollContent: {
    paddingBottom: 10,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  dashboardLabel: {
    fontSize: 13,
    color: '#046835',
    fontFamily: 'Roboto_500Medium',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  welcomeText: {
    fontSize: 26,
    fontFamily: 'Roboto_700Bold',
    color: '#111',
    letterSpacing: 0.2,
  },
  footer: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Roboto_400Regular',
  },
});
