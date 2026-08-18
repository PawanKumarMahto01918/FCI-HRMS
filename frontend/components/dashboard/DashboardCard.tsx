import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardItem } from '../../constants/dashboardItems';

interface DashboardCardProps {
  item: DashboardItem;
  onPress?: () => void;
}

export default function DashboardCard({ item, onPress }: DashboardCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: item.color }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.iconWrapper, { backgroundColor: item.color + '15' }]}>
        <Ionicons name={item.icon as any} size={30} color={item.color} />
      </View>
      <Text style={styles.label} numberOfLines={3}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1.5,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Roboto_500Medium',
    color: '#333',
    textAlign: 'center',
    lineHeight: 16,
  },
});
