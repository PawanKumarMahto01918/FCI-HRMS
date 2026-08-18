import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAppTheme } from '../../context/ThemeContext';

export default function SupportScreen() {
  const { colors, isDark } = useAppTheme();

  const handleSubmit = () => {
    Alert.alert("Success", "Your support request has been submitted. Our team will contact you shortly.");
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.titleRow, { backgroundColor: colors.background }]}>
        <View style={styles.titleLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Contact Support</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: isDark ? 'transparent' : '#000' }]}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Having trouble? Fill out the form below and our IT support team will get back to you as soon as possible.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Subject</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: isDark ? colors.background : '#FAFAFA', borderColor: colors.border, color: colors.text }]} 
              placeholder="E.g., App crashing on login"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Message</Text>
            <TextInput 
              style={[styles.input, styles.textArea, { backgroundColor: isDark ? colors.background : '#FAFAFA', borderColor: colors.border, color: colors.text }]} 
              placeholder="Describe your issue in detail..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Request</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <Text style={[styles.orText, { color: colors.textSecondary }]}>Or reach out directly:</Text>
          <View style={styles.directContact}>
            <Ionicons name="mail" size={20} color={isDark ? colors.icon : '#046835'} />
            <Text style={[styles.contactText, { color: colors.text }]}>support@fci.gov.in</Text>
          </View>
          <View style={styles.directContact}>
            <Ionicons name="call" size={20} color={isDark ? colors.icon : '#046835'} />
            <Text style={[styles.contactText, { color: colors.text }]}>+91 11-43527698</Text>
          </View>

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
  description: { fontSize: 14, fontFamily: 'Roboto_400Regular', color: '#555', marginBottom: 20, lineHeight: 20 },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, fontFamily: 'Roboto_500Medium', color: '#333', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, fontSize: 15, fontFamily: 'Roboto_400Regular', color: '#111', backgroundColor: '#FAFAFA' },
  textArea: { height: 120 },
  submitBtn: { backgroundColor: '#FE6A21', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  submitText: { color: '#fff', fontSize: 16, fontFamily: 'Roboto_700Bold' },
  divider: { height: 1, backgroundColor: '#EFEFEF', my: 20, marginVertical: 24 },
  orText: { fontSize: 14, fontFamily: 'Roboto_500Medium', color: '#888', marginBottom: 12 },
  directContact: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  contactText: { fontSize: 15, fontFamily: 'Roboto_500Medium', color: '#111', marginLeft: 10 },
});
