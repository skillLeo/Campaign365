import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Line, G } from 'react-native-svg';
import { trackingAPI } from '../../services/api';

const { width, height } = Dimensions.get('window');
const RED  = '#DC143C';
const GOLD = '#C8860B';

function IslandMap() {
  const mw = width - 48;
  const mh = 160;
  return (
    <Svg width={mw} height={mh} viewBox={`0 0 ${mw} ${mh}`}>
      <Rect width={mw} height={mh} rx={12} fill="#1a0505" />
      {/* grid */}
      {[32,64,96,128].map(y => (
        <Line key={y} x1={0} y1={y} x2={mw} y2={y} stroke="rgba(255,0,0,0.07)" strokeWidth={1} />
      ))}
      {[50,100,150,200,250,300].map(x => (
        <Line key={x} x1={x} y1={0} x2={x} y2={mh} stroke="rgba(255,0,0,0.07)" strokeWidth={1} />
      ))}

      {/* St Kitts island shape */}
      <Path
        d={`M${mw*0.08},${mh*0.55} L${mw*0.14},${mh*0.38} L${mw*0.22},${mh*0.28} L${mw*0.34},${mh*0.22} L${mw*0.46},${mh*0.20} L${mw*0.54},${mh*0.26} L${mw*0.58},${mh*0.38} L${mw*0.56},${mh*0.52} L${mw*0.50},${mh*0.62} L${mw*0.42},${mh*0.70} L${mw*0.30},${mh*0.72} L${mw*0.18},${mh*0.68} Z`}
        fill="rgba(180,20,20,0.45)" stroke={RED} strokeWidth={1.5}
      />

      {/* Nevis island */}
      <Path
        d={`M${mw*0.70},${mh*0.45} L${mw*0.75},${mh*0.36} L${mw*0.83},${mh*0.38} L${mw*0.87},${mh*0.50} L${mw*0.83},${mh*0.62} L${mw*0.73},${mh*0.63} Z`}
        fill="rgba(180,20,20,0.35)" stroke={RED} strokeWidth={1.5}
      />

      {/* Red pins on St Kitts */}
      {[
        { x: mw*0.28, y: mh*0.38 },
        { x: mw*0.40, y: mh*0.32 },
        { x: mw*0.34, y: mh*0.52 },
        { x: mw*0.78, y: mh*0.50 },
      ].map((p, i) => (
        <G key={i}>
          <Circle cx={p.x} cy={p.y} r={i === 3 ? 9 : 11} fill={RED} opacity={0.9} />
          <Circle cx={p.x} cy={p.y} r={i === 3 ? 3.5 : 4.5} fill="white" />
        </G>
      ))}
    </Svg>
  );
}

