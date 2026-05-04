import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const RED = '#DC143C';
const DARK = '#080E1C';
const DARKER = '#050A12';

export default function WelcomeScreen({ navigation }) {
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(40)).current;
  const scaleAnim  = useRef(new Animated.Value(0.85)).current;
  const btnAnim    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 5,   useNativeDriver: true }),
      ]),
      Animated.timing(btnAnim, { toValue: 1, duration: 500, delay: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={DARKER} />

      {/* Background decorative circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />

      {/* Red top stripe */}
      <View style={styles.topStripe} />

      {/* Main content */}
      <View style={styles.content}>

        {/* Logo mark */}
        <Animated.View style={[styles.logoWrap, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.logoRing}>
            <View style={styles.logoInner}>
              <Text style={styles.logoNumber}>365</Text>
            </View>
          </View>
          {/* Flag stripe bar under logo */}
          <View style={styles.flagBar}>
            <View style={[styles.flagStripe, { backgroundColor: '#009E60' }]} />
            <View style={[styles.flagStripe, { backgroundColor: '#FCD116' }]} />
            <View style={[styles.flagStripe, { backgroundColor: '#DC143C' }]} />
          </View>
        </Animated.View>

        {/* Title block */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.brand}>CAMPAIGN</Text>
          <Text style={styles.brandAccent}>365</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>
            The complete political campaign{'\n'}management platform
          </Text>
        </Animated.View>

        {/* Feature pills */}
        <Animated.View style={[styles.pillRow, { opacity: fadeAnim }]}>
          {['📍 GPS Tracking', '🗺️ Canvassing', '🏃 Runners', '🚨 Panic Alert'].map((p, i) => (
            <View key={i} style={styles.pill}>
              <Text style={styles.pillText}>{p}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      {/* Bottom CTA */}
      <Animated.View style={[styles.bottom, { opacity: btnAnim }]}>
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaBtnText}>Get Started →</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Campaign 365 · Powered by SKNLP</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DARKER,
  },
  topStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: RED,
  },
  bgCircle1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(220,20,60,0.06)',
    top: -80,
    right: -80,
  },
  bgCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(220,20,60,0.04)',
    bottom: 120,
    left: -60,
  },
  bgCircle3: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: 'rgba(220,20,60,0.12)',
    top: height * 0.35,
    right: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: RED,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(220,20,60,0.08)',
    shadowColor: RED,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logoInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoNumber: {
    color: 'white',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -1,
  },
  flagBar: {
    flexDirection: 'row',
    marginTop: 14,
    borderRadius: 3,
    overflow: 'hidden',
    width: 60,
    height: 5,
  },
  flagStripe: {
    flex: 1,
  },
  brand: {
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 6,
    lineHeight: 44,
  },
  brandAccent: {
    color: RED,
    fontSize: 52,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -2,
    lineHeight: 56,
    marginTop: -4,
  },
  divider: {
    height: 2,
    backgroundColor: RED,
    width: 40,
    alignSelf: 'center',
    marginVertical: 16,
    borderRadius: 1,
  },
  tagline: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    margin: 3,
  },
  pillText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
  bottom: {
    paddingHorizontal: 28,
    paddingBottom: 32,
    alignItems: 'center',
  },
  ctaBtn: {
    width: '100%',
    backgroundColor: RED,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: RED,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
  ctaBtnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  version: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 11,
    marginTop: 16,
    letterSpacing: 0.3,
  },
});
