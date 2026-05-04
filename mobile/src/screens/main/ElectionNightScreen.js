import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Line, G, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const DARK = '#0A0F1E';

const CONSTITUENCIES = [
  { name: "ST. PAUL'S",   pct: 85, side: 'left',  top: 0.08 },
  { name: 'SANDY POINT',  pct: 70, side: 'right', top: 0.08 },
  { name: 'DORNE',        pct: 15, side: 'right', top: 0.32 },
  { name: 'NORKEP',       pct: 30, side: 'right', top: 0.52 },
  { name: 'SANDY POINT',  pct: 70, side: 'left',  top: 0.72 },
  { name: 'BASSETERRE',   pct: 30, side: 'right', top: 0.72 },
];

const MAP_PINS = [
  { x: 0.30, y: 0.20 }, { x: 0.42, y: 0.28 }, { x: 0.36, y: 0.38 },
  { x: 0.48, y: 0.42 }, { x: 0.38, y: 0.52 }, { x: 0.50, y: 0.58 },
  { x: 0.32, y: 0.60 }, { x: 0.44, y: 0.66 }, { x: 0.26, y: 0.42 },
  { x: 0.54, y: 0.32 }, { x: 0.40, y: 0.75 }, { x: 0.46, y: 0.18 },
];

function ElectionMap() {
  const mw = width - 80;
  const mh = 260;
  return (
    <Svg width={mw} height={mh} viewBox={`0 0 ${mw} ${mh}`}>
      <Rect width={mw} height={mh} fill="#111827" rx={4} />
      {/* St Kitts outline */}
      <Path
        d={`M${mw*0.15},${mh*0.18} L${mw*0.22},${mh*0.10} L${mw*0.35},${mh*0.07} L${mw*0.50},${mh*0.10} L${mw*0.60},${mh*0.18} L${mw*0.62},${mh*0.30} L${mw*0.58},${mh*0.44} L${mw*0.54},${mh*0.58} L${mw*0.50},${mh*0.72} L${mw*0.44},${mh*0.82} L${mw*0.36},${mh*0.88} L${mw*0.26},${mh*0.84} L${mw*0.20},${mh*0.70} L${mw*0.16},${mh*0.56} L${mw*0.14},${mh*0.38} Z`}
        fill="#1E293B" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5}
      />
      {/* Internal borders */}
      <Line x1={mw*0.15} y1={mh*0.38} x2={mw*0.62} y2={mh*0.30} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <Line x1={mw*0.16} y1={mh*0.56} x2={mw*0.58} y2={mh*0.44} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <Line x1={mw*0.20} y1={mh*0.70} x2={mw*0.54} y2={mh*0.58} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <Line x1={mw*0.26} y1={mh*0.84} x2={mw*0.50} y2={mh*0.72} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      {/* Red glow pins */}
      {MAP_PINS.map((p, i) => (
        <G key={i}>
          <Circle cx={mw*p.x} cy={mh*p.y} r={10} fill="rgba(220,20,60,0.2)" />
          <Circle cx={mw*p.x} cy={mh*p.y} r={5}  fill={RED} opacity={0.9} />
          <Circle cx={mw*p.x} cy={mh*p.y} r={2}  fill="white" />
        </G>
      ))}
    </Svg>
  );
}

