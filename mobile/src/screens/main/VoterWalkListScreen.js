import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, Ellipse, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

const NAVY     = '#0A2540';
const GOLD     = '#C9A227';
const WHITE    = '#FFFFFF';
const LIGHT_BG = '#F4F5F7';

// ─── SVG tab-bar icons ────────────────────────────────────────────────────────

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
      {/* Envelope/map shape */}
      <Rect x={2} y={4} width={20} height={16} rx={2} fill="none" stroke={c} strokeWidth={2} />
      <Path d="M2,6 L12,13 L22,6" stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* X mark overlay */}
      <Path d="M16,10 L20,14 M20,10 L16,14" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function IconPolls({ active }) {
  const c = active ? GOLD : 'rgba(255,255,255,0.4)';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Rect x={2}  y={14} width={4} height={8} rx={1} fill={c} />
      <Rect x={8}  y={10} width={4} height={12} rx={1} fill={c} />
      <Rect x={14} y={6}  width={4} height={16} rx={1} fill={c} />
      <Rect x={20} y={2}  width={3} height={20} rx={1} fill={c} />
    </Svg>
  );
}

function IconTeam({ active }) {
  const c = active ? GOLD : 'rgba(255,255,255,0.4)';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Ellipse cx={8} cy={7} rx={4} ry={4.5} fill={c} />
      <Ellipse cx={17} cy={8} rx={3} ry={3.5} fill={c} opacity={0.7} />
      <Path d="M1,20 C1,15.58 4.13,12 8,12 C11.87,12 15,15.58 15,20 Z" fill={c} />
      <Path d="M15,13.5 C17.76,13.5 20,15.74 20,18.5 L20,20 L15,20 Z" fill={c} opacity={0.7} />
    </Svg>
  );
}

// ─── Magnifying glass SVG ─────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Circle cx={11} cy={11} r={7} fill="none" stroke={GOLD} strokeWidth={2.2} />
      <Path
        d="M16.5,16.5 L21,21"
        stroke={GOLD}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── Chat bubble SVG ──────────────────────────────────────────────────────────

function ChatBubbleIcon() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path
        d="M20,2 L4,2 C2.9,2 2,2.9 2,4 L2,16 C2,17.1 2.9,18 4,18 L8,18 L12,22 L16,18 L20,18 C21.1,18 22,17.1 22,16 L22,4 C22,2.9 21.1,2 20,2 Z"
        fill={GOLD}
      />
    </Svg>
  );
}

// ─── Back arrow SVG ───────────────────────────────────────────────────────────

function BackArrow() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path
        d="M20,12 L4,12 M4,12 L10,6 M4,12 L10,18"
        stroke={WHITE}
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

// ─── Voter card component ─────────────────────────────────────────────────────

