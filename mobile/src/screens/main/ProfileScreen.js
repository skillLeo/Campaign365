import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, G } from 'react-native-svg';
import { useAuth } from '../../store/authStore';

const NAVY     = '#001F3F';
const GOLD     = '#C9A227';
const WHITE    = '#FFFFFF';
const LIGHT_BG = '#F4F5F7';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function BackArrow({ size = 24, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M20,11H7.83L13.42,5.41L12,4L4,12L12,20L13.41,18.59L7.83,13H20V11Z" fill={color} />
    </Svg>
  );
}

function UKFlagSmall() {
  return (
    <Svg width={30} height={20} viewBox="0 0 44 28">
      <Rect width="44" height="28" fill="#012169" />
      <Path d="M0,0 L44,28 M44,0 L0,28" stroke="#fff" strokeWidth="5" />
      <Path d="M0,0 L44,28 M44,0 L0,28" stroke="#C8102E" strokeWidth="3" />
      <Path d="M22,0 V28 M0,14 H44" stroke="#fff" strokeWidth="9" />
      <Path d="M22,0 V28 M0,14 H44" stroke="#C8102E" strokeWidth="5.5" />
    </Svg>
  );
}

function JamFlagSmall() {
  return (
    <Svg width={30} height={20} viewBox="0 0 44 28">
      <Rect width="44" height="28" fill="#000" />
      <Path d="M0,0 L44,28 M0,28 L44,0" stroke="#FFD700" strokeWidth="8" />
      <Path d="M0,0 L22,14 L0,28Z" fill="#00A551" />
      <Path d="M44,0 L22,14 L44,28Z" fill="#00A551" />
    </Svg>
  );
}

function EditIcon({ size = 18, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25ZM20.71,7.04C21.1,6.65 21.1,6.02 20.71,5.63L18.37,3.29C17.98,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z"
        fill={color}
      />
    </Svg>
  );
}

function ChevronRight({ size = 20, color = '#999' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M10,6L8.59,7.41L13.17,12L8.59,16.59L10,18L16,12L10,6Z" fill={color} />
    </Svg>
  );
}

function PersonRedIcon({ size = 22 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="7" r="5" fill="#EF4444" />
      <Path d="M4,21 C4,16.58 7.58,13 12,13 C16.42,13 20,16.58 20,21Z" fill="#EF4444" />
    </Svg>
  );
}

function PersonGrayIcon({ size = 22 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="7" r="5" fill="#9CA3AF" />
      <Path d="M4,21 C4,16.58 7.58,13 12,13 C16.42,13 20,16.58 20,21Z" fill="#9CA3AF" />
    </Svg>
  );
}

