import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Line, G } from 'react-native-svg';
import { trackingAPI } from '../../services/api';

const { width, height } = Dimensions.get('window');

const NAVY = '#0A2540';
const GOLD = '#C9A227';

// ─── Back arrow ───────────────────────────────────────────────────────────────

function BackArrow() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path d="M20,11H7.83l5.59-5.59L12,4l-8,8l8,8l1.41-1.41L7.83,13H20V11Z" fill="white" />
    </Svg>
  );
}

// ─── External link icon ───────────────────────────────────────────────────────

function ExternalLinkIcon() {
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24">
      <Path
        d="M19,19H5V5h7V3H5C3.89,3 3,3.9 3,5V19c0,1.1 0.89,2 2,2h14c1.1,0 2-0.9 2-2v-7h-2V19Z"
        fill="white"
      />
      <Path d="M14,3v2h3.59l-9.83,9.83l1.41,1.41L19,6.41V10h2V3H14Z" fill="white" />
    </Svg>
  );
}

// ─── Siren / alarm SVG icon ───────────────────────────────────────────────────

function SirenIcon({ size = 52 }) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 52 52">
      {/* Bell body */}
      <Path
        d="M26,6 C18.27,6 12,12.27 12,20 L12,34 L8,38 L8,40 L44,40 L44,38 L40,34 L40,20 C40,12.27 33.73,6 26,6 Z"
        fill="white"
      />
      {/* Clapper */}
      <Path d="M22,40 C22,42.21 23.79,44 26,44 C28.21,44 30,42.21 30,40 Z" fill="white" />
      {/* Left ray */}
      <Line x1={8} y1={16} x2={3} y2={11} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={6} y1={22} x2={0} y2={20} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
      {/* Right ray */}
      <Line x1={44} y1={16} x2={49} y2={11} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={46} y1={22} x2={52} y2={20} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
      {/* Top ray */}
      <Line x1={26} y1={2} x2={26} y2={-3} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Panic button with concentric glow rings ──────────────────────────────────

function PanicButtonCore({ pulseAnim, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <Animated.View style={[styles.panicOuter, { transform: [{ scale: pulseAnim }] }]}>
        {/* Concentric glow rings */}
        <View style={[styles.glowRing, { width: 280, height: 280, borderRadius: 140, backgroundColor: 'rgba(255,69,0,0.08)' }]} />
        <View style={[styles.glowRing, { width: 248, height: 248, borderRadius: 124, backgroundColor: 'rgba(255,69,0,0.14)' }]} />
        <View style={[styles.glowRing, { width: 216, height: 216, borderRadius: 108, backgroundColor: 'rgba(255,69,0,0.22)' }]} />
        <View style={[styles.glowRing, { width: 184, height: 184, borderRadius: 92, backgroundColor: 'rgba(255,69,0,0.33)' }]} />
        {/* Solid inner button */}
        <View style={styles.panicInner}>
          <SirenIcon size={52} />
          <Text style={styles.panicLabel}>PANIC</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── PanicScreen ──────────────────────────────────────────────────────────────

export default function PanicScreen({ navigation }) {
  const [countdown, setCountdown] = useState(60);
  const [alertFired, setAlertFired] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulsing scale animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 750, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1.0,  duration: 750, useNativeDriver: true }),
      ])
    ).start();

    // Countdown
    const interval = setInterval(() => {
      setCountdown(v => {
        if (v <= 1) {
          clearInterval(interval);
          if (!alertFired) {
            setAlertFired(true);
            trackingAPI.panic(17.3026, -62.7177)
              .then(() => console.log('[PanicScreen] Alert fired.'))
              .catch(() => console.log('[PanicScreen] Alert fired (offline).'));
          }
          return 0;
        }
        return v - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>

        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <BackArrow />
          </TouchableOpacity>

          <Text style={styles.topTitle}>Campaign 365</Text>

          <TouchableOpacity style={styles.extLinkBtn}>
            <ExternalLinkIcon />
          </TouchableOpacity>
        </View>

        {/* Color chip pills */}
        <View style={styles.chipRow}>
          <View style={styles.chipNavy}>
            <Text style={styles.chipNavyTxt}>#0A2540</Text>
          </View>
          <View style={styles.chipGold}>
            <Text style={styles.chipGoldTxt}>#C9A227</Text>
          </View>
        </View>

        {/* ── Center panic button ── */}
        <View style={styles.centerArea}>
          <PanicButtonCore pulseAnim={pulseAnim} onPress={() => {}} />
        </View>

        {/* Status text */}
        <Text style={styles.alertTitle}>Emergency Alert Activated</Text>
        <Text style={styles.alertSub}>
          {'Live Location Shared with:\nCampaign Manager, Cluster Manager,\nEmergency Contact'}
        </Text>

        {/* Countdown */}
        <Text style={styles.countdownNum}>{countdown}</Text>
        <Text style={styles.countdownSub}>seconds until full alert</Text>

        {/* Action buttons */}
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.cancelTxt}>False Alarm - Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.8}>
            <Text style={styles.outlineTxt}>🎤  Add Voice Note</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.8}>
            <Text style={styles.outlineTxt}>Share Live Location Now</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 10,
  },
  backBtn: { padding: 4 },
  topTitle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 20,
  },
  extLinkBtn: { padding: 4 },

  // Chip pills
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  chipNavy: {
    backgroundColor: '#142e50',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  chipNavyTxt: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  chipGold: {
    backgroundColor: GOLD,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  chipGoldTxt: {
    color: NAVY,
    fontSize: 14,
    fontWeight: '700',
  },

  // Panic button area
  centerArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  panicOuter: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
  },
  panicInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FF4500',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 24,
    elevation: 12,
  },
  panicLabel: {
    color: 'white',
    fontWeight: '900',
    fontSize: 28,
    letterSpacing: 2,
  },

  // Status text
  alertTitle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 8,
  },
  alertSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 12,
  },
  countdownNum: {
    color: 'white',
    fontWeight: '900',
    fontSize: 90,
    textAlign: 'center',
    lineHeight: 95,
  },
  countdownSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

  // Buttons
  btnGroup: {
    gap: 12,
    paddingBottom: 8,
  },
  cancelBtn: {
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  cancelTxt: {
    color: NAVY,
    fontWeight: '900',
    fontSize: 20,
  },
  outlineBtn: {
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'transparent',
  },
  outlineTxt: {
    color: 'white',
    fontWeight: '700',
    fontSize: 19,
  },
});
