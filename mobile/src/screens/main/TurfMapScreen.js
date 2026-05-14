import React, { useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, G, Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const NAVY     = '#0A2540';
const GOLD     = '#C9A227';
const WHITE    = '#FFFFFF';
const GREEN    = '#2D7A4F';
const MAP_BG   = '#E8E4DC';

// ─── Header back-arrow SVG ────────────────────────────────────────────────────

function ChevronLeft({ size = 24, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M15,18 L9,12 L15,6"
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Road network SVG ─────────────────────────────────────────────────────────

function MapRoads({ mapWidth, mapHeight }) {
  const W = mapWidth;
  const H = mapHeight;
  return (
    <Svg
      width={W}
      height={H}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      <Rect width={W} height={H} fill={MAP_BG} />

      {/* Main roads — wide */}
      <Path
        d={`M0,${H * 0.35} Q${W * 0.25},${H * 0.28} ${W * 0.55},${H * 0.38} T${W},${H * 0.32}`}
        stroke="#BFBAB0"
        strokeWidth={8}
        fill="none"
      />
      <Path
        d={`M${W * 0.42},0 Q${W * 0.38},${H * 0.3} ${W * 0.45},${H * 0.55} T${W * 0.5},${H}`}
        stroke="#BFBAB0"
        strokeWidth={7}
        fill="none"
      />
      <Path
        d={`M0,${H * 0.65} Q${W * 0.3},${H * 0.6} ${W * 0.7},${H * 0.68} T${W},${H * 0.62}`}
        stroke="#BFBAB0"
        strokeWidth={6}
        fill="none"
      />
      <Path
        d={`M${W * 0.22},0 L${W * 0.18},${H * 0.45} Q${W * 0.2},${H * 0.7} ${W * 0.28},${H}`}
        stroke="#BFBAB0"
        strokeWidth={5}
        fill="none"
      />
      <Path
        d={`M0,${H * 0.15} Q${W * 0.15},${H * 0.2} ${W * 0.4},${H * 0.12} T${W},${H * 0.18}`}
        stroke="#BFBAB0"
        strokeWidth={6}
        fill="none"
      />

      {/* Secondary roads — thinner */}
      <Path
        d={`M${W * 0.1},0 Q${W * 0.12},${H * 0.25} ${W * 0.08},${H * 0.55} T${W * 0.12},${H}`}
        stroke="#D4CFC6"
        strokeWidth={2}
        fill="none"
      />
      <Path
        d={`M0,${H * 0.5} Q${W * 0.2},${H * 0.48} ${W * 0.5},${H * 0.52} T${W},${H * 0.49}`}
        stroke="#D4CFC6"
        strokeWidth={2}
        fill="none"
      />
      <Path
        d={`M${W * 0.65},0 Q${W * 0.7},${H * 0.2} ${W * 0.62},${H * 0.5} T${W * 0.68},${H}`}
        stroke="#D4CFC6"
        strokeWidth={2}
        fill="none"
      />
      <Path
        d={`M${W * 0.75},0 L${W * 0.78},${H * 0.35} Q${W * 0.8},${H * 0.6} ${W * 0.75},${H}`}
        stroke="#D4CFC6"
        strokeWidth={2}
        fill="none"
      />
      <Path
        d={`M0,${H * 0.82} Q${W * 0.35},${H * 0.78} ${W * 0.65},${H * 0.84} T${W},${H * 0.8}`}
        stroke="#D4CFC6"
        strokeWidth={2}
        fill="none"
      />
      <Path
        d={`M${W * 0.88},0 Q${W * 0.9},${H * 0.3} ${W * 0.86},${H * 0.65} T${W * 0.9},${H}`}
        stroke="#D4CFC6"
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

// ─── Pin SVG component ────────────────────────────────────────────────────────

function PinSVG({ color, number, size = 32 }) {
  const scale = size / 32;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 28">
      <Path
        d="M12,0 C5.4,0 0,5.4 0,12 C0,18.6 12,28 12,28 C12,28 24,18.6 24,12 C24,5.4 18.6,0 12,0"
        fill={color}
      />
      <Text
        x={12}
        y={14}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={WHITE}
        fontSize={9}
        fontWeight="bold"
      />
    </Svg>
  );
}

// We render the number as a Text overlay since SVG Text in react-native-svg
// needs to be inside the SVG and requires different handling.
function MapPin({ color, number, size = 32, style }) {
  return (
    <View style={[{ width: size, height: size + 4, alignItems: 'center' }, style]}>
      <Svg width={size} height={size + 4} viewBox="0 0 24 28">
        <Path
          d="M12,0 C5.4,0 0,5.4 0,12 C0,18.6 12,28 12,28 C12,28 24,18.6 24,12 C24,5.4 18.6,0 12,0"
          fill={color}
        />
        <Circle cx={12} cy={11} r={7} fill="rgba(0,0,0,0.18)" />
        <Circle cx={12} cy={11} r={6.5} fill={color} />
      </Svg>
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: size,
        height: size * 0.78,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{ color: WHITE, fontWeight: '700', fontSize: size * 0.32, lineHeight: size * 0.36 }}>
          {number}
        </Text>
      </View>
    </View>
  );
}

// ─── Current location pin with glow ──────────────────────────────────────────

function CurrentLocationPin({ number }) {
  return (
    <View style={{ width: 72, height: 72, alignItems: 'center', justifyContent: 'flex-start' }}>
      {/* Glow rings */}
      <View style={{ position: 'absolute', top: 6, left: 6, width: 60, height: 60, borderRadius: 30, backgroundColor: GOLD, opacity: 0.15 }} />
      <View style={{ position: 'absolute', top: 12, left: 12, width: 48, height: 48, borderRadius: 24, backgroundColor: GOLD, opacity: 0.25 }} />
      <MapPin color={GOLD} number={number} size={48} />
    </View>
  );
}

// ─── Ballot box icon ──────────────────────────────────────────────────────────

function BallotBoxSmall() {
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24">
      <Rect x={2} y={10} width={20} height={12} rx={2} fill={NAVY} />
      <Rect x={9} y={8} width={6} height={4} rx={1} fill={NAVY} />
      <Rect x={10} y={3} width={4} height={7} rx={1} fill={GOLD} opacity={0.9} />
      <Line x1={11} y1={5} x2={13} y2={5} stroke={NAVY} strokeWidth={1} />
      <Line x1={11} y1={7} x2={13} y2={7} stroke={NAVY} strokeWidth={1} />
    </Svg>
  );
}

// ─── TurfMapScreen ────────────────────────────────────────────────────────────

const GREEN_PINS  = [
  { n: 12, l: '8%',  t: '60%' }, { n: 11, l: '12%', t: '55%' },
  { n: 13, l: '15%', t: '65%' }, { n: 17, l: '18%', t: '58%' },
  { n: 1,  l: '22%', t: '72%' }, { n: 7,  l: '25%', t: '78%' },
];

const GOLD_PINS = [
  { n: 10, l: '30%', t: '15%' }, { n: 17, l: '42%', t: '10%' },
  { n: 14, l: '28%', t: '22%' }, { n: 9,  l: '35%', t: '28%' },
  { n: 10, l: '50%', t: '12%' }, { n: 5,  l: '40%', t: '35%' },
  { n: 18, l: '48%', t: '40%' }, { n: 11, l: '55%', t: '20%' },
  { n: 9,  l: '60%', t: '32%' }, { n: 11, l: '65%', t: '25%' },
  { n: 10, l: '70%', t: '18%' }, { n: 4,  l: '55%', t: '45%' },
  { n: 1,  l: '62%', t: '50%' }, { n: 13, l: '72%', t: '42%' },
];

const NAVY_PINS = [
  { n: 2,  l: '20%', t: '45%' }, { n: 24, l: '25%', t: '50%' },
  { n: 9,  l: '22%', t: '58%' }, { n: 13, l: '75%', t: '55%' },
];

export default function TurfMapScreen({ navigation }) {
  // Map area occupies the screen between header and bottom panel
  const HEADER_H     = 56;
  const BOTTOM_H     = 170;
  const mapHeight    = height - HEADER_H - BOTTOM_H;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* ── Header ── */}
      <SafeAreaView style={styles.headerSafe} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <ChevronLeft size={24} color={WHITE} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Turf Map</Text>

          <Text style={styles.offlineText}>Offline Mode</Text>
        </View>
      </SafeAreaView>

      {/* ── Map area ── */}
      <View style={[styles.mapArea, { height: mapHeight }]}>
        {/* Road network as absolute fill SVG */}
        <MapRoads mapWidth={width} mapHeight={mapHeight} />

        {/* Green pins — Strong */}
        {GREEN_PINS.map((p, i) => (
          <TouchableOpacity
            key={`g${i}`}
            style={{ position: 'absolute', left: p.l, top: p.t }}
            activeOpacity={0.8}
          >
            <MapPin color={GREEN} number={p.n} size={32} />
          </TouchableOpacity>
        ))}

        {/* Gold pins — Lean */}
        {GOLD_PINS.map((p, i) => (
          <TouchableOpacity
            key={`go${i}`}
            style={{ position: 'absolute', left: p.l, top: p.t }}
            activeOpacity={0.8}
          >
            <MapPin color={GOLD} number={p.n} size={32} />
          </TouchableOpacity>
        ))}

        {/* Navy pins — Undecided */}
        {NAVY_PINS.map((p, i) => (
          <TouchableOpacity
            key={`n${i}`}
            style={{ position: 'absolute', left: p.l, top: p.t }}
            activeOpacity={0.8}
          >
            <MapPin color={NAVY} number={p.n} size={32} />
          </TouchableOpacity>
        ))}

        {/* Current location pin with glow */}
        <View style={{ position: 'absolute', left: '45%', top: '48%' }}>
          <CurrentLocationPin number={12} />
          {/* Dashed route line from current pin downward */}
          <Svg
            width={25}
            height={75}
            style={{ position: 'absolute', top: 60, left: 26 }}
            pointerEvents="none"
          >
            <Line
              x1={10} y1={0} x2={10} y2={50}
              stroke={GOLD}
              strokeWidth={2}
              strokeDasharray="4,4"
            />
            <Circle cx={10} cy={55} r={5} fill={GOLD} opacity={0.7} />
          </Svg>
        </View>

        {/* Top-left ballot box icon */}
        <View style={styles.ballotBox}>
          <BallotBoxSmall />
          <Text style={{ fontSize: 12 }}>{'🇬🇧🇯🇲'}</Text>
        </View>

        {/* Switch to List View button — top center */}
        <View style={styles.switchBtnWrapper}>
          <TouchableOpacity
            style={styles.switchBtn}
            onPress={() => navigation.navigate('VoterWalkList')}
            activeOpacity={0.85}
          >
            <Text style={styles.switchBtnText}>Switch to List View</Text>
          </TouchableOpacity>
        </View>

        {/* Legend — bottom right */}
        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: GREEN }]} />
            <Text style={styles.legendText}>Strong</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: GOLD }]} />
            <Text style={styles.legendText}>Lean</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: NAVY }]} />
            <Text style={styles.legendText}>Undecided</Text>
          </View>
        </View>
      </View>

      {/* ── Bottom panel ── */}
      <View style={styles.bottomPanel}>
        <Text style={styles.routeTitle}>
          Route: Polling Division 12 – 28 doors left
        </Text>

        <View style={styles.etaRow}>
          <Text style={styles.etaLabel}>Estimated time: </Text>
          <Text style={styles.etaValue}>1h 45m</Text>
        </View>

        <TouchableOpacity style={styles.optimizeBtn} activeOpacity={0.85}>
          <Text style={styles.optimizeBtnText}>Optimize Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
  },
  headerSafe: {
    backgroundColor: NAVY,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: NAVY,
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    color: WHITE,
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center',
  },
  offlineText: {
    color: GOLD,
    fontSize: 18,
    fontWeight: '600',
  },

  // Map
  mapArea: {
    width: '100%',
    backgroundColor: MAP_BG,
    position: 'relative',
    overflow: 'hidden',
  },

  // Ballot box overlay
  ballotBox: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: WHITE,
    borderRadius: 10,
    width: 52,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    gap: 2,
  },

  // Switch button
  switchBtnWrapper: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  switchBtn: {
    backgroundColor: GOLD,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  switchBtnText: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 18,
  },

  // Legend
  legend: {
    position: 'absolute',
    bottom: 16,
    right: 12,
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
  },

  // Bottom panel
  bottomPanel: {
    backgroundColor: NAVY,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 28,
  },
  routeTitle: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 20,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  etaLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 18,
  },
  etaValue: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 18,
  },
  optimizeBtn: {
    backgroundColor: GOLD,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  optimizeBtnText: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 20,
  },
});
