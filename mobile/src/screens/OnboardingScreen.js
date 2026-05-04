import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  Dimensions, ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect, Ellipse, Line, G, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const RED = '#DC143C';

/* ── Slide 1 visual: Panic map ── */
function PanicMapVisual() {
  return (
    <View style={vis.wrap}>
      <Svg width={260} height={200} viewBox="0 0 260 200">
        {/* Map bg */}
        <Rect width={260} height={200} rx={16} fill="#1a2035" />
        {/* Grid roads */}
        {[40,80,120,160,200].map(y => (
          <Line key={y} x1={0} y1={y} x2={260} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        ))}
        {[50,100,150,200].map(x => (
          <Line key={x} x1={x} y1={0} x2={x} y2={200} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        ))}
        {/* Roads */}
        <Path d="M0,100 L260,100" stroke="rgba(255,255,255,0.12)" strokeWidth={3} />
        <Path d="M130,0 L130,200" stroke="rgba(255,255,255,0.12)" strokeWidth={3} />
        <Path d="M0,60 Q80,80 160,50 L260,70" stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
        <Path d="M20,150 Q100,130 180,160 L260,140" stroke="rgba(255,255,255,0.08)" strokeWidth={2} />

        {/* Red alert glow */}
        <Circle cx={130} cy={100} r={55} fill="rgba(220,20,60,0.15)" />
        <Circle cx={130} cy={100} r={38} fill="rgba(220,20,60,0.25)" />
        <Circle cx={130} cy={100} r={28} fill={RED} />
        <Text style={{ position: 'absolute' }}>!</Text>

        {/* Exclamation in center */}
        <Rect x={125} y={85} width={10} height={20} rx={4} fill="white" />
        <Circle cx={130} cy={112} r={4} fill="white" />

        {/* Team pins around */}
        {[
          { cx: 60,  cy: 55  },
          { cx: 195, cy: 60  },
          { cx: 55,  cy: 155 },
          { cx: 200, cy: 150 },
        ].map((p, i) => (
          <G key={i}>
            <Circle cx={p.cx} cy={p.cy} r={14} fill="#1a3a6a" stroke="#2563EB" strokeWidth={1.5} />
            <Circle cx={p.cx} cy={p.cy} r={8}  fill="#2563EB" />
            <Path d={`M${p.cx-3},${p.cy-2} L${p.cx},${p.cy+3} L${p.cx+3},${p.cy-2} Z`} fill="white" />
          </G>
        ))}
      </Svg>

      {/* Emergency contacts */}
      <View style={vis.contacts}>
        {[
          { label: 'Police (911)', number: '0473644970' },
          { label: 'SKNLP HQ',    number: '0694344567' },
          { label: 'Local Team Lead', number: '0878664258' },
        ].map((c, i) => (
          <View key={i} style={vis.contactRow}>
            <Text style={vis.contactLabel}>{c.label}</Text>
            <Text style={vis.contactNum}>{c.number}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/* ── Slide 2 visual: Offline shield ── */
function OfflineVisual() {
  return (
    <View style={vis.wrap}>
      {/* Shield */}
      <View style={vis.shieldWrap}>
        <Svg width={160} height={180} viewBox="0 0 160 180">
          <Path
            d="M80,10 L140,35 L140,90 Q140,145 80,170 Q20,145 20,90 L20,35 Z"
            fill="#1a3a8a"
            stroke="#2563EB"
            strokeWidth={3}
          />
          <Path
            d="M80,30 L125,50 L125,90 Q125,132 80,152 Q35,132 35,90 L35,50 Z"
            fill="#2563EB"
            opacity={0.4}
          />
          {/* Checkmark */}
          <Path d="M50,90 L70,112 L112,65" stroke="white" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </Svg>

        {/* Offline badge */}
        <View style={vis.offlineBadge}>
          <Text style={vis.offlineBadgeText}>Offline</Text>
        </View>

        {/* Auto-sync badge */}
        <View style={vis.syncBadge}>
          {/* Waveform */}
          <View style={vis.waveRow}>
            {[4,8,14,8,12,6,10,5].map((h, i) => (
              <View key={i} style={[vis.waveBar, { height: h }]} />
            ))}
          </View>
          <Text style={vis.syncBadgeText}>Auto-Sync</Text>
        </View>

        {/* Arrows */}
        <View style={[vis.arrow, vis.arrowRight]}>
          <Text style={vis.arrowText}>→</Text>
        </View>
        <View style={[vis.arrow, vis.arrowLeft]}>
          <Text style={[vis.arrowText, { color: RED }]}>→</Text>
        </View>
      </View>
    </View>
  );
}

const SLIDES = [
  {
    key: 'safety',
    icon: '🛡',
    title: 'Your Safety\nFirst',
    sub: 'One-tap Panic Button connects you instantly to your team and authorities',
    Visual: PanicMapVisual,
    btnLabel: 'Next',
    bg: ['#0D1A2E', '#1a0D1E'],
  },
  {
    key: 'offline',
    icon: '⚡',
    title: 'Work Offline.\nSync Instantly.',
    sub: 'Full canvassing power even without internet.',
    Visual: OfflineVisual,
    btnLabel: 'Get Started',
    bg: ['#0D1A2E', '#0D1E2E'],
  },
];

export default function OnboardingScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef(null);

  const goNext = () => {
    if (current < SLIDES.length - 1) {
      const next = current + 1;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setCurrent(next);
    } else {
      navigation.replace('Login');
    }
  };

  const slide = SLIDES[current];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1A2E" />

      {/* Header icons */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerIcon}>🛡</Text>
        <Text style={styles.panicIcon}>🚨</Text>
      </SafeAreaView>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={{ flex: 1 }}
      >
        {SLIDES.map((s, idx) => (
          <View key={s.key} style={[styles.slide, { width }]}>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.sub}>{s.sub}</Text>
            <View style={styles.visualWrap}>
              <s.Visual />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
        ))}
      </View>

      {/* Button */}
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.btn} onPress={goNext} activeOpacity={0.85}>
          <Text style={styles.btnText}>
            {current < SLIDES.length - 1 ? 'Next' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const vis = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 16 },
  contacts: {
    width: 260,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  contactLabel: { color: 'white', fontSize: 13, fontWeight: '600' },
  contactNum:   { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  shieldWrap: { position: 'relative', width: 260, height: 220, alignItems: 'center' },
  offlineBadge: {
    position: 'absolute', top: 30, left: 10,
    backgroundColor: '#2563EB', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6,
  },
  offlineBadgeText: { color: 'white', fontWeight: '700', fontSize: 13 },
  syncBadge: {
    position: 'absolute', bottom: 30, right: 5,
    backgroundColor: '#1E293B', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  waveRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginBottom: 5 },
  waveBar: { width: 3, borderRadius: 2, backgroundColor: '#22C55E' },
  syncBadgeText: { color: 'white', fontSize: 11, fontWeight: '600' },
  arrow: { position: 'absolute', top: '45%' },
  arrowRight: { right: 0 },
  arrowLeft:  { left: 0, transform: [{ scaleX: -1 }] },
  arrowText: { fontSize: 28, color: '#2563EB', fontWeight: '900' },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1A2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  headerIcon: { fontSize: 24 },
  panicIcon:  { fontSize: 24 },
  slide: {
    paddingHorizontal: 28,
    paddingTop: 24,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  sub: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 10,
  },
  visualWrap: {
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: {
    backgroundColor: RED,
    width: 24,
  },
  bottom: {
    paddingHorizontal: 28,
    paddingBottom: 44,
  },
  btn: {
    backgroundColor: RED,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: RED,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
