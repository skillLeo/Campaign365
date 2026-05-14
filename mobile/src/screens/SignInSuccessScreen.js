import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated, Dimensions, StatusBar,
} from 'react-native';
import Svg, { Path, Rect, Circle, Line, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const NAVY  = '#0A2540';
const GOLD  = '#C9A227';
const WHITE = '#FFFFFF';

// ─── Faint city-grid SVG background ─────────────────────────────────────────

function CityGridBg() {
  const cols = Math.ceil(width / 40) + 1;
  const rows = Math.ceil(height / 40) + 1;
  const verticals   = Array.from({ length: cols }, (_, i) => i * 40);
  const horizontals = Array.from({ length: rows }, (_, i) => i * 40);

  // Block-offset intersections to make it look like a real city grid
  const offsetH = [80, 160, 240, 320, 400, 480, 560, 640];
  const blockW  = [60, 80, 100, 120, 80, 60, 100];

  return (
    <Svg
      width={width}
      height={height}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      {/* Main vertical streets */}
      {verticals.map(x => (
        <Line
          key={`v${x}`}
          x1={x} y1={0} x2={x} y2={height}
          stroke={WHITE}
          strokeWidth={1}
          opacity={0.06}
        />
      ))}
      {/* Main horizontal streets */}
      {horizontals.map(y => (
        <Line
          key={`h${y}`}
          x1={0} y1={y} x2={width} y2={y}
          stroke={WHITE}
          strokeWidth={1}
          opacity={0.06}
        />
      ))}
      {/* City blocks — extra thicker roads at intervals */}
      {[80, 200, 320, 440, 560].map(x => (
        <Line
          key={`vb${x}`}
          x1={x} y1={0} x2={x} y2={height}
          stroke={WHITE}
          strokeWidth={2}
          opacity={0.045}
        />
      ))}
      {[100, 220, 360, 480, 620].map(y => (
        <Line
          key={`hb${y}`}
          x1={0} y1={y} x2={width} y2={y}
          stroke={WHITE}
          strokeWidth={2}
          opacity={0.045}
        />
      ))}
    </Svg>
  );
}

// ─── Large gold checkmark-in-circle SVG ──────────────────────────────────────

function CheckmarkIcon() {
  return (
    <Svg width={150} height={150} viewBox="0 0 120 120">
      <Circle
        cx={60}
        cy={60}
        r={52}
        stroke={GOLD}
        strokeWidth={6}
        fill="none"
      />
      <Path
        d="M28,60 L48,80 L88,38"
        stroke={GOLD}
        strokeWidth={7}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Custom 12-dash rotating spinner ─────────────────────────────────────────

function GoldSpinner({ spinAnim }) {
  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[spinnerStyles.wrap, { transform: [{ rotate }] }]}>
      {Array.from({ length: 12 }).map((_, i) => (
        <View
          key={i}
          style={[
            spinnerStyles.dash,
            {
              transform: [
                { rotate: `${i * 30}deg` },
                { translateY: -20 },
              ],
              opacity: 1 - i * 0.065,
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}

const spinnerStyles = StyleSheet.create({
  wrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dash: {
    position: 'absolute',
    width: 3,
    height: 9,
    borderRadius: 2,
    backgroundColor: GOLD,
  },
});

// ─── Gold sparkle particles ───────────────────────────────────────────────────

const PARTICLE_DATA = [
  { x: '8%',  y: '4%',  size: 5, opacity: 0.7  },
  { x: '18%', y: '8%',  size: 4, opacity: 0.5  },
  { x: '32%', y: '2%',  size: 6, opacity: 0.9  },
  { x: '45%', y: '6%',  size: 4, opacity: 0.6  },
  { x: '58%', y: '3%',  size: 7, opacity: 1.0  },
  { x: '70%', y: '9%',  size: 5, opacity: 0.7  },
  { x: '82%', y: '5%',  size: 4, opacity: 0.55 },
  { x: '91%', y: '12%', size: 6, opacity: 0.8  },
  { x: '5%',  y: '18%', size: 4, opacity: 0.6  },
  { x: '14%', y: '22%', size: 7, opacity: 0.9  },
  { x: '26%', y: '15%', size: 5, opacity: 0.5  },
  { x: '37%', y: '20%', size: 4, opacity: 0.7  },
  { x: '52%', y: '14%', size: 8, opacity: 1.0  },
  { x: '63%', y: '19%', size: 5, opacity: 0.6  },
  { x: '76%', y: '16%', size: 4, opacity: 0.75 },
  { x: '88%', y: '23%', size: 6, opacity: 0.85 },
  { x: '3%',  y: '30%', size: 5, opacity: 0.5  },
  { x: '20%', y: '35%', size: 4, opacity: 0.65 },
  { x: '33%', y: '28%', size: 7, opacity: 0.9  },
  { x: '48%', y: '32%', size: 5, opacity: 0.7  },
  { x: '61%', y: '27%', size: 4, opacity: 0.55 },
  { x: '74%', y: '33%', size: 6, opacity: 0.8  },
  { x: '85%', y: '29%', size: 5, opacity: 0.65 },
  { x: '94%', y: '36%', size: 4, opacity: 0.4  },
  { x: '10%', y: '42%', size: 6, opacity: 0.7  },
  { x: '22%', y: '48%', size: 4, opacity: 0.5  },
  { x: '40%', y: '44%', size: 5, opacity: 0.85 },
  { x: '55%', y: '50%', size: 4, opacity: 0.6  },
  { x: '68%', y: '45%', size: 7, opacity: 0.9  },
  { x: '80%', y: '52%', size: 5, opacity: 0.7  },
];

function SparkleParticles() {
  const anims = useRef(
    PARTICLE_DATA.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    const animations = anims.map((anim, i) =>
      Animated.sequence([
        Animated.delay(i * 80),
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.loop(
            Animated.sequence([
              Animated.timing(anim.translateY, {
                toValue: -20,
                duration: 3000,
                useNativeDriver: true,
              }),
              Animated.timing(anim.translateY, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true,
              }),
            ])
          ),
        ]),
      ])
    );
    Animated.parallel(animations).start();
  }, []);

  return (
    <>
      {PARTICLE_DATA.map((p, i) => {
        const baseOpacity = anims[i].opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0, p.opacity],
        });
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              backgroundColor: GOLD,
              opacity: baseOpacity,
              transform: [{ translateY: anims[i].translateY }],
            }}
          />
        );
      })}
    </>
  );
}

