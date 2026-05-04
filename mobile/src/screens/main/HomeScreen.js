import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Dimensions, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, Line, G } from 'react-native-svg';
import { useAuth } from '../../store/authStore';
import { dashboardAPI, canvassingAPI } from '../../services/api';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const GOLD = '#D4A017';

const FALLBACK_TURFS = [
  { id: 1, name: 'Turf 1', total_voters: 87, progress: 42, status: 'active'   },
  { id: 2, name: 'Turf 2', total_voters: 87, progress: 42, status: 'inactive' },
  { id: 3, name: 'Turf 3', total_voters: 87, progress: 42, status: 'inactive' },
];

function TurfMap() {
  const mapW = width - 48;
  const mapH = 200;
  return (
    <Svg width={mapW} height={mapH} viewBox={`0 0 ${mapW} ${mapH}`}>
      <Rect width={mapW} height={mapH} rx={12} fill="#1a1a2e" />

      {/* Grid */}
      {[30,60,90,120,150,180].map(y => (
        <Line key={`h${y}`} x1={0} y1={y} x2={mapW} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      ))}
      {[40,80,120,160,200,240,280].map(x => (
        <Line key={`v${x}`} x1={x} y1={0} x2={x} y2={mapH} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      ))}

      {/* Roads */}
      <Path d={`M0,${mapH*0.5} Q${mapW*0.4},${mapH*0.35} ${mapW*0.7},${mapH*0.55} L${mapW},${mapH*0.45}`}
        stroke="rgba(255,255,255,0.12)" strokeWidth={4} fill="none" />
      <Path d={`M${mapW*0.3},0 Q${mapW*0.35},${mapH*0.4} ${mapW*0.45},${mapH}`}
        stroke="rgba(255,255,255,0.1)" strokeWidth={3} fill="none" />
      <Path d={`M0,${mapH*0.7} Q${mapW*0.5},${mapH*0.6} ${mapW},${mapH*0.75}`}
        stroke="rgba(255,255,255,0.08)" strokeWidth={2} fill="none" />

      {/* Red highlighted zone (turf area) */}
      <Path d={`M${mapW*0.2},${mapH*0.15} L${mapW*0.6},${mapH*0.1} L${mapW*0.65},${mapH*0.7} L${mapW*0.15},${mapH*0.75} Z`}
        fill="rgba(220,20,60,0.25)" stroke={RED} strokeWidth={2} strokeDasharray="4,4" />

      {/* Location pins */}
      {[
        { x: mapW*0.3,  y: mapH*0.2 },
        { x: mapW*0.42, y: mapH*0.35 },
        { x: mapW*0.28, y: mapH*0.5 },
        { x: mapW*0.5,  y: mapH*0.55 },
        { x: mapW*0.38, y: mapH*0.65 },
        { x: mapW*0.55, y: mapH*0.25 },
      ].map((p, i) => (
        <G key={i}>
          <Circle cx={p.x} cy={p.y} r={12} fill={RED} opacity={0.9} />
          <Circle cx={p.x} cy={p.y} r={5}  fill="white" />
          <Path d={`M${p.x},${p.y+12} L${p.x},${p.y+20}`} stroke={RED} strokeWidth={2} strokeLinecap="round" />
        </G>
      ))}
    </Svg>
  );
}

function CircleProgress({ pct }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <Svg width={50} height={50} viewBox="0 0 50 50">
      <Circle cx={25} cy={25} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={4} />
      <Circle cx={25} cy={25} r={r} fill="none" stroke={GOLD} strokeWidth={4}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ / 4} strokeLinecap="round" />
      <Path d="M18,25 L22,29 L32,20" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

const QUICK_SCREENS = [
  { label: '📋 Campaign Materials', route: 'CampaignMaterials' },
  { label: '🏃 Runner Tracking',    route: 'RunnerTracking'    },
  { label: '🗳️ GOTV Mode',          route: 'GOTV'              },
  { label: '📊 Quick Reports',       route: 'QuickReports'      },
  { label: '🤖 AI Insights',         route: 'AIInsights'        },
  { label: '📜 Canvass History',     route: 'CanvassingHistory' },
  { label: '👤 Voter Profile',       route: 'VoterProfile'      },
  { label: '🚨 Panic Screen',        route: 'Panic'             },
  { label: '📅 My Schedule',         route: 'Schedule'          },
  { label: '➕ Quick Add Voter',      route: 'QuickAddVoter'     },
  { label: '⚠️ Report Issue',         route: 'ReportIssue'       },
  { label: '🗳 Election Night',       route: 'ElectionNight'     },
  { label: '🤝 Recruit Volunteer',   route: 'RecruitVolunteer'  },
  { label: '🚪 Logout Screen',       route: 'Logout'            },
  { label: '✅ Sync Complete',        route: 'SyncComplete'      },
  { label: '❓ Help & Training',      route: 'Help'              },
];

