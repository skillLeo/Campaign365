import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
  ActivityIndicator, StatusBar, Dimensions, Image,
} from 'react-native';
import { TYPE } from '../theme/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Path, Rect, Circle, Ellipse, G, Line,
} from 'react-native-svg';
import { useAuth } from '../store/authStore';

const { width, height } = Dimensions.get('window');

const NAVY  = '#0A2540';
const GOLD  = '#C9A227';
const WHITE = '#FFFFFF';
const CREAM = '#F0EDE6';

// ── Hero: crowd silhouettes + gold map blob ───────────────────────────────────
function HeroIllustration() {
  const W = width;
  const H = 200;

  // Person silhouette helper: renders a simple flat person at (cx, baseY) with given scale
  const persons = [
    // { cx, baseY, scale, fill, opacity }
    { cx: 30,        baseY: H - 20, scale: 0.70, fill: '#3B2A1A', opacity: 1   },
    { cx: 65,        baseY: H - 10, scale: 0.85, fill: '#4A3728', opacity: 1   },
    { cx: 105,       baseY: H - 5,  scale: 0.95, fill: '#22374F', opacity: 1   },
    { cx: 148,       baseY: H,      scale: 1.05, fill: '#5C4A30', opacity: 1   },
    { cx: 195,       baseY: H,      scale: 1.1,  fill: NAVY,      opacity: 1   },
    { cx: 240,       baseY: H,      scale: 1.0,  fill: '#3B2A1A', opacity: 1   },
    { cx: 285,       baseY: H - 5,  scale: 0.9,  fill: '#22374F', opacity: 1   },
    { cx: 325,       baseY: H - 15, scale: 0.78, fill: '#4A3728', opacity: 1   },
    { cx: W - 30,    baseY: H - 22, scale: 0.65, fill: '#3B2A1A', opacity: 0.7 },
    { cx: W - 65,    baseY: H - 8,  scale: 0.82, fill: NAVY,      opacity: 0.85},
    // Second row (behind)
    { cx: 50,        baseY: H - 50, scale: 0.55, fill: '#2a1a0a', opacity: 0.7 },
    { cx: 120,       baseY: H - 45, scale: 0.6,  fill: NAVY,      opacity: 0.6 },
    { cx: 180,       baseY: H - 48, scale: 0.62, fill: '#3B2A1A', opacity: 0.65},
    { cx: 250,       baseY: H - 44, scale: 0.58, fill: '#22374F', opacity: 0.6 },
    { cx: 310,       baseY: H - 50, scale: 0.52, fill: '#4A3728', opacity: 0.55},
  ];

  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Background: cream */}
      <Rect width={W} height={H} fill={CREAM} />

      {/* Gold country blob silhouette */}
      <Path
        d={`
          M${W*0.25},${H*0.15}
          Q${W*0.28},${H*0.05} ${W*0.38},${H*0.08}
          Q${W*0.48},${H*0.02} ${W*0.58},${H*0.10}
          Q${W*0.70},${H*0.04} ${W*0.76},${H*0.18}
          Q${W*0.82},${H*0.30} ${W*0.72},${H*0.45}
          Q${W*0.65},${H*0.55} ${W*0.52},${H*0.52}
          Q${W*0.40},${H*0.58} ${W*0.30},${H*0.50}
          Q${W*0.18},${H*0.42} ${W*0.20},${H*0.28}
          Q${W*0.22},${H*0.18} ${W*0.25},${H*0.15} Z
        `}
        fill={GOLD}
        opacity={0.80}
      />

      {/* Person silhouettes */}
      {persons.map((p, idx) => {
        const s  = p.scale;
        const bY = p.baseY;
        const cx = p.cx;
        // Head radius
        const hr = 9 * s;
        // Body
        const bodyW = 18 * s;
        const bodyH = 28 * s;
        const bodyX = cx - bodyW / 2;
        const headY = bY - bodyH - hr * 2 - 2;
        const bodyY = bY - bodyH;
        return (
          <G key={idx} opacity={p.opacity}>
            {/* Head */}
            <Ellipse cx={cx} cy={headY + hr} rx={hr} ry={hr * 1.1} fill={p.fill} />
            {/* Body */}
            <Path
              d={`
                M${bodyX},${bodyY}
                Q${bodyX - 4 * s},${bodyY + bodyH * 0.5} ${bodyX - 2 * s},${bY}
                L${bodyX + bodyW + 2 * s},${bY}
                Q${bodyX + bodyW + 4 * s},${bodyY + bodyH * 0.5} ${bodyX + bodyW},${bodyY}
                Z
              `}
              fill={p.fill}
            />
          </G>
        );
      })}
    </Svg>
  );
}

