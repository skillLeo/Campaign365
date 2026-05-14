import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
  StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Ellipse, Line, G, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const NAVY   = '#0A2540';
const GOLD   = '#C9A227';
const WHITE  = '#FFFFFF';
const CREAM  = '#F0EDE6';

// ── Decorative: node-graph constellation ─────────────────────────────────────
function ConstellationLeft() {
  // Nodes [x, y]
  const nodes = [
    { x: 30,  y: 50  },
    { x: 90,  y: 90  },
    { x: 50,  y: 160 },
    { x: 130, y: 140 },
    { x: 20,  y: 240 },
    { x: 100, y: 280 },
    { x: 145, y: 200 },
    { x: 60,  y: 330 },
  ];
  // Edges connecting pairs of nodes by index
  const edges = [
    [0, 1], [1, 2], [1, 3], [2, 4],
    [3, 6], [4, 5], [5, 7], [6, 5],
  ];
  return (
    <Svg width={200} height={500} style={styles.constLeft}>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={GOLD}
          strokeWidth={1}
          opacity={0.5}
        />
      ))}
      {nodes.map((n, i) => (
        <Circle key={i} cx={n.x} cy={n.y} r={4} fill={GOLD} opacity={0.55} />
      ))}
    </Svg>
  );
}

// ── Decorative: person silhouette (flat) ────────────────────────────────────
function PersonSilhouette() {
  return (
    <Svg width={100} height={250} style={styles.personRight} viewBox="0 0 80 200">
      {/* Head */}
      <Circle cx={40} cy={28} r={18} fill={GOLD} />
      {/* Body */}
      <Path
        d="M20,50 Q18,80 15,100 L65,100 Q62,80 60,50 Z"
        fill={GOLD}
      />
      {/* Arm holding phone — left arm */}
      <Path
        d="M20,60 Q5,80 8,100 L18,95 Q14,80 24,66 Z"
        fill={GOLD}
      />
      {/* Arm holding phone — right arm with phone */}
      <Path
        d="M60,60 Q74,70 70,90 L62,88 Q64,72 56,66 Z"
        fill={GOLD}
      />
      {/* Phone in right hand */}
      <Rect x={62} y={82} width={14} height={22} rx={2} fill={GOLD} />
      <Rect x={64} y={85} width={10} height={14} rx={1} fill={NAVY} opacity={0.4} />
      {/* Legs */}
      <Path d="M25,100 Q22,140 20,160 L34,160 Q34,135 36,100 Z" fill={GOLD} />
      <Path d="M55,100 Q58,140 60,160 L46,160 Q46,135 44,100 Z" fill={GOLD} />
      {/* Shoes */}
      <Ellipse cx={27} cy={163} rx={10} ry={5} fill={GOLD} />
      <Ellipse cx={53} cy={163} rx={10} ry={5} fill={GOLD} />
    </Svg>
  );
}