export default function HomeScreen({ route, navigation }) {
  const { user: authUser } = useAuth();
  const user = authUser || route?.params?.user || { name: 'General Secretary', role: 'general_secretary' };
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = (user.name || 'User').split(' ')[0];

  const [stats, setStats]   = useState(null);
  const [turfs, setTurfs]   = useState(FALLBACK_TURFS);

  useEffect(() => {
    dashboardAPI.stats().then(res => setStats(res.data)).catch(() => {});
    canvassingAPI.lists().then(res => {
      const lists = res.data || [];
      if (lists.length > 0) {
        setTurfs(lists.map((l, i) => ({
          id: l.id,
          name: l.name || `Turf ${i + 1}`,
          total_voters: l.total_voters || 0,
          progress: l.total_voters > 0 ? Math.round((l.visited_count / l.total_voters) * 100) : 0,
          status: l.status,
        })));
      }
    }).catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080E1C" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          {/* Top bar */}
          <View style={styles.topBar}>
            <View>
              <View style={styles.logoRow}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoText}>365</Text>
                </View>
                <View>
                  <Text style={styles.logoSKNLP}>SKNLP</Text>
                  <Text style={styles.logoCampaign}>Campaign 365</Text>
                </View>
              </View>
            </View>
            <View style={styles.offlineBadge}>
              <View style={styles.offlineDot} />
              <Text style={styles.offlineText}>Offline Mode Ready</Text>
            </View>
          </View>

          {/* User name row */}
          <View style={styles.userRow}>
            <Text style={styles.userName}>{user.name} — {
              user.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1).replace(/_/g, ' ')
                : (user.roles?.[0]?.name || 'canvasser').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
            }</Text>
            <Text style={styles.chevron}>‹</Text>
          </View>

          {/* Greeting */}
          <View style={styles.greetWrap}>
            <Text style={styles.greeting}>{greeting}, {firstName}!</Text>
            <Text style={styles.greetSub}>Your Turfs Today</Text>
            {stats && (
              <View style={styles.statsRow}>
                <View style={styles.statPill}>
                  <Text style={styles.statNum}>{stats.voters_contacted}</Text>
                  <Text style={styles.statLbl}>Contacted</Text>
                </View>
                <View style={styles.statPill}>
                  <Text style={styles.statNum}>{stats.doors_knocked_today}</Text>
                  <Text style={styles.statLbl}>Doors Today</Text>
                </View>
                <View style={styles.statPill}>
                  <Text style={styles.statNum}>{stats.canvassers_active}</Text>
                  <Text style={styles.statLbl}>Active Now</Text>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>

        {/* Map */}
        <View style={styles.mapWrap}>
          <TurfMap />
          <View style={styles.locationLabel}>
            <Text style={styles.locationText}>Basseterre <Text style={{ color: 'rgba(255,255,255,0.4)' }}>St.</Text></Text>
          </View>
          <TouchableOpacity style={styles.mapArrow}>
            <CircleProgress pct={42} />
          </TouchableOpacity>
        </View>

        {/* Turf cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.turfScroll}
        >
          {turfs.map((t, i) => (
            <View key={t.id} style={[styles.turfCard, t.status === 'active' && styles.turfCardActive]}>
              <Text style={styles.turfTitle}>{t.name}</Text>
              <Text style={styles.turfVoters}>Voters: {t.total_voters} · Progress</Text>
              <Text style={styles.turfPct}>{t.progress}%</Text>
              <TouchableOpacity style={styles.canvassBtn}>
                <Text style={styles.canvassBtnText}>Start Canvassing</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Quick Screen Access */}
        <View style={styles.quickSection}>
          <Text style={styles.quickTitle}>Quick Screen Access</Text>
          <View style={styles.quickGrid}>
            {QUICK_SCREENS.map((s) => (
              <TouchableOpacity
                key={s.route}
                style={styles.quickBtn}
                onPress={() => navigation.navigate(s.route)}
              >
                <Text style={styles.quickBtnTxt}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080E1C' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoCircle: {
    width: 36, height: 36, borderRadius: 8,
    backgroundColor: RED,
    alignItems: 'center', justifyContent: 'center',
  },
  logoText:     { color: 'white', fontWeight: '900', fontSize: 11 },
  logoSKNLP:    { color: 'white', fontWeight: '900', fontSize: 14, letterSpacing: 0.5 },
  logoCampaign: { color: GOLD,   fontWeight: '600', fontSize: 10 },
  offlineBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderWidth: 1, borderColor: 'rgba(34,197,94,0.35)',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
  },
  offlineDot:  { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22C55E' },
  offlineText: { color: '#22C55E', fontSize: 11, fontWeight: '700' },
  userRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 8,
  },
  userName: { color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: '500' },
  chevron:  { color: 'rgba(255,255,255,0.3)', fontSize: 20 },
  greetWrap: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  statPill: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 10, paddingVertical: 10, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  statNum: { color: 'white', fontWeight: '900', fontSize: 18 },
  statLbl: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '600', marginTop: 2 },
  greeting: { color: 'white', fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  greetSub: { color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 4 },
  mapWrap: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  locationLabel: {
    position: 'absolute', bottom: 12, left: 16,
  },
  locationText: {
    color: 'white', fontSize: 15, fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 4,
  },
  mapArrow: {
    position: 'absolute', bottom: 8, right: 12,
  },
  turfScroll: {
    paddingHorizontal: 20,
    gap: 12,
    paddingRight: 32,
  },
  turfCard: {
    width: (width - 64) / 2.4,
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  turfCardActive: {
    backgroundColor: RED,
    borderColor: RED,
  },
  turfTitle:  { color: 'white', fontWeight: '800', fontSize: 15, marginBottom: 4 },
  turfVoters: { color: 'rgba(255,255,255,0.65)', fontSize: 11, marginBottom: 2 },
  turfPct:    { color: 'white', fontWeight: '900', fontSize: 22, marginBottom: 12 },
  canvassBtn: {
    backgroundColor: RED,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  canvassBtnText: { color: 'white', fontSize: 11, fontWeight: '800' },
  quickSection: { paddingHorizontal: 20, paddingTop: 8 },
  quickTitle: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 10 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickBtn: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
  },
  quickBtnTxt: { color: 'white', fontSize: 12, fontWeight: '600' },
});
