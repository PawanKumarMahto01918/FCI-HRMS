import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const { i18n } = useTranslation();
  const { isDark, toggleTheme, colors } = useAppTheme();
  const [notifications, setNotifications] = useState(true);

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.titleRow, { backgroundColor: colors.background }]}>
        <View style={styles.titleLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: isDark ? 'transparent' : '#000' }]}>
          
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={22} color={colors.icon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Push Notifications</Text>
            </View>
            <Switch 
              value={notifications} 
              onValueChange={setNotifications} 
              trackColor={{ false: '#DDD', true: '#046835' }}
            />
          </View>

          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={22} color={colors.icon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme} 
              trackColor={{ false: '#DDD', true: '#046835' }}
            />
          </View>

          <TouchableOpacity style={[styles.settingRow, styles.lastSetting]} onPress={handleLanguageToggle}>
            <View style={styles.settingLeft}>
              <Ionicons name="globe-outline" size={22} color={colors.icon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Language</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#046835', marginRight: 8, fontFamily: 'Roboto_700Bold' }}>
                {i18n.language === 'en' ? 'English' : 'हिंदी'}
              </Text>
              <Ionicons name="swap-horizontal" size={18} color="#046835" />
            </View>
          </TouchableOpacity>

        </View>
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
  card: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 8, padding: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  lastSetting: { borderBottomWidth: 0 },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingText: { fontSize: 16, fontFamily: 'Roboto_500Medium', color: '#333', marginLeft: 12 },
});
