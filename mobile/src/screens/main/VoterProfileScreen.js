import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { votersAPI } from '../../services/api';

const { width } = Dimensions.get('window');
const RED = '#DC143C';

export default function VoterProfileScreen({ route, navigation }) {
  const voterId = route?.params?.voterId;
  const [tab, setTab] = useState('Profile');
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    if (voterId) {
      votersAPI.show(voterId).then(res => setVoter(res.data)).catch(() => {});
    }
  }, [voterId]);

  const name = voter ? `${voter.first_name} ${voter.last_name}` : 'Michael Edwards';
  const initials = voter ? `${voter.first_name?.[0] || 'M'}${voter.last_name?.[0] || 'E'}` : 'ME';
  const address = voter?.address || 'House #4, Cayon, St. Kitts';
  const constituency = voter?.constituency || 'St. Christopher North';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: '#0F172A' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginRight: 4 }}>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: '300', lineHeight: 28 }}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerLeft}>
            <View style={styles.sknlpBadge}>
              <Text style={styles.sknlpBadgeFlag}>🇰🇳</Text>
              <Text style={styles.sknlpBadgeTxt}>SKNLP</Text>
            </View>
            <Text style={styles.headerName}>{name}</Text>
          </View>
          <TouchableOpacity style={styles.calendarBtn}>
            <Text style={{ fontSize: 20 }}>📅</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>Campaign 365</Text>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.voterName}>{name}</Text>
          <Text style={styles.voterAddr}>{address}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {['Profile', 'Voting History', 'Notes'].map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabTxt, tab === t && styles.tabTxtActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          {/* Support Level card */}
          <View style={[styles.card, styles.cardRed]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Support Level</Text>
              <Text style={{ fontSize: 20 }}>👥</Text>
            </View>
            <Text style={styles.supportJourney}>Undecided  ›  Leaning SKNLP</Text>
            {/* Progress bar */}
            <View style={styles.progressBg}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.supportNote}>Wife: SKNLP supporter</Text>
          </View>

          {/* Family Notes */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Family Notes</Text>
            <Text style={styles.familyLine}>Wife: SKNLP supporter</Text>
            <Text style={styles.familyLine}>Mother: SKNLP supporter</Text>
          </View>

          {/* STT Transcript */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>STT Transcript History</Text>
              <Text style={styles.transcriptTime}>12:34 PM</Text>
            </View>
            <Text style={styles.transcriptText}>Hello, my name is Michael Edwards</Text>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.bottomBar}>
        {[
          { icon: '↓', label: 'Update Support' },
          { icon: '✎', label: 'Add Note' },
          { icon: '📅', label: 'Schedule Follow-up' },
        ].map((a, i) => (
          <TouchableOpacity key={i} style={styles.actionBtn}>
            <Text style={styles.actionIcon}>{a.icon}</Text>
            <Text style={styles.actionLabel}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080E1C' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 4,
  },
  headerLeft:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sknlpBadge:   { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: RED, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  sknlpBadgeFlag: { fontSize: 14 },
  sknlpBadgeTxt:  { color: 'white', fontWeight: '900', fontSize: 12 },
  headerName:   { color: 'white', fontWeight: '800', fontSize: 16 },
  calendarBtn:  { padding: 6, backgroundColor: '#1E293B', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  headerSub:    { color: 'rgba(255,255,255,0.4)', fontSize: 11, paddingHorizontal: 20, paddingBottom: 10 },
  avatarSection: { alignItems: 'center', paddingVertical: 24 },
  avatarCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#334155',
    borderWidth: 3, borderColor: RED,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
    shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12,
  },
  avatarInitials: { color: 'white', fontWeight: '900', fontSize: 32 },
  voterName:  { color: 'white', fontSize: 24, fontWeight: '900', marginBottom: 4 },
  voterAddr:  { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  tabBar: {
    flexDirection: 'row', marginHorizontal: 20,
    backgroundColor: '#111827', borderRadius: 12, padding: 4, marginBottom: 16,
  },
  tabBtn: { flex: 1, paddingVertical: 9, borderRadius: 9, alignItems: 'center' },
  tabBtnActive: { backgroundColor: 'white' },
  tabTxt:       { color: 'rgba(255,255,255,0.5)', fontWeight: '600', fontSize: 13 },
  tabTxtActive: { color: '#111', fontWeight: '800' },
  content:  { paddingHorizontal: 20, gap: 12 },
  card: {
    backgroundColor: '#111827', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  cardRed: { borderColor: RED, borderWidth: 1.5 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle:     { color: 'white', fontWeight: '800', fontSize: 16 },
  supportJourney: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 10 },
  progressBg:  { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 10, overflow: 'hidden' },
  progressFill: { height: '100%', width: '75%', backgroundColor: '#22C55E', borderRadius: 3 },
  supportNote: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  familyLine:  { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 6 },
  transcriptTime: { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  transcriptText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 8, fontStyle: 'italic' },
  bottomBar: {
    flexDirection: 'row', backgroundColor: '#111827',
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 12, paddingHorizontal: 8,
  },
  actionBtn:   { flex: 1, alignItems: 'center', gap: 4 },
  actionIcon:  { fontSize: 20 },
  actionLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 10, fontWeight: '600', textAlign: 'center' },
});
