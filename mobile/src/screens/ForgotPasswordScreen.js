import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Rect, Circle, Path, Line, G, Defs, LinearGradient, Stop,
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const NAVY      = '#0A2540';
const GOLD      = '#C9A227';
const GOLD_DARK = '#8B6914';
const WHITE     = '#FFFFFF';

// ── Full-screen gradient background using SVG ─────────────────────────────────
function GradientBackground() {
  return (
    <Svg
      width={width}
      height={height}
      style={StyleSheet.absoluteFillObject}
    >
      <Defs>
        <LinearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0"   stopColor={NAVY}      stopOpacity="1" />
          <Stop offset="0.5" stopColor="#0D3060"   stopOpacity="1" />
          <Stop offset="1"   stopColor={GOLD_DARK} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect width={width} height={height} fill="url(#bgGrad)" />
    </Svg>
  );
}

// ── Decorative scattered icons ────────────────────────────────────────────────
// Key SVG at position (cx, cy) with rotation
function KeyIcon({ cx, cy, rotate, size = 1 }) {
  const s = size;
  return (
    <G transform={`translate(${cx},${cy}) rotate(${rotate})`} opacity={0.25}>
      {/* Key ring */}
      <Circle cx={0} cy={0} r={10 * s} fill="none" stroke={GOLD} strokeWidth={2 * s} />
      {/* Key shaft */}
      <Line x1={8 * s} y1={0} x2={28 * s} y2={0} stroke={GOLD} strokeWidth={2 * s} strokeLinecap="round" />
      {/* Teeth */}
      <Line x1={18 * s} y1={0} x2={18 * s} y2={6 * s} stroke={GOLD} strokeWidth={2 * s} strokeLinecap="round" />
      <Line x1={24 * s} y1={0} x2={24 * s} y2={5 * s} stroke={GOLD} strokeWidth={2 * s} strokeLinecap="round" />
    </G>
  );
}

// Envelope SVG at position (cx, cy) with rotation
function EnvelopeIcon({ cx, cy, rotate, size = 1 }) {
  const s = size;
  const w = 36 * s;
  const h = 24 * s;
  const x = -w / 2;
  const y = -h / 2;
  return (
    <G transform={`translate(${cx},${cy}) rotate(${rotate})`} opacity={0.25}>
      {/* Envelope body */}
      <Rect x={x} y={y} width={w} height={h} rx={3 * s}
        fill="none" stroke={GOLD} strokeWidth={2 * s} />
      {/* V-fold flap */}
      <Path
        d={`M${x},${y} L${cx + x + w / 2 - cx},${y + h * 0.55} L${x + w},${y}`}
        fill="none" stroke={GOLD} strokeWidth={2 * s} strokeLinejoin="round"
      />
    </G>
  );
}

// Abstract country blob lines
function MapBlob() {
  return (
    <G opacity={0.18}>
      <Path
        d={`
          M${width * 0.55},${height * 0.75}
          Q${width * 0.58},${height * 0.65} ${width * 0.70},${height * 0.62}
          Q${width * 0.82},${height * 0.58} ${width * 0.85},${height * 0.70}
          Q${width * 0.88},${height * 0.82} ${width * 0.78},${height * 0.88}
          Q${width * 0.65},${height * 0.92} ${width * 0.55},${height * 0.85}
          Q${width * 0.48},${height * 0.80} ${width * 0.55},${height * 0.75} Z
        `}
        fill="none"
        stroke={GOLD}
        strokeWidth={1.5}
      />
    </G>
  );
}

function DecorativeIcons() {
  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {/* Keys */}
      <KeyIcon cx={40}           cy={130}          rotate={-30} size={1.1}  />
      <KeyIcon cx={width - 55}   cy={90}           rotate={45}  size={0.85} />
      <KeyIcon cx={width * 0.35} cy={height * 0.2} rotate={70}  size={0.7}  />
      <KeyIcon cx={25}           cy={height * 0.7} rotate={110} size={0.9}  />
      <KeyIcon cx={width - 30}   cy={height * 0.6} rotate={-60} size={0.75} />

      {/* Envelopes */}
      <EnvelopeIcon cx={width * 0.7}  cy={height * 0.12} rotate={15}   size={1.0}  />
      <EnvelopeIcon cx={55}           cy={height * 0.45}  rotate={-20}  size={0.8}  />
      <EnvelopeIcon cx={width - 40}   cy={height * 0.35}  rotate={-10}  size={0.85} />
      <EnvelopeIcon cx={width * 0.45} cy={height * 0.82}  rotate={25}   size={0.7}  />

      {/* Map blob */}
      <MapBlob />
    </Svg>
  );
}

