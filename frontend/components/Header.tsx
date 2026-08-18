import { Image, StyleSheet, View, Platform } from 'react-native';
import { Colors } from '../constants/Colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/whiteshape.png')}
          style={styles.whiteShapeBg}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryGreen,
    height: '33%',
    minHeight: 250,
    width: '100%',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 200,
    height: 150,
    marginTop: -30,
  },
  whiteShapeBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  }
});