export default function ElectionNightScreen({ navigation }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.04, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,    duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Dark maroon top bar */}
      <SafeAreaView style={{ backgroundColor: '#6B0A1A' }}>
        <View style={s.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={s.backArrow}>‹</Text>
          </TouchableOpacity>
          <View style={s.sknlpRow}>
            <View style={s.shieldIcon}><Text style={{ fontSize: 14 }}>⭐</Text></View>
            <Text style={s.sknlpTxt}>SKNLP</Text>
          </View>
          <TouchableOpacity>
            <Text style={s.chevrons}>{'>>'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Title */}
        <View style={s.titleWrap}>
          <Text style={s.titleWhite}>Election Night</Text>
          <Animated.Text style={[s.titleRed, { transform: [{ scale: pulse }] }]}>- Live Results</Animated.Text>
        </View>

        {/* Map + constituency labels */}
        <View style={s.mapSection}>
          {/* Left labels */}
          <View style={s.labelsLeft}>
            {CONSTITUENCIES.filter(c => c.side === 'left').map((c, i) => (
              <View key={i} style={s.constLabel}>
                <Text style={s.constName}>{c.name}</Text>
                <View style={s.barTrack}>
                  <View style={[s.barFill, { width: `${c.pct}%` }]} />
                </View>
                <Text style={s.constPct}>{c.pct}%</Text>
              </View>
            ))}
          </View>

          {/* Map */}
          <View style={s.mapWrap}>
            <ElectionMap />
          </View>

          {/* Right labels */}
          <View style={s.labelsRight}>
            {CONSTITUENCIES.filter(c => c.side === 'right').map((c, i) => (
              <View key={i} style={s.constLabel}>
                <Text style={s.constName}>{c.name}</Text>
                <View style={s.barTrack}>
                  <View style={[s.barFill, { width: `${c.pct}%` }]} />
                </View>
                <Text style={s.constPct}>{c.pct}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats row */}
        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={s.statLabel}>Votes Counted</Text>
            <Text style={s.statValue}>68%</Text>
          </View>
          <View style={s.statDivider} />
          <View style={s.statBox}>
            <Text style={s.statLabel}>Projected Win:</Text>
            <Text style={s.statValue}>Basseterre</Text>
          </View>
        </View>

        {/* Live Feed */}
        <View style={s.liveFeed}>
          <View style={s.liveBadge}>
            <View style={s.liveDot} />
            <Text style={s.liveTxt}>Live Feed</Text>
          </View>
          <View style={s.feedPlaceholder}>
            <View style={s.flagEmojis}>
              {['🎉','🇰🇳','⭐','🎊','🇰🇳'].map((e, i) => (
                <Text key={i} style={{ fontSize: 28 }}>{e}</Text>
              ))}
            </View>
            <Text style={s.feedSub}>SKNLP Victory Celebration</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARK },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  backBtn:   { padding: 6 },
  backArrow: { color: 'white', fontSize: 28, fontWeight: '300', lineHeight: 28 },
  sknlpRow:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  shieldIcon: {
    width: 28, height: 28, borderRadius: 6, backgroundColor: RED,
    alignItems: 'center', justifyContent: 'center',
  },
  sknlpTxt:  { color: 'white', fontWeight: '900', fontSize: 17, letterSpacing: 1 },
  chevrons:  { color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: '700' },

  scroll: { paddingHorizontal: 16, paddingBottom: 40 },

  titleWrap: { paddingTop: 20, paddingBottom: 16 },
  titleWhite: { color: 'white', fontSize: 32, fontWeight: '900', lineHeight: 36 },
  titleRed:   { color: RED, fontSize: 32, fontWeight: '900', lineHeight: 36 },

  mapSection: {
    flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 16,
  },
  labelsLeft:  { width: 72, gap: 14 },
  labelsRight: { width: 72, gap: 14 },
  mapWrap:     { flex: 1 },

  constLabel: { gap: 3 },
  constName:  { color: 'rgba(255,255,255,0.6)', fontSize: 8, fontWeight: '700', letterSpacing: 0.3 },
  barTrack: {
    height: 3, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 2, overflow: 'hidden',
  },
  barFill:   { height: '100%', backgroundColor: RED, borderRadius: 2 },
  constPct:  { color: 'white', fontWeight: '900', fontSize: 11 },

  statsRow: {
    flexDirection: 'row', backgroundColor: '#111827',
    borderRadius: 14, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  statBox: { flex: 1, paddingVertical: 16, paddingHorizontal: 16 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 12 },
  statLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: '600', marginBottom: 4 },
  statValue: { color: 'white', fontSize: 18, fontWeight: '900' },

  liveFeed: { backgroundColor: '#111827', borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  liveTxt: { color: 'white', fontWeight: '800', fontSize: 14 },
  feedPlaceholder: {
    alignItems: 'center', paddingVertical: 24, gap: 8,
    backgroundColor: 'rgba(220,20,60,0.08)',
  },
  flagEmojis: { flexDirection: 'row', gap: 8 },
  feedSub: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '600' },
});
