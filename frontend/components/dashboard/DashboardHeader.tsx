import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../context/ThemeContext';

interface DashboardHeaderProps {
  userName?: string;
  notificationCount?: number;
  paddingTop?: number;
  leftIcon?: 'menu' | 'home' | 'none';
  onLeftIconPress?: () => void;
}

export default function DashboardHeader({
  userName = 'AMITABH',
  notificationCount = 84,
  paddingTop = 0,
  leftIcon = 'menu',
  onLeftIconPress,
}: DashboardHeaderProps) {
  const insets = useSafeAreaInsets();
  const topPadding = paddingTop || insets.top;
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { paddingTop: topPadding + 12, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      {/* Left — Hamburger / Home / None + Logo */}
      <View style={styles.left}>
        {leftIcon !== 'none' && (
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={onLeftIconPress ? onLeftIconPress : () => router.push('/features/menu' as any)}
          >
            <Ionicons name={leftIcon} size={leftIcon === 'home' ? 26 : 30} color={leftIcon === 'home' ? '#046835' : colors.icon} />
          </TouchableOpacity>
        )}
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logoImage} 
          resizeMode="contain"
        />
      </View>

      {/* Center — Empty */}
      <View style={styles.center} />

      {/* Right — Bell + Avatar */}
      <View style={styles.right}>
        {/* Notification bell with badge */}
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/features/notifications' as any)}>
          <Ionicons name="notifications-outline" size={26} color={colors.icon} />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Avatar + Dropdown (Logout) */}
        <TouchableOpacity 
          style={styles.avatarRow} 
          onPress={() => router.push('/features/profile' as any)}
        >
          <View style={[styles.avatar, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Ionicons name="person" size={20} color={colors.icon} />
          </View>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  iconBtn: {
    padding: 6,
    position: 'relative',
  },
  logoImage: {
    width: 35,
    height: 35,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