function PersonGreenIcon({ size = 22 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="7" r="5" fill="#22C55E" />
      <Path d="M4,21 C4,16.58 7.58,13 12,13 C16.42,13 20,16.58 20,21Z" fill="#22C55E" />
    </Svg>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────

function StatCard({ value, label }) {
  return (
    <View style={st.statCard}>
      <Text style={st.statValue}>{value}</Text>
      <Text style={st.statLabel}>{label}</Text>
    </View>
  );
}

function InfoRow({ label, value, last = false }) {
  return (
    <View style={[st.infoRow, !last && st.infoRowBorder]}>
      <Text style={st.infoLabel}>{label}</Text>
      <View style={st.infoRight}>
        {value ? <Text style={st.infoValue}>{value}</Text> : null}
        <ChevronRight size={18} color="#bbb" />
      </View>
    </View>
  );
}

// ─── ProfileScreen ────────────────────────────────────────────────────────────

export default function ProfileScreen({ navigation }) {
  const { user: authUser, logout } = useAuth();
  const user      = authUser || {};
  const userName  = user.name || 'Alex Johnson';
  const initials  = userName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <View style={st.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Navy header bar */}
      <SafeAreaView style={{ backgroundColor: NAVY }} edges={['top']}>
        <View style={st.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={st.headerBtn}>
            <BackArrow size={24} color={WHITE} />
          </TouchableOpacity>
          <Text style={st.headerTitle}>Profile</Text>
          <View style={st.headerBtn} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={st.scroll}
      >
        {/* Avatar section */}
        <View style={st.avatarSection}>
          <View style={st.avatarRing}>
            <View style={st.avatarCircle}>
              <Text style={st.avatarText}>{initials}</Text>
            </View>
          </View>
          <Text style={st.profileName}>Alex Johnson - Canvasser</Text>
          <Text style={st.profileLocation}>Kingston Central</Text>
        </View>

        {/* 3 stat cards */}
        <View style={st.statsRow}>
          <StatCard value="187" label="Doors Knocked" />
          <StatCard value="68%" label="Avg Support"   />
          <StatCard value="14"  label="Voice Notes Recorded" />
        </View>

        {/* Achievements */}
        <View style={st.sectionCard}>
          <Text style={st.sectionTitle}>My Achievements</Text>
          <View style={st.achieveRow}>
            <UKFlagSmall />
            <View style={st.achieveBadge}>
              <Text style={st.achieveBadgeText}>Top Canvasser Week 1</Text>
            </View>
          </View>
          <View style={[st.achieveRow, { marginTop: 10 }]}>
            <JamFlagSmall />
            <View style={st.achieveBadge}>
              <Text style={st.achieveBadgeText}>100 Doors Club</Text>
            </View>
          </View>
        </View>

        {/* Account Information */}
        <View style={st.sectionCard}>
          <Text style={st.sectionTitle}>Account Information</Text>
          <InfoRow label="Email"             />
          <InfoRow label="Phone"             />
          <InfoRow label="Emergency Contact" last />
        </View>

        {/* Language */}
        <View style={st.sectionCard}>
          <View style={st.langRow}>
            <View style={{ flex: 1 }}>
              <Text style={st.sectionTitle}>Preferred Language</Text>
              <Text style={st.langValue}>English / Jamaican Patois</Text>
            </View>
            <View style={st.langIcons}>
              <PersonRedIcon   size={20} />
              <PersonGrayIcon  size={20} />
              <PersonGreenIcon size={20} />
            </View>
          </View>
          <ChevronRight size={18} color="#bbb" />
        </View>

        {/* Edit Profile button */}
        <TouchableOpacity style={st.editBtn} activeOpacity={0.85}>
          <EditIcon size={18} color={NAVY} />
          <Text style={st.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Logout button */}
        <TouchableOpacity
          style={st.logoutBtn}
          activeOpacity={0.85}
          onPress={async () => {
            await logout();
            navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Login' }] });
          }}
        >
          <Text style={st.logoutBtnText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  root:   { flex: 1, backgroundColor: LIGHT_BG },
  scroll: { paddingHorizontal: 20, paddingTop: 20 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBtn:   { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: {
    flex: 1, color: GOLD, fontWeight: '900', fontSize: 25, textAlign: 'center',
  },

  // Avatar
  avatarSection: { alignItems: 'center', marginBottom: 24 },
  avatarRing: {
    width: 88, height: 88, borderRadius: 44,
    borderWidth: 3, borderColor: GOLD,
    padding: 3,
    marginBottom: 12,
  },
  avatarCircle: {
    flex: 1, borderRadius: 40,
    backgroundColor: NAVY,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText:    { color: WHITE, fontWeight: '900', fontSize: 30 },
  profileName:   { color: NAVY, fontWeight: '800', fontSize: 21, marginBottom: 4 },
  profileLocation: { color: '#888', fontSize: 18 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: GOLD,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  statValue: { color: NAVY, fontWeight: '900', fontSize: 28, lineHeight: 32 },
  statLabel: { color: 'rgba(0,31,63,0.75)', fontSize: 12, fontWeight: '700', textAlign: 'center', marginTop: 3 },

  // Section card
  sectionCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: { color: NAVY, fontWeight: '800', fontSize: 20, marginBottom: 12 },

  // Achievements
  achieveRow:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
  achieveBadge: {
    backgroundColor: GOLD,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  achieveBadgeText: { color: NAVY, fontWeight: '700', fontSize: 16 },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoRowBorder:   { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  infoLabel:       { color: NAVY, fontWeight: '600', fontSize: 18 },
  infoRight:       { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoValue:       { color: '#888', fontSize: 16 },

  // Language row
  langRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  langValue: { color: '#666', fontSize: 16, marginTop: 2 },
  langIcons: { flexDirection: 'row', gap: 2 },

  // Edit button
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  editBtnText: { color: NAVY, fontWeight: '900', fontSize: 20 },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#FECACA',
  },
  logoutBtnText: { color: '#DC2626', fontWeight: '800', fontSize: 20 },
});