// ─── Main SignInSuccessScreen ─────────────────────────────────────────────────

export default function SignInSuccessScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Continuous spinner
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();

    // Navigate after 2200ms
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* City grid background */}
      <CityGridBg />

      {/* Gold sparkle particles */}
      <SparkleParticles />

      {/* Centered content */}
      <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
        {/* Checkmark icon */}
        <CheckmarkIcon />

        {/* "Signed In" */}
        <Text style={styles.signedIn}>Signed In</Text>
        <Text style={styles.successfully}>Successfully!</Text>

        {/* "Welcome to Campaign 365" */}
        <Text style={styles.welcomeTo}>Welcome to</Text>
        <Text style={styles.campaign365}>Campaign 365</Text>

        {/* Taking you... */}
        <Text style={styles.redirectText}>Taking you to your dashboard...</Text>

        {/* Gold spinner */}
        <View style={styles.spinnerContainer}>
          <GoldSpinner spinAnim={spinAnim} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  signedIn: {
    color: WHITE,
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 28,
  },
  successfully: {
    color: WHITE,
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
  },
  welcomeTo: {
    color: GOLD,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
  campaign365: {
    color: GOLD,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  redirectText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 19,
    textAlign: 'center',
    marginTop: 16,
  },
  spinnerContainer: {
    marginTop: 28,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
