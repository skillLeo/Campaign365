import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Ellipse, Rect, Circle, Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const RED = '#DC143C';

function CrowdSilhouette() {
  return (
    <Svg width={width} height={220} viewBox={`0 0 ${width} 220`}>
      {/* Red wave ground */}
      <Path d={`M0,120 Q${width*0.25},80 ${width*0.5},110 Q${width*0.75},140 ${width},100 L${width},220 L0,220 Z`}
        fill="rgba(180,10,30,0.6)" />
      <Path d={`M0,140 Q${width*0.3},100 ${width*0.6},130 Q${width*0.8},150 ${width},120 L${width},220 L0,220 Z`}
        fill="rgba(120,5,20,0.8)" />

      {/* Crowd figures */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = (i * (width / 17));
        const bodyH = 55 + (i % 3) * 12;
        const y = 130 - bodyH + (i % 4) * 8;
        return (
          <React.Fragment key={i}>
            <Ellipse cx={x} cy={y - 14} rx={9} ry={11} fill="rgba(20,0,5,0.9)" />
            <Rect x={x - 7} y={y - 4} width={14} height={bodyH} rx={4} fill="rgba(20,0,5,0.85)" />
            {i % 3 === 0 && (
              <Path d={`M${x},${y - 4} L${x - 16},${y + 20} L${x - 10},${y + 20}`} fill="rgba(20,0,5,0.8)" />
            )}
          </React.Fragment>
        );
      })}

      {/* Raised hands */}
      {[width*0.15, width*0.38, width*0.62, width*0.85].map((x, i) => (
        <Path key={i} d={`M${x},${100 + i*5} L${x - 5},${65 + i*3} L${x + 5},${65 + i*3}`}
          fill="rgba(20,0,5,0.9)" strokeLinecap="round" />
      ))}
    </Svg>
  );
}

export default function SplashScreen({ navigation }) {
  const spinAnim   = useRef(new Animated.Value(0)).current;
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const scaleAnim  = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4,   useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.timing(spinAnim, { toValue: 1, duration: 1200, useNativeDriver: true })
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const spin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0008" />

      {/* Dark red gradient bg */}
      <View style={styles.bgTop} />
      <View style={styles.bgMid} />

      {/* Logo + Title */}
      <Animated.View style={[styles.center, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {/* SKNLP Badge */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>🛡</Text>
            <Text style={styles.badgeText}>SKNLP</Text>
          </View>
          <View style={styles.badgeRight}>
            <Text style={styles.badgeRightLine1}>St. Kitts Nevis</Text>
            <Text style={styles.badgeRightLine2}>LABOUR PARTY</Text>
          </View>
        </View>

        <Text style={styles.title}>Campaign</Text>
        <Text style={styles.titleAccent}>365</Text>
      </Animated.View>

      {/* Crowd at bottom */}
      <View style={styles.crowd}>
        <CrowdSilhouette />
      </View>

      {/* Spinner */}
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={i} style={[styles.spinnerTick, {
            transform: [{ rotate: `${i * 30}deg` }, { translateY: -18 }],
            opacity: 1 - (i * 0.07),
          }]} />
        ))}
      </Animated.View>

      {/* Bottom tagline */}
      <Text style={styles.tagline}>Powering the Red Wave  •  Offline Ready</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0005',
    alignItems: 'center',
  },
  bgTop: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: height * 0.6,
    backgroundColor: '#2a0010',
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 40,
  },
  bgMid: {
    position: 'absolute',
    top: height * 0.3,
    left: 0, right: 0, bottom: 0,
    backgroundColor: '#1a0008',
  },
  center: {
    marginTop: height * 0.15,
    alignItems: 'center',
    zIndex: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeEmoji: { fontSize: 22 },
  badgeText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1,
  },
  badgeRight: { marginLeft: 4 },
  badgeRightLine1: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  badgeRightLine2: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1,
  },
  title: {
    color: 'white',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 52,
  },
  titleAccent: {
    color: '#D4A017',
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 68,
    marginTop: -6,
  },
  crowd: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  spinner: {
    position: 'absolute',
    bottom: 120,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerTick: {
    position: 'absolute',
    width: 3,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#D4A017',
  },
  tagline: {
    position: 'absolute',
    bottom: 52,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});