// ── Eye icon ──────────────────────────────────────────────────────────────────
function EyeIcon({ open }) {
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24">
      {open ? (
        <>
          <Path
            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"
            fill="none" stroke="#666" strokeWidth={1.8} />
          <Circle cx={12} cy={12} r={3} fill="none" stroke="#666" strokeWidth={1.8} />
        </>
      ) : (
        <>
          <Path
            d="M17.94 17.94A10.94 10.94 0 0112 20C5 20 1 12 1 12a18.89 18.89 0 015.06-5.94M9.9 4.24A9.77 9.77 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
            fill="none" stroke="#666" strokeWidth={1.8} strokeLinecap="round" />
          <Line x1={1} y1={1} x2={23} y2={23} stroke="#666" strokeWidth={1.8} strokeLinecap="round" />
        </>
      )}
    </Svg>
  );
}

// ── Hamburger icon ────────────────────────────────────────────────────────────
function HamburgerIcon() {
  return (
    <Svg width={30} height={22} viewBox="0 0 24 18">
      <Line x1={0} y1={2}  x2={24} y2={2}  stroke={NAVY} strokeWidth={2.2} strokeLinecap="round" />
      <Line x1={0} y1={9}  x2={24} y2={9}  stroke={NAVY} strokeWidth={2.2} strokeLinecap="round" />
      <Line x1={0} y1={16} x2={24} y2={16} stroke={NAVY} strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}

// ── Google G SVG (real colors) ────────────────────────────────────────────────
function GoogleG() {
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24">
      <Path d="M21.8 12.2c0-.6-.1-1.2-.2-1.8H12v3.4h5.5c-.2 1.3-1 2.4-2 3.1v2.5h3.2c1.9-1.7 3-4.3 3-7.2z" fill="#4285F4" />
      <Path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.9v2.6C4.7 19.9 8.1 22 12 22z" fill="#34A853" />
      <Path d="M6.2 13.8A5.9 5.9 0 016 12c0-.6.1-1.2.2-1.8V7.6H2.9A10 10 0 002 12c0 1.6.4 3.1 1 4.4l3.2-2.6z" fill="#FBBC05" />
      <Path d="M12 6.7c1.5 0 2.8.5 3.9 1.5l2.9-2.9C17 3.7 14.7 2.7 12 2.7A10 10 0 002.9 7.6l3.3 2.6c.8-2.5 3.1-3.5 5.8-3.5z" fill="#EA4335" />
    </Svg>
  );
}

// ── Apple icon ────────────────────────────────────────────────────────────────
function AppleIcon() {
  return (
    <Svg width={20} height={25} viewBox="0 0 16 20">
      <Path
        d="M13.2 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3-2-3.7-2-1.6-.2-3 1-3.8 1-.8 0-2-.9-3.3-.9C2.9 4.9 1 6.2 0 8.2c-2 3.5-.5 8.7 1.4 11.5.9 1.4 2 2.9 3.4 2.9 1.4 0 1.9-.9 3.6-.9 1.7 0 2.1.9 3.5.9 1.5 0 2.4-1.4 3.3-2.8.5-.8 1-1.7 1.4-2.7-3.2-1.3-3.4-6-0-.5"
        fill="rgba(255,255,255,0.8)" />
      <Path
        d="M11 2.3C11.7 1.5 12.2.4 12 0c-1 .1-2.2.7-2.9 1.6C8.4 2.3 7.8 3.4 8 4.3c1.1.1 2.2-.5 3-2"
        fill="rgba(255,255,255,0.8)" />
    </Svg>
  );
}