function VoterCard({ number, name, address, support, status, showChat }) {
  return (
    <View style={cardStyles.card}>
      {/* Name row */}
      <View style={cardStyles.nameRow}>
        <Text style={cardStyles.name}>
          {`#${number} - ${name}`}
        </Text>
        {showChat ? (
          <ChatBubbleIcon />
        ) : (
          <Text style={{ fontSize: 20 }}>{'🇬🇧🇯🇲'}</Text>
        )}
      </View>

      {/* Address + support */}
      <Text style={cardStyles.address}>
        {`${address}  •  ${support}`}
      </Text>

      {/* Gold divider strip */}
      <View style={cardStyles.goldDivider} />

      {/* Status / action */}
      {status === 'visited' ? (
        <View style={cardStyles.visitedPill}>
          <Text style={cardStyles.visitedText}>Visited</Text>
        </View>
      ) : (
        <TouchableOpacity style={cardStyles.canvassBtn} activeOpacity={0.85}>
          <Text style={cardStyles.canvassBtnText}>Tap to Canvass</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 20,
    flex: 1,
    marginRight: 8,
  },
  address: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 16,
    marginTop: 2,
  },
  goldDivider: {
    backgroundColor: GOLD,
    height: 3,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 10,
  },
  visitedPill: {
    alignSelf: 'flex-start',
    backgroundColor: GOLD,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  visitedText: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 16,
  },
  canvassBtn: {
    backgroundColor: GOLD,
    borderRadius: 8,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  canvassBtnText: {
    color: NAVY,
    fontWeight: '700',
    fontSize: 18,
  },
});

// ─── Bottom tab bar ───────────────────────────────────────────────────────────

const TABS = [
  { name: 'Home',    Icon: IconHome,    route: 'Home'    },
  { name: 'Canvass', Icon: IconCanvass, route: 'VoterWalkList', active: true },
  { name: 'Polls',   Icon: IconPolls,   route: 'Polling' },
  { name: 'Team',    Icon: IconTeam,    route: 'Chat'    },
];

function BottomTabBar({ navigation }) {
  return (
    <View style={tabStyles.bar}>
      {TABS.map(tab => {
        const active = tab.active || false;
        return (
          <TouchableOpacity
            key={tab.name}
            style={tabStyles.tabItem}
            onPress={() => navigation.navigate(tab.route)}
            activeOpacity={0.7}
          >
            <tab.Icon active={active} />
            <Text style={[tabStyles.label, active && tabStyles.labelActive]}>
              {tab.name}
            </Text>
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
    height: 64,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '600',
  },
  labelActive: {
    color: GOLD,
  },
});

// ─── Main VoterWalkListScreen ─────────────────────────────────────────────────

export default function VoterWalkListScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* ── Header ── */}
      <SafeAreaView style={styles.headerSafe} edges={['top']}>
        {/* Row 1: Logo + Canvasser pill */}
        <View style={styles.headerRow1}>
          <View style={styles.logoRow}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>C</Text>
            </View>
            <Text style={styles.logoTitle}>Campaign 365</Text>
          </View>
          <View style={styles.canvasserPill}>
            <Text style={styles.canvasserPillText}>Canvasser</Text>
          </View>
        </View>

        {/* Row 2: Back + Title */}
        <View style={styles.headerRow2}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <BackArrow />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Voter Walk List</Text>
          {/* Spacer to center title */}
          <View style={{ width: 30 }} />
        </View>

        {/* Row 3: Turf info */}
        <Text style={styles.turfInfo}>
          {'Turf A  •  28 Doors  •  14 Completed'}
        </Text>
      </SafeAreaView>

      {/* ── Search bar ── */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search voters..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* ── Voter list ── */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <VoterCard
          number={12}
          name="John Thompson"
          address="45 High Street"
          support="Likely Supporter"
          status="visited"
          showChat={false}
        />
        <VoterCard
          number={13}
          name="Maria Lopez"
          address="47 High Street"
          support="Undecided"
          status="unvisited"
          showChat={true}
        />
        <VoterCard
          number={14}
          name="David Brown"
          address="49 High Street"
          support="Strong Supporter"
          status="unvisited"
          showChat={false}
        />
        <VoterCard
          number={15}
          name="Sarah Wilson"
          address="51 High Street"
          support="Undecided"
          status="unvisited"
          showChat={false}
        />
      </ScrollView>

      {/* ── Floating FAB ── */}
      <View style={styles.fabWrapper} pointerEvents="box-none">
        <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
          <Text style={styles.fabPlus}>+</Text>
          <Text style={styles.fabText}>Add New Contact</Text>
        </TouchableOpacity>
      </View>

      {/* ── Bottom tab bar ── */}
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
  headerRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: NAVY,
    fontWeight: '900',
    fontSize: 20,
  },
  logoTitle: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 19,
  },
  canvasserPill: {
    backgroundColor: 'rgba(201,162,39,0.2)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GOLD,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  canvasserPillText: {
    color: GOLD,
    fontSize: 16,
    fontWeight: '600',
  },

  headerRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 12,
  },
  backBtn: {
    padding: 2,
  },
  pageTitle: {
    color: WHITE,
    fontWeight: '800',
    fontSize: 28,
    textAlign: 'center',
    flex: 1,
  },

  turfInfo: {
    color: GOLD,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 20,
  },

  // Search bar
  searchBarWrapper: {
    backgroundColor: NAVY,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201,162,39,0.15)',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 14,
    gap: 8,
    marginTop: -8,
    // pull up slightly to overlap header bottom
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.25)',
  },
  searchInput: {
    flex: 1,
    color: WHITE,
    fontSize: 19,
    height: 44,
  },

  // Scroll area
  scrollArea: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },

  // FAB
  fabWrapper: {
    position: 'absolute',
    bottom: 76,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVY,
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 14,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabPlus: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 25,
    marginRight: 8,
    lineHeight: 28,
  },
  fabText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 19,
  },
});
