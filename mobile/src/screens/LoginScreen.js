import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
  ActivityIndicator, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';
import { useAuth } from '../store/authStore';

const { width, height } = Dimensions.get('window');
const RED = '#DC143C';
const GOLD = '#D4A017';

function FlagBackground() {
  return (
    <Svg width={width} height={height} style={{ position: 'absolute' }}>
      {/* Gradient-like dark red layers */}
      <Rect width={width} height={height} fill="#1a0008" />
      <Rect width={width} height={height * 0.6} fill="#2a0510" opacity={0.8} />
      {/* Flag pole shapes (silhouettes) */}
      {[0.1, 0.85].map((xRatio, i) => {
        const x = width * xRatio;
        return (
          <React.Fragment key={i}>
            <Line x1={x} y1={20} x2={x} y2={height*0.55} stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
            <Path d={`M${x},30 Q${x+50},55 ${x},80`} fill={RED} opacity={0.85} />
            <Path d={`M${x},85 Q${x+50},110 ${x},135`} fill={RED} opacity={0.7} />
          </React.Fragment>
        );
      })}
      {/* Subtle glow */}
      <Circle cx={width/2} cy={height*0.25} r={120} fill="rgba(220,20,60,0.08)" />
    </Svg>
  );
}

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    const result = await login(email.trim().toLowerCase(), password, 'sknlp');
    setLoading(false);
    if (result.success) {
      navigation.replace('Main');
    } else {
      setError(result.error || 'Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0008" />
      <FlagBackground />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top bar */}
          <SafeAreaView>
            <View style={styles.topBar}>
              <View />
              <TouchableOpacity style={styles.menuBtn}>
                <Text style={styles.menuLines}>≡</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Logo */}
          <View style={styles.logoWrap}>
            <View style={styles.flagEmoji}>
              <Text style={{ fontSize: 48 }}>🇰🇳</Text>
            </View>
            <Text style={styles.sknlp}>SKNLP</Text>
            <Text style={styles.campaign365}>Campaign 365</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.welcomeBack}>Welcome Back</Text>
            <Text style={styles.loginSub}>Log in to start canvassing</Text>

            {/* Email */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                placeholderTextColor="rgba(0,0,0,0.35)"
                value={email}
                onChangeText={t => { setEmail(t); setError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passWrap}>
                <TextInput
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  placeholder="••••••••••••"
                  placeholderTextColor="rgba(0,0,0,0.35)"
                  value={password}
                  onChangeText={t => { setPassword(t); setError(''); }}
                  secureTextEntry={!showPass}
                />
                <TouchableOpacity onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
                  <Text style={styles.eyeText}>{showPass ? '🙈' : '👁'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Error */}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* Remember me */}
            <TouchableOpacity style={styles.rememberRow} onPress={() => setRemember(v => !v)}>
              <View style={[styles.checkbox, remember && styles.checkboxOn]}>
                {remember && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            {/* Sign In button */}
            <TouchableOpacity
              style={[styles.signInBtn, loading && { opacity: 0.75 }]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.signInText}>→  Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Forgot password */}
            <TouchableOpacity style={styles.forgotWrap}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Sign up */}
            <View style={styles.signUpRow}>
              <Text style={styles.signUpGray}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Demo quick-fill */}
            <View style={styles.demoBox}>
              <Text style={styles.demoTitle}>Quick Fill — Tap to login</Text>
              {[
                { label: '👤 Admin',     email: 'admin@sknlp.campaign365.app' },
                { label: '🚶 Canvasser', email: 'canvasser@sknlp.campaign365.app' },
                { label: '🏃 Runner',    email: 'runner@sknlp.campaign365.app' },
              ].map((cred, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.demoBtn}
                  onPress={() => { setEmail(cred.email); setPassword('password'); setError(''); }}
                >
                  <Text style={styles.demoBtnLabel}>{cred.label}</Text>
                  <Text style={styles.demoBtnEmail} numberOfLines={1}>{cred.email}</Text>
                  <Text style={styles.demoBtnArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0008' },
  scroll:    { flexGrow: 1, paddingBottom: 40 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  menuBtn:    { padding: 8 },
  menuLines:  { color: 'white', fontSize: 24, fontWeight: '300' },
  logoWrap: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 28,
  },
  flagEmoji: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
    shadowColor: RED, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  sknlp: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
  },
  campaign365: {
    color: GOLD,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 2,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: RED,
    shadowColor: RED,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  welcomeBack: {
    color: '#111',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  loginSub: {
    color: '#666',
    fontSize: 14,
    marginBottom: 24,
  },
  fieldWrap:  { marginBottom: 16 },
  label: {
    color: '#333',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111',
    marginBottom: 0,
  },
  passWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingRight: 12,
  },
  eyeBtn:  { padding: 8 },
  eyeText: { fontSize: 16 },
  error: {
    color: RED,
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '600',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  checkbox: {
    width: 20, height: 20, borderRadius: 4,
    borderWidth: 2, borderColor: '#2563EB',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: '#2563EB' },
  checkmark:  { color: 'white', fontSize: 12, fontWeight: '900' },
  rememberText: { color: '#333', fontSize: 14 },
  signInBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  forgotWrap: { alignItems: 'center', marginBottom: 16 },
  forgotText: { color: GOLD, fontSize: 14, fontWeight: '600' },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  signUpRow:  { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  signUpGray: { color: '#666', fontSize: 13 },
  signUpLink: { color: GOLD, fontSize: 13, fontWeight: '700', textDecorationLine: 'underline' },
  demoBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  demoTitle: { color: '#999', fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  demoBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11,
    marginBottom: 8, borderWidth: 1, borderColor: '#e5e7eb',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4,
  },
  demoBtnLabel: { color: '#111', fontWeight: '700', fontSize: 13, minWidth: 80 },
  demoBtnEmail: { color: '#64748B', fontSize: 11, flex: 1, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  demoBtnArrow: { color: RED, fontWeight: '900', fontSize: 16 },
});
