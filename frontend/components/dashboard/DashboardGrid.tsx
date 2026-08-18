import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { dashboardItems } from '../../constants/dashboardItems';
import DashboardCard from './DashboardCard';

export default function DashboardGrid() {
  // Group items into rows of 3
  const rows: (typeof dashboardItems)[] = [];
  for (let i = 0; i < dashboardItems.length; i += 3) {
    rows.push(dashboardItems.slice(i, i + 3));
  }

  return (
    <View style={styles.grid}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => (
            <DashboardCard
              key={item.id}
              item={item}
              onPress={() => {
                if (item.route) {
                  router.push(item.route as any);
                }
              }}
            />
          ))}
          {/* Fill empty cells in the last row */}
          {row.length < 3 &&
            Array.from({ length: 3 - row.length }).map((_, i) => (
              <View key={`empty-${i}`} style={styles.emptyCell} />
            ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyCell: {
    flex: 1,
    margin: 5,
  },
});