// ── Eye icon SVG ──────────────────────────────────────────────────────────────
function EyeIcon({ open }) {
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24">
      {open ? (
        <>
          <Path
            d="M1 12C1 12 5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"
            fill="none" stroke={WHITE} strokeWidth={1.8} />
          <Circle cx={12} cy={12} r={3} fill="none" stroke={WHITE} strokeWidth={1.8} />
        </>
      ) : (
        <>
          <Path
            d="M17.94 17.94A10.94 10.94 0 0112 20C5 20 1 12 1 12a18.89 18.89 0 015.06-5.94M9.9 4.24A9.77 9.77 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
            fill="none" stroke={WHITE} strokeWidth={1.8} strokeLinecap="round" />
          <Path d="M1 1l22 22" stroke={WHITE} strokeWidth={1.8} strokeLinecap="round" />
        </>
      )}
    </Svg>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function SignUpScreen({ navigation }) {
  const [fullName,    setFullName]    = useState('');
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* ── Header bar ── */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>C</Text>
          </View>
          <Text style={styles.headerTitle}>Campaign 365</Text>
        </View>
        <View style={styles.canvasserBadge}>
          <Text style={styles.canvasserBadgeText}>Canvasser</Text>
        </View>
      </View>

      {/* ── Decorative elements behind scroll content ── */}
      <ConstellationLeft />
      <PersonSilhouette />

      {/* ── Main white card ── */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Join the Campaign</Text>
            <Text style={styles.cardSub}>Create your Canvasser account</Text>

            {/* Full Name */}
            <View style={[styles.inputContainer, { marginBottom: 12 }]}>
              <TextInput
                style={styles.textInput}
                placeholder="Full Name"
                placeholderTextColor="rgba(255,255,255,0.45)"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            {/* Phone Number */}
            <View style={[styles.inputContainer, { paddingHorizontal: 12, paddingVertical: 12, marginBottom: 12 }]}>
              <Text style={styles.phoneLabel}>Phone Number</Text>
              <View style={styles.phoneRow}>
                <TouchableOpacity style={styles.phonePill} activeOpacity={0.7}>
                  <Text style={styles.phonePillText}>+44  ∨</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.phonePill, { width: 90, marginLeft: 8 }]} activeOpacity={0.7}>
                  <Text style={styles.phonePillText}>+1-876  ∨</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Email */}
            <View style={[styles.inputContainer, { marginBottom: 12 }]}>
              <TextInput
                style={styles.textInput}
                placeholder="Email Address"
                placeholderTextColor="rgba(255,255,255,0.45)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center', marginBottom: 8 }]}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.45)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(v => !v)} style={{ padding: 10 }}>
                <EyeIcon open={showPass} />
              </TouchableOpacity>
            </View>

            {/* CTA */}
            <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.85}>
              <Text style={styles.ctaBtnText}>Create Account</Text>
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.termsText}>
              By signing up you agree to our{' '}
              <Text style={styles.termsLink} onPress={() => {}}>Terms and Privacy Policy</Text>
            </Text>

            {/* Already have account */}
            <View style={styles.loginRow}>
              <Text style={styles.loginGray}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Log In</Text>
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

  // Header bar
  headerBar: {
    height: 60,
    backgroundColor: NAVY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 32, height: 32, borderRadius: 12,
    backgroundColor: 'rgba(201,162,39,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  logoLetter: {
    color: GOLD,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  headerTitle: {
    color: WHITE,
    fontSize: 21,
    fontWeight: '700',
    marginLeft: 8,
  },
  canvasserBadge: {
    backgroundColor: GOLD,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  canvasserBadgeText: {
    color: NAVY,
    fontSize: 16,
    fontWeight: '700',
  },

  // Decorative overlays
  constLeft: {
    position: 'absolute',
    left: -20,
    top: 80,
    zIndex: 0,
  },
  personRight: {
    position: 'absolute',
    right: 0,
    top: 150,
    zIndex: 0,
    opacity: 0.85,
  },

  // Scroll
  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },

  // White card
  card: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    zIndex: 10,
  },
  cardHeading: {
    color: NAVY,
    fontSize: 35,
    fontWeight: '800',
    marginBottom: 4,
  },
  cardSub: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 19,
    marginBottom: 28,
  },

  // Input container (navy)
  inputContainer: {
    backgroundColor: NAVY,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textInput: {
    color: WHITE,
    fontSize: 19,
    height: 56,
  },

  // Phone picker section
  phoneLabel: {
    color: WHITE,
    fontSize: 16,
    marginBottom: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phonePill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phonePillText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  // CTA
  ctaBtn: {
    backgroundColor: GOLD,
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaBtnText: {
    color: NAVY,
    fontSize: 21,
    fontWeight: '700',
  },

  // Footer
  termsText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
  },
  termsLink: {
    color: GOLD,
    fontWeight: '600',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  loginGray: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 18,
  },
  loginLink: {
    color: GOLD,
    fontSize: 18,
    fontWeight: '700',
  },
});