// ── Main LoginScreen ──────────────────────────────────────────────────────────
export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [email,    setEmail]    = useState('admin@sknlp.campaign365.app');
  const [password, setPassword] = useState('password');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

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
      navigation.replace('SignInSuccess');
    } else {
      setError(result.error || 'Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={CREAM} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Top half (cream) ── */}
          <View style={styles.topHalf}>
            <SafeAreaView edges={['top']}>
              {/* Header row — title centered */}
              <View style={styles.topHeader}>
                <View style={styles.topLogoRow}>
                  <Image source={require('../../assets/logo.jpg')} style={styles.topLogoImg} resizeMode="contain" />
                  <Text style={styles.topTitle}>Campaign 365</Text>
                </View>
                <TouchableOpacity style={styles.menuBtn}>
                  <HamburgerIcon />
                </TouchableOpacity>
              </View>
            </SafeAreaView>

            {/* Hero illustration */}
            <HeroIllustration />
          </View>

          {/* ── Bottom card (navy) ── */}
          <View style={styles.bottomCard}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subText}>Sign in to start canvassing</Text>

            {/* Inputs — single white rounded container with divider */}
            <View style={styles.inputsWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="Email or Phone"
                placeholderTextColor="rgba(0,0,0,0.35)"
                value={email}
                onChangeText={t => { setEmail(t); setError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.inputDivider} />
              <View style={styles.passRow}>
                <TextInput
                  style={[styles.inputField, { flex: 1, borderWidth: 0, marginBottom: 0, borderRadius: 0 }]}
                  placeholder="Password"
                  placeholderTextColor="rgba(0,0,0,0.35)"
                  value={password}
                  onChangeText={t => { setPassword(t); setError(''); }}
                  secureTextEntry={!showPass}
                />
                <TouchableOpacity onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
                  <EyeIcon open={showPass} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Error */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotRow}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Log In button */}
            <TouchableOpacity
              style={[styles.loginBtn, loading && { opacity: 0.75 }]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color={NAVY} />
                : <Text style={styles.loginBtnText}>Log In</Text>
              }
            </TouchableOpacity>

            {/* OR divider */}
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>

            {/* Social buttons row */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.75}>
                <GoogleG />
                <Text style={styles.socialBtnText}>Continue with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.75}>
                <AppleIcon />
                <Text style={styles.socialBtnText}>Continue with Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Sign up link */}
            <View style={styles.signUpRow}>
              <Text style={styles.signUpGray}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scroll: {
    flexGrow: 1,
  },

  // Top half
  topHalf: {
    backgroundColor: CREAM,
    minHeight: height * 0.44,
  },
  // Header — title centered with absolute positioning
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    position: 'relative',
  },
  topLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topLogoImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  topTitle: {
    ...TYPE.appTitle,
    color: NAVY,
    textAlign: 'center',
  },
  menuBtn: {
    padding: 6,
    position: 'absolute',
    right: 24,
  },

  // Bottom card — more pronounced radius
  bottomCard: {
    backgroundColor: NAVY,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 48,
  },
  welcomeText: {
    ...TYPE.heading,
    color: WHITE,
    fontSize: 42,
    letterSpacing: -0.5,
  },
  subText: {
    ...TYPE.subtitle,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 6,
    marginBottom: 28,
  },

  // Separate box-style inputs
  inputsWrapper: {
    gap: 0,
  },
  inputField: {
    ...TYPE.input,
    color: '#333',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.10)',
    marginBottom: 12,
  },
  inputDivider: {
    height: 0,
  },
  passRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.10)',
    marginBottom: 0,
  },
  eyeBtn: {
    paddingHorizontal: 14,
    height: 56,
    justifyContent: 'center',
  },

  // Error
  errorText: {
    color: '#FF6B6B',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 2,
  },

  // Forgot — right aligned, gold
  forgotRow: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 4,
  },
  forgotText: {
    color: GOLD,
    fontSize: 18,
    fontWeight: '600',
  },

  // Login button — pill shape, bright gold, bold black text
  loginBtn: {
    backgroundColor: '#D4A017',
    borderRadius: 50,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.40,
    shadowRadius: 12,
    elevation: 6,
  },
  loginBtnText: {
    ...TYPE.button,
    color: '#000000',
    fontWeight: '800',
  },

  // OR divider with lines on both sides
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  orText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 16,
    fontWeight: '600',
  },

  // Social buttons
  socialRow: {
    flexDirection: 'row',
    gap: 10,
  },
  socialBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  socialBtnText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',
  },

  // Sign up
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  signUpGray: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 18,
  },
  signUpLink: {
    color: GOLD,
    fontSize: 18,
    fontWeight: '700',
  },
});
