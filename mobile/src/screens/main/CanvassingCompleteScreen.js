import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const GREEN = '#22C55E';

const STATS = [
  { icon: '⚡', label: 'Voters\nContacted',      value: '87' },
  { icon: '↗',  label: 'Positive\nResponses',    value: '42' },
  { icon: '👤', label: 'STT\nTranscriptions',    value: '31' },
];

const NOTES = [
  { text: 'Met John at Market St. — very supportive!', synced: true,  playing: true  },
  { text: 'Spoke to Maria about community plans',      synced: false, playing: false },
  { text: 'Spoke to Maria about community plans',      synced: true,  playing: false },
  { text: 'Spoke to Maria about community plans',      synced: false, playing: false },
  { text: 'Spoke to Maria about community plans',      synced: true,  playing: false },
  { text: 'Spoke to Maria about community plans',      synced: false, playing: false },
  { text: 'Spoke to Maria about community plans',      synced: false, playing: false },
];

export default function CanvassingCompleteScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
      Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.topBar}>
          <Animated.View style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.logoNum}>365</Text>
          </Animated.View>
          <TouchableOpacity style={styles.menuBtn}>
            <Text style={styles.menuIcon}>≡</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Animated.View style={[styles.titleWrap, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Today's Canvassing{'\n'}Complete</Text>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.subtitle}>Great Work!</Text>
        </Animated.View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map((s, i) => (
            <Animated.View
              key={i}
              style={[styles.statCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
            >
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <View style={styles.statBar} />
            </Animated.View>
          ))}
        </View>

        {/* Today's Key Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Today's Key Notes</Text>
          {NOTES.map((n, i) => (
            <View key={i} style={styles.noteRow}>
              <Text style={[styles.noteTxt, !n.synced && { color: 'rgba(255,255,255,0.4)' }]} numberOfLines={1}>
                {n.text}
              </Text>
              <View style={styles.noteIcons}>
                <Text style={styles.noteChat}>💬</Text>
                {n.playing
                  ? <TouchableOpacity style={styles.playBtn}><Text style={styles.playIcon}>▶</Text></TouchableOpacity>
                  : <Text style={styles.noteArrow}>»</Text>
                }
                {n.synced && <View style={styles.syncDot} />}
              </View>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.btnWrap}>
          <TouchableOpacity
            style={styles.syncBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.syncBtnTxt}>Sync &amp; Finish Day</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn}>
            <Text style={styles.continueTxt}>Continue Tomorrow</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 10,
  },
  logo: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.1)',
  },
  logoNum:  { color: 'white', fontWeight: '900', fontSize: 13 },
  menuBtn:  { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  menuIcon: { color: 'white', fontSize: 22 },
  titleWrap: {
    alignItems: 'center', paddingTop: 16, paddingBottom: 24,
    flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap',
    paddingHorizontal: 32, gap: 12,
  },
  title: {
    color: 'white', fontSize: 26, fontWeight: '900', textAlign: 'center',
    lineHeight: 32, flex: 1,
  },
  checkCircle: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: GREEN,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: GREEN, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8,
  },
  checkMark: { color: 'white', fontSize: 20, fontWeight: '900' },
  subtitle:  { color: 'white', fontSize: 18, fontWeight: '700', width: '100%', textAlign: 'center', marginTop: -8 },
  statsRow: {
    flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 24,
  },
  statCard: {
    flex: 1, backgroundColor: '#1E293B', borderRadius: 14, padding: 14,
    alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  statIcon:  { fontSize: 20, marginBottom: 6 },
  statLabel: { color: '#64748B', fontSize: 10, textAlign: 'center', marginBottom: 4, lineHeight: 14 },
  statValue: { color: 'white', fontSize: 28, fontWeight: '900' },
  statBar:   { width: '100%', height: 2, backgroundColor: GREEN, borderRadius: 1, marginTop: 8 },
  notesSection: { paddingHorizontal: 20 },
  notesTitle:   { color: 'white', fontSize: 16, fontWeight: '800', marginBottom: 12 },
  noteRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#1E293B', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  noteTxt:   { color: 'white', fontSize: 13, flex: 1, marginRight: 8 },
  noteIcons: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  noteChat:  { fontSize: 14 },
  noteArrow: { color: 'rgba(255,255,255,0.3)', fontSize: 14, fontWeight: '700' },
  playBtn:   { width: 24, height: 24, borderRadius: 12, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center' },
  playIcon:  { color: 'white', fontSize: 10 },
  syncDot:   { width: 6, height: 6, borderRadius: 3, backgroundColor: GREEN },
  btnWrap: { paddingHorizontal: 20, paddingTop: 20, gap: 12 },
  syncBtn: {
    backgroundColor: GREEN, borderRadius: 14, paddingVertical: 18, alignItems: 'center',
    shadowColor: GREEN, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12,
  },
  syncBtnTxt:  { color: 'white', fontWeight: '900', fontSize: 17 },
  continueBtn: { paddingVertical: 14, alignItems: 'center' },
  continueTxt: { color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: '600' },
});
