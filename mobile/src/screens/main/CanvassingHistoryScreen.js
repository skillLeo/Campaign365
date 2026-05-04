import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { canvassingAPI } from '../../services/api';

const { width } = Dimensions.get('window');
const RED = '#DC143C';

const BG_COLORS = [
  ['#1a4a2a', '#2d7a3a'],
  ['#3a2a1a', '#6a4a2a'],
  ['#1a2a4a', '#2a3a6a'],
  ['#2a1a3a', '#4a2a6a'],
];

const HISTORY = [
  { date: 'Sat, 10 May 2023', location: 'Sandy Point', voters: 45, notes: 'Discussed local issues', turf: 'Turf A', synced: true,  hasAudio: true,  hasWave: false },
  { date: 'Sat, 10 May 2023', location: 'Sandy Point', voters: 45, notes: 'Discussed local issues', turf: 'Turf B', synced: true,  hasAudio: true,  hasWave: true  },
  { date: 'Sat, 10 May 2023', location: 'Sandy Point', voters: 45, notes: 'Discussed local issues', turf: 'Turf C', synced: true,  hasAudio: false, hasWave: true  },
  { date: 'Sat, 10 May 2023', location: 'Sandy Point', voters: 45, notes: 'Discussed local issues', turf: 'Turf D', synced: false, hasAudio: true,  hasWave: false },
];

function WaveBar() {
  const bars = [3,6,9,6,12,8,5,10,7,4,9,6,11,8,5];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 6 }}>
      {bars.map((h, i) => (
        <View key={i} style={{ width: 3, height: h, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
      ))}
    </View>
  );
}

const BACK_BTN = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginRight: 4 }}>
    <Text style={{ color: 'white', fontSize: 28, fontWeight: '300', lineHeight: 28 }}>‹</Text>
  </TouchableOpacity>
);

export default function CanvassingHistoryScreen({ navigation }) {
  const [tab, setTab] = useState('This Week');
  const [history, setHistory] = useState(HISTORY);

  useEffect(() => {
    canvassingAPI.lists().then(res => {
      const lists = res.data || [];
      if (lists.length > 0) {
        setHistory(lists.map((l, i) => ({
          id: l.id,
          date: l.walk_date ? new Date(l.walk_date).toLocaleDateString('en-US', {weekday:'short', day:'numeric', month:'short', year:'numeric'}) : 'Scheduled',
          location: l.area_name || 'Basseterre',
          voters: l.visited_count || 0,
          notes: `${l.name}`,
          turf: `Turf ${i + 1}`,
          synced: l.status === 'completed',
          hasAudio: false,
          hasWave: false,
        })));
      }
    }).catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          <BACK_BTN navigation={navigation} />
          <View style={styles.logoRow}>
            <Text style={styles.flagEmoji}>🇰🇳</Text>
            <Text style={styles.logoSKNLP}>SKNLP</Text>
            <Text style={styles.logoCamp}>CAMPAIGN 365</Text>
          </View>
          <TouchableOpacity style={styles.menuBtn}>
            <Text style={styles.menuIcon}>≡</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>My Canvassing History</Text>

        {/* Tab switcher */}
        <View style={styles.tabWrap}>
          {['This Week', 'All Time'].map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabTxt, tab === t && styles.tabTxtActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, gap: 14 }}>
        {history.map((item, i) => (
          <TouchableOpacity
            key={item.id ?? i}
            style={[styles.card, { backgroundColor: BG_COLORS[i % BG_COLORS.length][0] }]}
            activeOpacity={0.85}
          >
            {/* Gradient overlay */}
            <View style={[styles.cardOverlay, { backgroundColor: BG_COLORS[i % BG_COLORS.length][1] }]} />

            <View style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>
                <Text style={styles.cardVoters}>{item.voters} Voters Contacted</Text>
                <Text style={styles.cardNotes}>Key Notes: {item.notes}</Text>
                {item.turf && <Text style={styles.cardTurf}>{item.turf}</Text>}
                {item.hasWave && <WaveBar />}
              </View>

              <View style={styles.cardRight}>
                {item.hasAudio && (
                  <TouchableOpacity style={styles.audioBtn}>
                    <Text style={styles.audioIcon}>🔊</Text>
                  </TouchableOpacity>
                )}
                <View style={[styles.checkCircle, item.synced && styles.checkCircleSynced]}>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080E1C' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  logoRow:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flagEmoji:  { fontSize: 22 },
  logoSKNLP:  { color: 'white', fontWeight: '900', fontSize: 15, letterSpacing: 1 },
  logoCamp:   { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  menuBtn:    { padding: 4 },
  menuIcon:   { color: 'white', fontSize: 22 },
  title: {
    color: 'white', fontSize: 26, fontWeight: '900',
    paddingHorizontal: 20, marginBottom: 16, letterSpacing: -0.5,
  },
  tabWrap: {
    flexDirection: 'row', marginHorizontal: 20,
    backgroundColor: '#1E293B', borderRadius: 12, padding: 4,
    marginBottom: 4,
  },
  tabBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 9, alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: '#334155' },
  tabTxt:       { color: 'rgba(255,255,255,0.5)', fontWeight: '600', fontSize: 14 },
  tabTxtActive: { color: 'white', fontWeight: '800' },
  card: {
    borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
  cardOverlay: {
    position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%',
    opacity: 0.5,
  },
  cardContent: {
    flexDirection: 'row', padding: 16, gap: 12,
  },
  cardDate:     { color: 'white', fontWeight: '700', fontSize: 14, marginBottom: 2 },
  cardLocation: { color: '#22C55E', fontWeight: '800', fontSize: 16, marginBottom: 3 },
  cardVoters:   { color: 'white', fontWeight: '800', fontSize: 14, marginBottom: 3 },
  cardNotes:    { color: 'rgba(255,255,255,0.65)', fontSize: 12 },
  cardTurf:     { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 3 },
  cardRight:    { alignItems: 'center', justifyContent: 'center', gap: 12 },
  audioBtn:     { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  audioIcon:    { fontSize: 18 },
  checkCircle:  { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  checkCircleSynced: { backgroundColor: RED },
  checkIcon:    { color: 'white', fontWeight: '900', fontSize: 18 },
});
