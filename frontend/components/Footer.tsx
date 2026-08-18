import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/Colors';

export default function Footer() {
  const { t } = useTranslation();
  const handlePress = (name: string) => {
    if (Platform.OS === 'web') window.alert(`${name} clicked`);
    else Alert.alert('Navigation', `${name} clicked`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => handlePress(t('buttons.cardex'))}>
        <Text style={styles.btnText}>{t('buttons.cardex')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handlePress(t('buttons.prms'))}>
        <Text style={styles.btnText}>{t('buttons.prms')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handlePress(t('buttons.egot'))}>
        <Text style={styles.btnText}>{t('buttons.egot')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 20,
    marginTop: 10,
  },
  btn: {
    backgroundColor: Colors.orange,
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: Colors.white,
    fontFamily: 'NotoSansDevanagari_700Bold',
    fontSize: 14,
  }
});
