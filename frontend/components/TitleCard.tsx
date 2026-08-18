import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/Colors';

export default function TitleCard() {
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.language || 'hi';

  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text 
          style={[styles.title, { fontSize: currentLang === 'en' ? 25 : 42 }]}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.5}
        >
          {t('title')}
        </Text>
        
        <View style={styles.langToggle}>
          <TouchableOpacity 
            style={[styles.langBtn, currentLang === 'hi' && styles.langBtnActive]}
            onPress={() => switchLang('hi')}
          >
            <Text style={[styles.langText, currentLang === 'hi' && styles.langTextActive]}>अ</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.langBtn, currentLang === 'en' && styles.langBtnActive]}
            onPress={() => switchLang('en')}
          >
            <Text style={[styles.langText, currentLang === 'en' && styles.langTextActive]}>A</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: 45,
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 20,
    marginTop: 5,
    zIndex: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'NotoSansDevanagari_700Bold',
    fontSize: 42,
    color: Colors.primaryGreen,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  langToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryGreen,
    borderRadius: 20,
    padding: 3,
  },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  langBtnActive: {
    backgroundColor: Colors.white,
  },
  langText: {
    color: Colors.white,
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  langTextActive: {
    color: Colors.primaryGreen,
  }
});
