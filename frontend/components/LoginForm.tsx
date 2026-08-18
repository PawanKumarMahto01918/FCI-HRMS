import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Animated, Dimensions, Keyboard, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Colors';
import { router } from 'expo-router';

const generateCaptchaText = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default function LoginForm() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('sign_in');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaText, setCaptchaText] = useState(generateCaptchaText());
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetId, setResetId] = useState('');

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const tabSlideAnim = useRef(new Animated.Value(0)).current;

  // Tracks actual keyboard height so the scroll window is responsive
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const keyboardHeightRef = useRef(0); // mirror as ref for use inside event handlers
  // Ref for the scrollable form content below IOS App Link
  const formScrollRef = useRef<ScrollView>(null);
  // Ref for the forgot-password form scroll
  const fpScrollRef = useRef<ScrollView>(null);
  const WINDOW_HEIGHT = Dimensions.get('window').height;
  // Approx offset from screen top to the form scroll area
  const HEADER_OFFSET = 388;

  // Sign-in scroll positions
  const SLOT = 60;
  const FORGOT_H = 25;
  const CAPTCHA_SCROLL_Y = SLOT * 2 + FORGOT_H; // 145px

  // Forgot-password scroll positions:
  //   title(35) + resetId input(60) + captchaRow(60) = 155px to captcha input
  const FP_CAPTCHA_SCROLL_Y = 155;

  // focusedFieldRef type extended for forgot-password fields
  const focusedFieldRef = useRef<'loginId' | 'password' | 'captcha' | 'fpResetId' | 'fpCaptcha' | null>(null);

  const scrollToFocusedField = (field: typeof focusedFieldRef.current) => {
    if (field === 'loginId') formScrollRef.current?.scrollTo({ y: 0, animated: true });
    else if (field === 'password') formScrollRef.current?.scrollTo({ y: SLOT, animated: true });
    else if (field === 'captcha') formScrollRef.current?.scrollTo({ y: CAPTCHA_SCROLL_Y, animated: true });
    else if (field === 'fpResetId') fpScrollRef.current?.scrollTo({ y: 0, animated: true });
    else if (field === 'fpCaptcha') fpScrollRef.current?.scrollTo({ y: FP_CAPTCHA_SCROLL_Y, animated: true });
  };

  useEffect(() => {
    if (Platform.OS === 'web') return;

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      const h = e.endCoordinates.height;
      keyboardHeightRef.current = h;
      setKeyboardHeight(h);
      // Scroll AFTER layout settles with new maxHeight applied
      setTimeout(() => {
        scrollToFocusedField(focusedFieldRef.current);
      }, 50);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      keyboardHeightRef.current = 0;
      setKeyboardHeight(0);
      formScrollRef.current?.scrollTo({ y: 0, animated: false });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus handlers: store which field is active.
  // If keyboard is already open (switching fields), scroll immediately.
  const onLoginIdFocus = () => {
    focusedFieldRef.current = 'loginId';
    if (keyboardHeightRef.current > 0) scrollToFocusedField('loginId');
  };

  const onPasswordFocus = () => {
    focusedFieldRef.current = 'password';
    if (keyboardHeightRef.current > 0) scrollToFocusedField('password');
  };

  const onCaptchaFocus = () => {
    focusedFieldRef.current = 'captcha';
    if (keyboardHeightRef.current > 0) scrollToFocusedField('captcha');
  };

  // Forgot-password field handlers
  const onFpResetIdFocus = () => {
    focusedFieldRef.current = 'fpResetId';
    if (keyboardHeightRef.current > 0) scrollToFocusedField('fpResetId');
  };

  const onFpCaptchaFocus = () => {
    focusedFieldRef.current = 'fpCaptcha';
    if (keyboardHeightRef.current > 0) scrollToFocusedField('fpCaptcha');
  };

  const switchTab = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    tabSlideAnim.setValue(100); // Start 100px to the right for a clean slide left

    // Wait for the new content to fully mount before sliding it in
    setTimeout(() => {
      Animated.timing(tabSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 50);
  };

  const handleRefreshCaptcha = () => {
    setCaptchaText(generateCaptchaText());
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleLogin = async () => {
    if (!loginId || !password || !captcha) {
      if (Platform.OS === 'web') {
        window.alert(t('alerts.fillAllFields'));
      } else {
        Alert.alert('Error', t('alerts.fillAllFieldsNative'));
      }
      return;
    }

    if (captcha.toLowerCase() !== captchaText.toLowerCase()) {
      const msg = 'Invalid Captcha! Please try again.';
      if (Platform.OS === 'web') window.alert(msg);
      else Alert.alert('Error', msg);
      setCaptcha('');
      setCaptchaText(generateCaptchaText());
      return;
    }

    if (loginId === 'test@test.com' && password === 'test@123') {
      await AsyncStorage.setItem('userSession', 'AMITABH');
      router.replace({
        pathname: '/dashboard' as any,
        params: { userName: 'AMITABH' }
      });
    } else {
      if (Platform.OS === 'web') {
        window.alert(t('alerts.invalidCredentials'));
      } else {
        Alert.alert('Error', t('alerts.invalidCredentials'));
      }
    }
  };

  const handleResetPassword = () => {
    if (!resetId) {
      const msg = 'Please enter your Login ID';
      if (Platform.OS === 'web') window.alert(msg);
      else Alert.alert('Error', msg);
      return;
    }
    const msg = `Password reset link sent to registered email for ID: ${resetId}`;
    if (Platform.OS === 'web') window.alert(msg);
    else Alert.alert('Success', msg);
    setIsForgotPassword(false);
    setResetId('');
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topTabs}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'sign_in' && styles.tabBtnActive]}
          onPress={() => switchTab('sign_in')}
        >
          <Text style={activeTab === 'sign_in' ? styles.tabBtnTextActive : styles.tabBtnText}>{t('tabs.signIn')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'manual' && styles.tabBtnActive]}
          onPress={() => switchTab('manual')}
        >
          <Text style={activeTab === 'manual' ? styles.tabBtnTextActive : styles.tabBtnText}>{t('tabs.manual')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'promotion' && styles.tabBtnActive]}
          onPress={() => switchTab('promotion')}
        >
          <Text style={activeTab === 'promotion' ? styles.tabBtnTextActive : styles.tabBtnText}>{t('tabs.promotion')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'ipr' && styles.tabBtnActive]}
          onPress={() => switchTab('ipr')}
        >
          <Text style={activeTab === 'ipr' ? styles.tabBtnTextActive : styles.tabBtnText}>{t('tabs.ipr')}</Text>
        </TouchableOpacity>
      </ScrollView>

      <Animated.View style={{ transform: [{ translateX: tabSlideAnim }] }}>
        {activeTab === 'sign_in' && (
          <View>
            {!isForgotPassword ? (
              <>
                {/* IOS App Link — always fixed, never moves */}
                <TouchableOpacity
                  style={styles.iosLink}
                  onPress={() => {
                    if (Platform.OS === 'web') window.alert('IOS App Link Clicked');
                    else Alert.alert('Link', 'IOS App Link');
                  }}
                >
                  <Text style={styles.iosLinkText}>IOS App Link</Text>
                </TouchableOpacity>

                {/*
                  Responsive scroll window between IOS App Link and keyboard.
                  maxHeight shrinks dynamically with keyboard height so content
                  stays visible above keyboard. scrollTo per field:
                    Login ID  → y=0    (Login ID + Password both visible)
                    Password  → y=60   (Password at top, Login ID scrolls off)
                    Captcha   → y=145  (captcha image+refresh AND input both shown)
                */}
                <ScrollView
                  ref={formScrollRef}
                  style={keyboardHeight > 0 ? {
                    maxHeight: Math.max(WINDOW_HEIGHT - keyboardHeight - HEADER_OFFSET, 120)
                  } : undefined}
                  scrollEnabled={keyboardHeight > 0}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder={t('inputs.loginId')}
                      placeholderTextColor={Colors.textDark}
                      value={loginId}
                      onChangeText={setLoginId}
                      autoCapitalize="none"
                      onFocus={onLoginIdFocus}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder={t('inputs.password')}
                      placeholderTextColor={Colors.textDark}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                      onFocus={onPasswordFocus}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={Colors.white} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.forgotBtn}
                    onPress={() => setIsForgotPassword(true)}
                  >
                    <Text style={styles.forgotText}>{t('links.forgotPassword')}</Text>
                  </TouchableOpacity>

                  <View style={styles.captchaRow}>
                    <View style={styles.captchaImageContainer}>
                      <View style={styles.captchaBackground}>
                        <Text style={styles.captchaTextDisplay}>{captchaText}</Text>
                        <View style={[styles.captchaLine, { top: 15, transform: [{ rotate: '5deg' }] }]} />
                        <View style={[styles.captchaLine, { top: 30, transform: [{ rotate: '-8deg' }] }]} />
                      </View>
                    </View>
                    <TouchableOpacity style={styles.refreshBtn} onPress={handleRefreshCaptcha}>
                      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                        <Ionicons name="refresh" size={24} color={Colors.white} />
                      </Animated.View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder={t('inputs.captcha')}
                      placeholderTextColor={Colors.textDark}
                      value={captcha}
                      onChangeText={setCaptcha}
                      autoCapitalize="none"
                      onFocus={onCaptchaFocus}
                    />
                  </View>

                  <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
                    <Text style={styles.submitBtnText}>{t('buttons.signIn')}</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            ) : (
              <ScrollView
                ref={fpScrollRef}
                style={keyboardHeight > 0 ? {
                  maxHeight: Math.max(WINDOW_HEIGHT - keyboardHeight - HEADER_OFFSET, 120)
                } : undefined}
                scrollEnabled={keyboardHeight > 0}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                <Text style={{ color: Colors.white, fontSize: 20, fontFamily: 'NotoSansDevanagari_700Bold', marginBottom: 15, textAlign: 'center' }}>
                  Reset Password
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={t('inputs.loginId')}
                    placeholderTextColor={Colors.textDark}
                    value={resetId}
                    onChangeText={setResetId}
                    autoCapitalize="none"
                    onFocus={onFpResetIdFocus}
                  />
                </View>

                <View style={styles.captchaRow}>
                  <View style={styles.captchaImageContainer}>
                    <View style={styles.captchaBackground}>
                      <Text style={styles.captchaTextDisplay}>{captchaText}</Text>
                      <View style={[styles.captchaLine, { top: 15, transform: [{ rotate: '5deg' }] }]} />
                      <View style={[styles.captchaLine, { top: 30, transform: [{ rotate: '-8deg' }] }]} />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.refreshBtn} onPress={handleRefreshCaptcha}>
                    <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                      <Ionicons name="refresh" size={24} color={Colors.white} />
                    </Animated.View>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={t('inputs.captcha')}
                    placeholderTextColor={Colors.textDark}
                    value={captcha}
                    onChangeText={setCaptcha}
                    autoCapitalize="none"
                    onFocus={onFpCaptchaFocus}
                  />
                </View>

                <TouchableOpacity style={styles.submitBtn} onPress={handleResetPassword}>
                  <Text style={styles.submitBtnText}>Send Reset Link</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignSelf: 'center', marginTop: 15 }}
                  onPress={() => setIsForgotPassword(false)}
                >
                  <Text style={[styles.forgotText, { color: Colors.white, fontSize: 16 }]}>Back to Login</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        )}

        {activeTab === 'manual' && (
          <ScrollView
            style={[styles.manualContainer, { height: 350 }]}
            showsVerticalScrollIndicator={true}
          >
            {[
              "HRMS Mobile Application User Manual",
              "Employee Self Service User Manual",
              "Bio-metric User Manual",
              "Core HR User Manual",
              "Employee Relation User Manual",
              "Leave and Attendance User Manual",
              "Payroll User Manual",
              "Performance Management System User Manual",
              "Talent Management User Manual",
              "Compensation And Benefits User Manual",
              "Talent Acquisition User Manual"
            ].map((title, index) => (
              <TouchableOpacity key={index} style={styles.manualCard}>
                <Ionicons name="document-outline" size={24} color="#5dade2" style={styles.manualIcon} />
                <Text style={styles.manualText}>{title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {activeTab === 'promotion' && (
          <ScrollView
            style={[styles.manualContainer, { height: 350 }]}
            showsVerticalScrollIndicator={true}
          >
            <Text style={{ color: Colors.white, fontSize: 13, lineHeight: 20, marginBottom: 15, fontFamily: 'Roboto_400Regular' }}>
              Limited Departmental Promotion Examination (LDPE) under Accelerated Promotion Scheme (APS) for the post of / त्वरित पदोन्नति योजना ( एपीएस ) के निम्नलिखित पद हेतु
            </Text>

            <TouchableOpacity style={styles.manualCard}>
              <Ionicons name="document-outline" size={24} color="#5dade2" style={styles.manualIcon} />
              <Text style={styles.manualText}>Category-I (Assistant General Manager)/श्रेणी -I ( सहायक महाप्रबन्धक )</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.manualCard}>
              <Ionicons name="document-outline" size={24} color="#5dade2" style={styles.manualIcon} />
              <Text style={styles.manualText}>Category-II (Manager)/श्रेणी -II ( प्रबन्धक )</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {activeTab === 'ipr' && (
          <View style={[styles.manualContainer, { height: 350, justifyContent: 'center' }]}>
            <Text style={{ color: Colors.white, textAlign: 'center', marginTop: 20 }}>IPR details coming soon...</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardGreen,
    ...Platform.select({
      web: { marginHorizontal: 20 },
      default: { marginHorizontal: -15 }
    }),
    marginTop: -42, // Shifted up by 30 to counter TitleCard stretching underneath
    borderRadius: 20,
    padding: 15,
    paddingTop: 20,
    overflow: 'hidden', // Add this so the slide animation doesn't spill out of the card
    zIndex: 10,
    elevation: 10,
  },
  topTabs: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tabBtn: {
    backgroundColor: Colors.btnGreen,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  tabBtnActive: {
    backgroundColor: Colors.orange,
  },
  tabBtnText: {
    color: Colors.white,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 14,
  },
  tabBtnTextActive: {
    color: Colors.white,
    fontFamily: 'NotoSansDevanagari_400Regular', // Fixes layout shift when tab is clicked
    fontSize: 14,
  },
  iosLink: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  iosLinkText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontFamily: 'Roboto_700Bold',
  },
  inputContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 5,
    marginBottom: 15,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: Colors.textDark,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 16,
    height: '100%',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {} as any)
  },
  eyeIcon: {
    padding: 5,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 15,
  },
  forgotText: {
    color: Colors.textDark,
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 14,
  },
  captchaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    height: 45,
  },
  captchaImageContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginRight: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  captchaBackground: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  captchaTextDisplay: {
    fontSize: 24,
    letterSpacing: 8,
    fontFamily: 'Roboto_700Bold',
    color: '#444',
    transform: [{ skewX: '-10deg' }],
  },
  captchaLine: {
    position: 'absolute',
    width: '120%',
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    left: '-10%',
  },
  refreshBtn: {
    backgroundColor: Colors.btnGreen,
    width: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  submitBtn: {
    backgroundColor: Colors.orange,
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  submitBtnText: {
    color: Colors.white,
    fontFamily: 'NotoSansDevanagari_700Bold',
    fontSize: 18,
  },
  manualContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  manualCard: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  manualIcon: {
    marginRight: 15,
  },
  manualText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  }
});
