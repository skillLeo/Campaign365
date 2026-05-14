import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Rect, Circle, Path, Line, G, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

const NAVY      = '#0A2540';
const GOLD      = '#C9A227';
const WHITE     = '#FFFFFF';
const LIGHT_BG  = '#F4F5F7';

// ── City map grid + pins illustration ────────────────────────────────────────
function HeroIllustration() {
  const W = width;
  const H = 300;

  // Grid lines — horizontal
  const hLines = [40, 80, 120, 160, 200, 240, 280];
  // Grid lines — vertical
  const vLines = [40, 80, 130, 185, 240, 295, 340];

  // Location pins [cx, cy]
  const pins = [
    { cx: 55,  cy: 60  },
    { cx: 210, cy: 95  },
    { cx: 130, cy: 195 },
    { cx: 310, cy: 175 },
  ];

  return (
    <Svg width={W} height={H} style={{ position: 'absolute' }}>
      {/* Base */}
      <Rect width={W} height={H} fill={NAVY} />

      {/* Street grid */}
      {hLines.map((y, i) => (
        <Line key={`h${i}`} x1={0} y1={y} x2={W} y2={y}
          stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      ))}
      {vLines.map((x, i) => (
        <Line key={`v${i}`} x1={x} y1={0} x2={x} y2={H}
          stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      ))}

      {/* Location pins */}
      {pins.map((p, i) => (
        <G key={i} transform={`translate(${p.cx}, ${p.cy})`}>
          {/* Pin drop tail */}
          <Path
            d="M0,0 Q-8,-6 -8,-18 A8,8 0 1,1 8,-18 Q8,-6 0,0 Z"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.5}
          />
          {/* Inner dot */}
          <Circle cx={0} cy={-18} r={3} fill="rgba(255,255,255,0.55)" />
        </G>
      ))}

      {/* ── Center "phone + offline cloud" composition ── */}

      {/* Phone frame */}
      <Rect
        x={width / 2 - 38} y={90}
        width={76} height={130}
        rx={10} ry={10}
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={2.5}
      />
      {/* Phone home button */}
      <Circle cx={width / 2} cy={212} r={6}
        fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />
      {/* Phone speaker */}
      <Rect
        x={width / 2 - 12} y={95}
        width={24} height={4}
        rx={2}
        fill="rgba(255,255,255,0.35)"
      />

      {/* Cloud shape — overlaps top of phone */}
      <Path
        d={`
          M${width/2 - 42},105
          Q${width/2 - 48},87 ${width/2 - 28},82
          Q${width/2 - 26},66 ${width/2 - 4},68
          Q${width/2 + 2},56 ${width/2 + 20},62
          Q${width/2 + 46},58 ${width/2 + 46},82
          Q${width/2 + 58},84 ${width/2 + 56},100
          Q${width/2 + 56},114 ${width/2 + 40},114
          L${width/2 - 34},114
          Q${width/2 - 50},114 ${width/2 - 42},105
          Z
        `}
        fill={WHITE}
        opacity={0.92}
      />

      {/* No-connection circle (red with X) */}
      <Circle cx={width/2 + 42} cy={68} r={14} fill="#FF3B30" />
      <Line
        x1={width/2 + 36} y1={62}
        x2={width/2 + 48} y2={74}
        stroke={WHITE} strokeWidth={2.5} strokeLinecap="round"
      />
      <Line
        x1={width/2 + 48} y1={62}
        x2={width/2 + 36} y2={74}
        stroke={WHITE} strokeWidth={2.5} strokeLinecap="round"
      />

      {/* OFFLINE gold badge */}
      <Rect
        x={width/2 - 52} y={232}
        width={104} height={36}
        rx={18}
        fill={GOLD}
      />
      <SvgText
        x={width/2} y={256}
        textAnchor="middle"
        fill={NAVY}
        fontSize={14}
        fontWeight="bold"
      >
        OFFLINE
      </SvgText>
    </Svg>
  );
}

// ── Stat row component ────────────────────────────────────────────────────────
function StatRow({ label, value, valueFontSize = 15, showDivider = true }) {
  return (
    <>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, valueFontSize !== 15 && { fontSize: valueFontSize }]}>
          {value}
        </Text>
      </View>
      {showDivider && <View style={styles.statDivider} />}
    </>
  );
}

