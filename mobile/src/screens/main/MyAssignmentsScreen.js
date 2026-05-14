import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, Line, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

const NAVY     = '#0A2540';
const GOLD     = '#C9A227';
const LIGHT_BG = '#F4F5F7';
const WHITE    = '#FFFFFF';

// ─── SVG icons ────────────────────────────────────────────────────────────────

function BackArrow() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path d="M20,11H7.83l5.59-5.59L12,4l-8,8l8,8l1.41-1.41L7.83,13H20V11Z" fill={WHITE} />
    </Svg>
  );
}

function ChevronRight({ color = '#999' }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59Z" fill={color} />
    </Svg>
  );
}

function ArrowRight({ color = WHITE }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path d="M12,4l-1.41,1.41L16.17,11H4v2h12.17l-5.58,5.59L12,20l8-8Z" fill={color} />
    </Svg>
  );
}

function MapPinIcon({ size = 18, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z"
        fill={color}
      />
      <Circle cx={12} cy={9} r={3} fill={NAVY} />
    </Svg>
  );
}

// ─── Decorative SVG pattern for hero card ────────────────────────────────────

function HeroCardPattern() {
  const mw = width - 48;
  const mh = 160;
  return (
    <Svg width={mw} height={mh} viewBox={`0 0 ${mw} ${mh}`} style={StyleSheet.absoluteFill}>
      {/* Grid */}
      {[30, 60, 90, 120, 150].map(y => (
        <Line key={`h${y}`} x1={0} y1={y} x2={mw} y2={y}
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      ))}
      {[50, 100, 150, 200, 250, 300].map(x => (
        <Line key={`v${x}`} x1={x} y1={0} x2={x} y2={mh}
          stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      ))}
      {/* Roads */}
      <Path
        d={`M0,${mh * 0.5} Q${mw * 0.35},${mh * 0.3} ${mw * 0.7},${mh * 0.55} L${mw},${mh * 0.42}`}
        stroke="rgba(255,255,255,0.15)" strokeWidth={4} fill="none"
      />
      <Path
        d={`M${mw * 0.3},0 Q${mw * 0.34},${mh * 0.4} ${mw * 0.44},${mh}`}
        stroke="rgba(255,255,255,0.1)" strokeWidth={3} fill="none"
      />
      {/* Gold pins */}
      {[
        { x: mw * 0.25, y: mh * 0.28 },
        { x: mw * 0.42, y: mh * 0.45 },
        { x: mw * 0.62, y: mh * 0.3  },
        { x: mw * 0.75, y: mh * 0.55 },
      ].map((p, i) => (
        <G key={i}>
          <Circle cx={p.x} cy={p.y} r={9} fill={GOLD} opacity={0.8} />
          <Circle cx={p.x} cy={p.y} r={3.5} fill={WHITE} />
          <Path d={`M${p.x},${p.y + 9} L${p.x},${p.y + 16}`}
            stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
        </G>
      ))}
    </Svg>
  );
}

// ─── Tab bar icons ────────────────────────────────────────────────────────────

function IconHome({ active }) {
  const c = active ? GOLD : 'rgba(255,255,255,0.4)';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20Z" fill={c} />
    </Svg>
  );
}
function IconCanvass({ active }) {
  const c = active ? GOLD : 'rgba(255,255,255,0.4)';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Rect x={2} y={2} width={9} height={9} rx={2} fill={c} opacity={0.7} />
      <Rect x={13} y={2} width={9} height={9} rx={2} fill={c} />
      <Rect x={2} y={13} width={9} height={9} rx={2} fill={c} />
      <Rect x={13} y={13} width={9} height={9} rx={2} fill={c} opacity={0.7} />
    </Svg>
  );
}
function IconPolls({ active }) {
  const c = active ? GOLD : 'rgba(255,255,255,0.4)';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Rect x={2} y={14} width={4} height={8} rx={1} fill={c} />
      <Rect x={8} y={10} width={4} height={12} rx={1} fill={c} />
      <Rect x={14} y={6}  width={4} height={16} rx={1} fill={c} />
      <Rect x={20} y={2}  width={4} height={20} rx={1} fill={c} />
    </Svg>
  );
}
function IconTeam({ active }) {
  const c = active ? GOLD : 'rgba(255,255,255,0.4)';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Circle cx={9} cy={7} r={3.5} fill={c} />
      <Circle cx={17} cy={8} r={2.5} fill={c} opacity={0.7} />
      <Path d="M2,20 C2,16.13 5.13,13 9,13 C12.87,13 16,16.13 16,20 Z" fill={c} />
      <Path d="M16,14 C18.76,14 21,16.24 21,19 L21,20 L16,20 Z" fill={c} opacity={0.7} />
    </Svg>
  );
}
function IconProfile({ active }) {
  const c = active ? GOLD : 'rgba(255,255,255,0.4)';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Circle cx={12} cy={7} r={5} fill={c} />
      <Path d="M4,21 C4,16.58 7.58,13 12,13 C16.42,13 20,16.58 20,21 Z" fill={c} />
    </Svg>
  );
}

const TABS = [
  { name: 'Home',    Icon: IconHome,    route: 'Home'          },
  { name: 'Canvass', Icon: IconCanvass, route: 'MyAssignments' },
  { name: 'Polls',   Icon: IconPolls,   route: 'Polling'       },
  { name: 'Team',    Icon: IconTeam,    route: 'Chat'          },
  { name: 'Profile', Icon: IconProfile, route: 'Profile'       },
];

