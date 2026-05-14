import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, G, Ellipse } from 'react-native-svg';

const { width } = Dimensions.get('window');
const NAVY     = '#001F3F';
const GOLD     = '#C9A227';
const WHITE    = '#FFFFFF';
const LIGHT_BG = '#F4F5F7';
const GREEN    = '#22C55E';
const RED      = '#EF4444';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function BackArrow({ size = 24, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M20,11H7.83L13.42,5.41L12,4L4,12L12,20L13.41,18.59L7.83,13H20V11Z" fill={color} />
    </Svg>
  );
}

function RefreshIcon({ size = 22, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M17.65,6.35C16.2,4.9 14.21,4 12,4C7.58,4 4.01,7.58 4.01,12C4.01,16.42 7.58,20 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18C8.69,18 6,15.31 6,12C6,8.69 8.69,6 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
        fill={color}
      />
    </Svg>
  );
}

function PersonIcon({ size = 30, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="8" r="4" fill={color} />
      <Path d="M4,20 C4,15.58 7.58,12 12,12 C16.42,12 20,15.58 20,20Z" fill={color} />
    </Svg>
  );
}

function UKFlagMini({ size = 22 }) {
  const h = size * 0.62;
  return (
    <Svg width={size} height={h} viewBox="0 0 44 28">
      <Rect width="44" height="28" fill="#012169" />
      <Path d="M0,0 L44,28 M44,0 L0,28" stroke="#fff" strokeWidth="5" />
      <Path d="M0,0 L44,28 M44,0 L0,28" stroke="#C8102E" strokeWidth="3" />
      <Path d="M22,0 V28 M0,14 H44" stroke="#fff" strokeWidth="9" />
      <Path d="M22,0 V28 M0,14 H44" stroke="#C8102E" strokeWidth="5.5" />
    </Svg>
  );
}

function RunnerIcon({ size = 28, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="14.5" cy="3.5" r="2.5" fill={color} />
      <Path
        d="M20.5,9.5L17,9L14.5,7L11,8.5L8,12H6V14H9L12,11L12.5,14L9,17V22H11V18L14,15L14.5,18L17.5,22H19.5L16,16.5L14.5,12L17,9.5L20.5,11V9.5Z"
        fill={color}
      />
    </Svg>
  );
}

function PlusIcon({ size = 18, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill={color} />
    </Svg>
  );
}

// ─── Team member data ─────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    id: 1,
    avatar: 'flag', // renders UK flag
    name: 'Cluster Manager - Sarah Khan',
    status: 'Online',
    statusColor: GREEN,
    detail: '2.3km away',
    online: true,
  },
  {
    id: 2,
    avatar: 'runner',
    name: 'Runner - Michael Brown',
    status: 'Online',
    statusColor: GREEN,
    detail: 'Delivering materials',
    online: true,
  },
  {
    id: 3,
    avatar: 'person',
    name: 'Canvasser - Priya Patel',
    status: 'Online',
    statusColor: GREEN,
    detail: 'Polling Div. 12',
    online: true,
  },
  {
    id: 4,
    avatar: 'person',
    name: 'Canvasser - Jamal Wright',
    status: 'Offline',
    statusColor: RED,
    detail: 'Last active 18 mins ago',
    online: false,
  },
  {
    id: 5,
    avatar: 'person',
    name: 'Canvasser - Lisa Thompson',
    status: 'Online',
    statusColor: GREEN,
    detail: 'Polling Div. 7',
    online: true,
  },
];

function AvatarCircle({ type }) {
  const size = 48;
  return (
    <View style={avSt.wrap}>
      {type === 'flag' ? (
        <View style={[avSt.circle, { backgroundColor: '#012169', overflow: 'hidden' }]}>
          <UKFlagMini size={48} />
        </View>
      ) : type === 'runner' ? (
        <View style={[avSt.circle, { backgroundColor: NAVY }]}>
          <RunnerIcon size={26} color={GOLD} />
        </View>
      ) : (
        <View style={[avSt.circle, { backgroundColor: NAVY }]}>
          <PersonIcon size={28} color={GOLD} />
        </View>
      )}
    </View>
  );
}

const avSt = StyleSheet.create({
  wrap:   { position: 'relative' },
  circle: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: GOLD,
    overflow: 'hidden',
  },
});

// ─── TeamChatScreen ───────────────────────────────────────────────────────────

export default function TeamChatScreen({ navigation }) {
  return (
    <View style={st.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: NAVY }} edges={['top']}>
        <View style={st.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={st.headerBtn}>
            <BackArrow size={24} color={WHITE} />
          </TouchableOpacity>

          <Text style={st.headerTitle}>My Team</Text>

          <TouchableOpacity style={st.headerBtn}>
            <RefreshIcon size={22} color={WHITE} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.scroll}>

        <Text style={st.sectionHeading}>Live Team Members</Text>

        {TEAM_MEMBERS.map(member => (
          <View key={member.id} style={st.card}>
            {/* Avatar */}
            <AvatarCircle type={member.avatar} />

            {/* Status dot overlay */}
            <View style={[
              st.statusDot,
              { backgroundColor: member.online ? GREEN : RED },
            ]} />

            {/* Info */}
            <View style={st.cardInfo}>
              <Text style={st.cardName}>{member.name}</Text>
              <View style={st.cardStatusRow}>
                <View style={[st.statusBadge, { backgroundColor: member.online ? '#DCFCE7' : '#FEE2E2' }]}>
                  <Text style={[st.statusBadgeText, { color: member.online ? '#15803D' : '#DC2626' }]}>
                    {member.status}
                  </Text>
                </View>
                <Text style={st.cardDetail}>{member.detail}</Text>
              </View>
            </View>

            {/* Chevron */}
            <Text style={st.chevron}>{'›'}</Text>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating invite button */}
      <TouchableOpacity style={st.fab} activeOpacity={0.85}>
        <PlusIcon size={18} color={NAVY} />
        <Text style={st.fabText}>Invite New Canvasser</Text>
      </TouchableOpacity>
    </View>
  );
}

const st = StyleSheet.create({
  root:   { flex: 1, backgroundColor: NAVY },
  scroll: { paddingHorizontal: 20, paddingTop: 8 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerBtn:   { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, color: WHITE, fontWeight: '800', fontSize: 22, textAlign: 'center' },

  // Section heading
  sectionHeading: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 28,
    marginBottom: 16,
    letterSpacing: -0.3,
  },

  // Card
  card: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  statusDot: {
    position: 'absolute',
    left: 48,
    top: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: WHITE,
    zIndex: 2,
  },
  cardInfo: { flex: 1, marginLeft: 12 },
  cardName: {
    color: NAVY, fontWeight: '800', fontSize: 18, marginBottom: 6,
  },
  cardStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusBadge:   {
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10,
  },
  statusBadgeText: { fontSize: 14, fontWeight: '700' },
  cardDetail:      { color: '#666', fontSize: 15, fontWeight: '500', flex: 1 },
  chevron:         { color: GOLD, fontSize: 28, fontWeight: '900', marginLeft: 6 },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: GOLD,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  fabText: { color: NAVY, fontWeight: '800', fontSize: 19 },
});