export default function PanicScreen({ navigation }) {
  const [countdown, setCountdown] = useState(10);
  const [cancelled, setCancelled] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const pulseAnim   = useRef(new Animated.Value(1)).current;
  const glowAnim    = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 700, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 700, useNativeDriver: false }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.97, duration: 600, useNativeDriver: true }),
      ])
    ).start();

    Animated.timing(progressAnim, { toValue: 1, duration: 10000, useNativeDriver: false }).start();

    const interval = setInterval(() => {
      setCountdown(v => {
        if (v <= 1) {
          clearInterval(interval);
          // Auto-trigger panic when countdown hits 0
          trackingAPI.panic(17.3026, -62.7177).then(() => setAlertSent(true)).catch(() => setAlertSent(true));
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const bgColor = glowAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: ['rgba(55,0,0,1)', 'rgba(90,5,5,1)'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle="light-content" />

      {/* Horizontal grid lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <View key={i} style={[styles.gridLine, { top: i * (height / 12) }]} />
      ))}

      <SafeAreaView style={styles.safeArea}>

        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.topName}>John Doe</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuBtn}>
            <Text style={styles.menuIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Shield + pins */}
        <View style={styles.shieldWrap}>
          <Text style={styles.shieldEmoji}>🛡</Text>
          <View style={styles.pinsRow}>
            {['📍','📍','📍'].map((p, i) => (
              <Text key={i} style={[styles.pinEmoji, { marginTop: i === 1 ? -10 : 0 }]}>{p}</Text>
            ))}
          </View>
        </View>

        {/* PANIC TEXT */}
        <Animated.Text style={[styles.panicText, { transform: [{ scale: pulseAnim }] }]}>
          PANIC{'\n'}BUTTON{'\n'}ACTIVATED
        </Animated.Text>

        <Text style={styles.location}>Basseterre, St. Kitts</Text>
        <View style={styles.liveGpsRow}>
          <View style={styles.gpsDot} />
          <Text style={styles.liveGpsTxt}>Live GPS</Text>
        </View>

        {/* Alert card */}
        <View style={styles.alertCard}>
          {/* Countdown row */}
          <View style={styles.alertTopRow}>
            <Text style={styles.alertMsg}>Alert sent to HQ &amp; Emergency{'\n'}Contacts in</Text>
            <Text style={styles.countdown}>{countdown}s</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, {
              width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['100%', '0%'] }),
            }]} />
          </View>

          {/* Island map */}
          <View style={styles.mapWrap}>
            <IslandMap />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => { setCancelled(true); navigation.goBack(); }}
          >
            <Text style={styles.cancelTxt}>False Alarm — Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={styles.callTxt}>Call Authorities</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1 },
  gridLine: {
    position: 'absolute', left: 0, right: 0, height: 1,
    backgroundColor: 'rgba(255,0,0,0.07)',
  },
  safeArea: { flex: 1, paddingHorizontal: 24 },

  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 6, paddingBottom: 4,
  },
  topName:  { color: 'rgba(255,255,255,0.85)', fontSize: 16, fontWeight: '700' },
  menuBtn:  { padding: 6 },
  menuIcon: { color: 'rgba(255,255,255,0.7)', fontSize: 20, fontWeight: '600' },

  shieldWrap: { alignItems: 'center', marginTop: 4, marginBottom: 2 },
  shieldEmoji: { fontSize: 44 },
  pinsRow:  { flexDirection: 'row', gap: 10, marginTop: -4 },
  pinEmoji: { fontSize: 18 },

  panicText: {
    color: RED, fontSize: 58, fontWeight: '900', textAlign: 'center',
    lineHeight: 60, letterSpacing: 3,
    textShadowColor: RED, textShadowRadius: 24, textShadowOffset: { width: 0, height: 0 },
    marginBottom: 10,
  },
  location: {
    color: 'white', fontSize: 17, fontWeight: '700', textAlign: 'center',
  },
  liveGpsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    justifyContent: 'center', marginTop: 4, marginBottom: 12,
  },
  gpsDot:    { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  liveGpsTxt: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '600' },

  alertCard: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: 'rgba(220,20,60,0.25)',
    marginBottom: 16, gap: 12,
  },
  alertTopRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  alertMsg: {
    color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600', lineHeight: 20, flex: 1,
  },
  countdown: {
    color: 'white', fontSize: 36, fontWeight: '900', marginLeft: 12,
  },
  progressBar: {
    height: 6, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 3, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', backgroundColor: RED, borderRadius: 3,
  },
  mapWrap: { borderRadius: 12, overflow: 'hidden' },

  btnGroup:  { gap: 12 },
  cancelBtn: {
    backgroundColor: RED, borderRadius: 14, paddingVertical: 17, alignItems: 'center',
    shadowColor: RED, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55, shadowRadius: 14,
  },
  cancelTxt: { color: 'white', fontWeight: '900', fontSize: 16 },
  callBtn: {
    backgroundColor: GOLD, borderRadius: 14, paddingVertical: 17, alignItems: 'center',
    shadowColor: GOLD, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10,
  },
  callTxt: { color: 'white', fontWeight: '900', fontSize: 16 },
});