function BottomTabBar({ navigation }) {
  return (
    <View style={tabStyles.bar}>
      {TABS.map(tab => {
        const active = tab.name === 'Canvass';
        return (
          <TouchableOpacity
            key={tab.name}
            style={tabStyles.tabItem}
            onPress={() => navigation.navigate(tab.route)}
          >
            <tab.Icon active={active} />
            <Text style={[tabStyles.label, active && tabStyles.labelActive]}>
              {tab.name}
            </Text>
            {active && <View style={tabStyles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const tabStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: NAVY,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 14,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '600',
  },
  labelActive: { color: GOLD },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GOLD,
    marginTop: 1,
  },
});

// ─── Route card ───────────────────────────────────────────────────────────────

function RouteCard({ name, miles }) {
  return (
    <View style={styles.routeCard}>
      <View style={styles.routeLeft}>
        <View style={styles.routePinCircle}>
          <MapPinIcon size={16} color={WHITE} />
        </View>
        <View>
          <Text style={styles.routeName}>{name}</Text>
          <Text style={styles.routeMiles}>{miles} miles</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.startRouteBtn}>
        <Text style={styles.startRouteTxt}>Start Route</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── MyAssignmentsScreen ──────────────────────────────────────────────────────

export default function MyAssignmentsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Header bar (navy bg) */}
      <SafeAreaView style={styles.headerSafe} edges={['top']}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <BackArrow />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Campaign 365</Text>

          <View style={styles.headerBadgeRow}>
            <View style={styles.canvasserBadge}>
              <Text style={styles.canvasserBadgeTxt}>Canvasser</Text>
            </View>
            <ArrowRight color={WHITE} />
          </View>
        </View>
      </SafeAreaView>

      {/* Scrollable content on light bg */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* Page title */}
          <Text style={styles.pageTitle}>My Assignments</Text>
          <Text style={styles.pageSubtitle}>Today's Turf • Polling Division 12</Text>

          {/* 3 stat cards */}
          <View style={styles.statRow}>
            {/* Doors Planned */}
            <View style={[styles.statCard, styles.statCardWhite]}>
              <Text style={styles.statNumDark}>45</Text>
              <Text style={styles.statLabelDark}>Doors Planned</Text>
            </View>

            {/* Completed — gold card */}
            <View style={[styles.statCard, styles.statCardGold]}>
              <Text style={styles.statNumWhite}>12</Text>
              <Text style={styles.statLabelWhite}>Completed</Text>
            </View>

            {/* Support */}
            <View style={[styles.statCard, styles.statCardWhite]}>
              <Text style={styles.statNumDark}>62%</Text>
              <Text style={styles.statLabelDark}>Support</Text>
            </View>
          </View>

          {/* Assigned Routes section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Assigned Routes</Text>
            <ChevronRight color="#999" />
          </View>

          {/* Route cards */}
          <RouteCard name="Pallisen Route 1" miles="3.0" />
          <RouteCard name="Pallisen Route 2" miles="5.0" />

          {/* Hero / Start New Canvass card */}
          <View style={styles.heroCard}>
            <HeroCardPattern />
            {/* Overlay gradient scrim */}
            <View style={styles.heroScrim} />
            <TouchableOpacity style={styles.startCanvassBtn} activeOpacity={0.85}>
              <MapPinIcon size={18} color={WHITE} />
              <Text style={styles.startCanvassTxt}>Start New Canvass</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Bottom tab bar */}
      <BottomTabBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },

  // Header
  headerSafe: {
    backgroundColor: NAVY,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: NAVY,
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    color: WHITE,
    fontWeight: '800',
    fontSize: 20,
    textAlign: 'center',
  },
  headerBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  canvasserBadge: {
    backgroundColor: GOLD,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  canvasserBadgeTxt: {
    color: NAVY,
    fontWeight: '800',
    fontSize: 14,
  },

  // Scroll / content
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  pageTitle: {
    color: NAVY,
    fontWeight: '900',
    fontSize: 35,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    color: GOLD,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 20,
  },

  // Stat cards
  statRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statCardWhite: {
    backgroundColor: WHITE,
  },
  statCardGold: {
    backgroundColor: GOLD,
  },
  statNumDark: {
    color: NAVY,
    fontWeight: '900',
    fontSize: 32,
    lineHeight: 38,
  },
  statLabelDark: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  statNumWhite: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 32,
    lineHeight: 38,
  },
  statLabelWhite: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: NAVY,
    fontWeight: '800',
    fontSize: 21,
  },

  // Route cards
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  routeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routePinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeName: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 18,
  },
  routeMiles: {
    color: '#888',
    fontSize: 15,
    marginTop: 2,
  },
  startRouteBtn: {
    backgroundColor: GOLD,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  startRouteTxt: {
    color: NAVY,
    fontWeight: '800',
    fontSize: 15,
  },

  // Hero card
  heroCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: NAVY,
    height: 160,
    marginTop: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,37,64,0.55)',
  },
  startCanvassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: NAVY,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    width: width - 88,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 2,
  },
  startCanvassTxt: {
    color: WHITE,
    fontWeight: '800',
    fontSize: 20,
  },
});