// ── Gold padlock SVG ──────────────────────────────────────────────────────────
function LockIcon() {
  return (
    <Svg width={112} height={112} viewBox="0 0 90 90">
      {/* Arch (shackle) */}
      <Path
        d="M25,42 L25,28 A20,20 0 0,1 65,28 L65,42"
        fill="none"
        stroke={GOLD}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Body */}
      <Rect x={12} y={42} width={66} height={42} rx={10} ry={10} fill={GOLD} />
      {/* Keyhole circle */}
      <Circle cx={45} cy={61} r={8} fill={NAVY} />
      {/* Keyhole slot */}
      <Rect x={41} y={65} width={8} height={10} rx={2} fill={NAVY} />
    </Svg>
  );
}

// ── Back arrow ────────────────────────────────────────────────────────────────
function BackArrow() {
  return (
    <Svg width={30} height={30} viewBox="0 0 24 24">
      <Path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke={WHITE}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function ForgotPasswordScreen({ navigation }) {
  const [contact,  setContact]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [sent,     setSent]     = useState(false);

  const handleSend = async () => {
    if (!contact.trim()) return;
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Background gradient */}
      <GradientBackground />

      {/* Decorative icons */}
      <DecorativeIcons />

      {/* ── Header ── */}
      <SafeAreaView edges={['top']} style={styles.safeHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <BackArrow />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reset Password</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      {/* ── Content (centered) ── */}
      <View style={styles.centerContainer}>
        <View style={styles.card}>

          {/* Padlock icon */}
          <View style={styles.lockWrap}>
            <LockIcon />
          </View>

          {/* Heading */}
          <Text style={styles.cardHeading}>
            No worries! We'll send you a reset link.
          </Text>

          {/* Input label */}
          <Text style={styles.inputLabel}>Email or Phone Number</Text>

          {/* Input */}
          <View style={[styles.inputWrap, sent && styles.inputWrapSuccess]}>
            <TextInput
              style={styles.inputField}
              placeholder="Email or Phone Number"
              placeholderTextColor="rgba(0,0,0,0.35)"
              value={contact}
              onChangeText={setContact}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!sent}
            />
          </View>

          {/* Success message */}
          {sent && (
            <Text style={styles.successText}>
              Reset link sent! Check your email or SMS.
            </Text>
          )}

          {/* Send button */}
          {!sent ? (
            <TouchableOpacity
              style={[styles.sendBtn, loading && { opacity: 0.75 }]}
              onPress={handleSend}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color={NAVY} />
                : <Text style={styles.sendBtnText}>Send Reset Link</Text>
              }
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.85}
            >
              <Text style={styles.sendBtnText}>Back to Log In</Text>
            </TouchableOpacity>
          )}

          {/* Back to login */}
          {!sent && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backToLoginBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.backToLoginText}>→ Back to Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
  },

  // Header
  safeHeader: {
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Centered card container
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
    paddingBottom: 40,
  },

  // White card
  card: {
    backgroundColor: WHITE,
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },

  // Lock
  lockWrap: {
    alignItems: 'center',
    marginBottom: 4,
  },

  // Heading
  cardHeading: {
    color: NAVY,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 38,
  },

  // Input label
  inputLabel: {
    color: NAVY,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },

  // Input
  inputWrap: {
    borderWidth: 1.5,
    borderColor: GOLD,
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: WHITE,
  },
  inputWrapSuccess: {
    borderColor: '#34C759',
  },
  inputField: {
    color: NAVY,
    fontSize: 19,
    height: 54,
  },

  // Success
  successText: {
    color: '#34C759',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },

  // Send button
  sendBtn: {
    backgroundColor: GOLD,
    borderRadius: 12,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  sendBtnText: {
    color: NAVY,
    fontSize: 20,
    fontWeight: '700',
  },

  // Back to login
  backToLoginBtn: {
    alignItems: 'center',
    marginTop: 16,
  },
  backToLoginText: {
    color: NAVY,
    fontSize: 18,
    opacity: 0.6,
  },
});