// ── Bottom tab bar ────────────────────────────────────────────────────────────
function BottomTab({ navigation }) {
  const tabs = [
    { name: 'Home',    icon: 'Home'    },
    { name: 'Canvass', icon: 'Canvass', active: true },
    { name: 'Polls',   icon: 'Polls'   },
    { name: 'Team',    icon: 'Team'    },
    { name: 'Profile', icon: 'Profile' },
  ];

  const TAB_W = width / tabs.length;

  return (
    <View style={styles.tabBar}>
      {tabs.map((t) => (
        <TouchableOpacity
          key={t.name}
          style={[styles.tabItem, { width: TAB_W }]}
          onPress={() => navigation?.navigate && navigation.navigate(t.name)}
          activeOpacity={0.7}
        >
          {/* SVG icon per tab */}
          <TabIcon name={t.name} active={t.active} />
          <Text style={[styles.tabLabel, t.active && styles.tabLabelActive]}>
            {t.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function TabIcon({ name, active }) {
  const color = active ? GOLD : 'rgba(255,255,255,0.45)';
  const size  = 22;
  switch (name) {
    case 'Home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
            fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
        </Svg>
      );
    case 'Canvass':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            fill="none" stroke={color} strokeWidth={1.8} />
          <Circle cx={12} cy={9} r={2.5} fill="none" stroke={color} strokeWidth={1.8} />
        </Svg>
      );
    case 'Polls':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={3} y={12} width={4} height={9} rx={1} fill={color} />
          <Rect x={10} y={7} width={4} height={14} rx={1} fill={color} />
          <Rect x={17} y={3} width={4} height={18} rx={1} fill={color} />
        </Svg>
      );
    case 'Team':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={9} cy={7} r={3} fill="none" stroke={color} strokeWidth={1.8} />
          <Path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
            fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
          <Circle cx={18} cy={7} r={2.5} fill="none" stroke={color} strokeWidth={1.5} />
          <Path d="M22 21v-1.5a3.5 3.5 0 00-3.5-3.5"
            fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        </Svg>
      );
    case 'Profile':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={8} r={4} fill="none" stroke={color} strokeWidth={1.8} />
          <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
            fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        </Svg>
      );
    default:
      return <Circle cx={11} cy={11} r={5} fill="none" stroke={color} strokeWidth={1.8} />;
  }
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function OfflineModeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header row ── */}
        <SafeAreaView edges={['top']}>
          <View style={[styles.header, { paddingTop: 12 }]}>
            <Text style={styles.headerTitle}>Offline Mode</Text>
            <TouchableOpacity style={styles.syncBtn} activeOpacity={0.8}>
              <Text style={styles.syncBtnText}>Sync Now</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* ── Hero section ── */}
        <View style={styles.hero}>
          <HeroIllustration />
        </View>

        {/* ── Info section ── */}
        <View style={styles.infoSection}>

          {/* Gold banner */}
          <View style={styles.infoBanner}>
            <Text style={styles.infoBannerText}>
              You are currently offline  •  187 interactions saved locally
            </Text>
          </View>

          {/* Stats card */}
          <View style={styles.statsCard}>
            <StatRow label="Voter data synced"   value="92%"                            />
            <StatRow label="Last sync"            value="2 hours ago"                   />
            <StatRow
              label="Pending uploads"
              value="8 voice notes  •  14 polls"
              valueFontSize={13}
              showDivider={false}
            />
          </View>

          {/* CTA button */}
          <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.85}>
            <Text style={styles.ctaBtnText}>Download New Turf for Offline  ›</Text>
          </TouchableOpacity>

          {/* Footer text */}
          <Text style={styles.footerText}>
            All data will automatically sync when connection returns
          </Text>
        </View>
      </ScrollView>

      {/* ── Bottom tab bar ── */}
      <BottomTab navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',
  },
  syncBtn: {
    backgroundColor: GOLD,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  syncBtnText: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 18,
  },

  // Hero
  hero: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },

  // Info section
  infoSection: {
    backgroundColor: LIGHT_BG,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -1,
  },
  infoBanner: {
    backgroundColor: GOLD,
    borderRadius: 12,
    padding: 14,
  },
  infoBannerText: {
    color: NAVY,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Stats card
  statsCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statLabel: {
    color: '#8A94A6',
    fontSize: 18,
  },
  statValue: {
    color: NAVY,
    fontSize: 19,
    fontWeight: '700',
  },
  statDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },

  // CTA
  ctaBtn: {
    backgroundColor: GOLD,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  ctaBtnText: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 20,
  },
  footerText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
  },

  // Tab bar
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: NAVY,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'rgba(255,255,255,0.08)',
    borderTopWidth: 1,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },
  tabLabelActive: {
    color: GOLD,
  },
});
