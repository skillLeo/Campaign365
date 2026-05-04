import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const TEAL = '#0D7377';

const SUPPORT_LEVELS = [
  { key: 'strong',    label: 'Strong SKNLP\nSupporter' },
  { key: 'leans',     label: 'Leans SKNLP' },
  { key: 'undecided', label: 'Undecided' },
  { key: 'oppose',    label: 'Leans\nOpposition' },
];

function Waveform({ recording }) {
  const heights = [4,7,12,9,15,10,13,7,11,9,6,13,10,15,9,11,7,12,8,14,10,7,12,9,15,11,8,13,10,7];
  const anims = useRef(heights.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    if (recording) {
      const loops = anims.map((a, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(a, { toValue: 1 + Math.random() * 2, duration: 200 + i * 20, useNativeDriver: false }),
            Animated.timing(a, { toValue: 0.3, duration: 200 + i * 15, useNativeDriver: false }),
          ])
        )
      );
      loops.forEach(l => l.start());
      return () => loops.forEach(l => l.stop());
    } else {
      anims.forEach(a => a.setValue(1));
    }
  }, [recording]);

  return (
    <View style={wv.row}>
      {heights.map((h, i) => (
        <Animated.View key={i} style={[wv.bar, {
          height: anims[i].interpolate({ inputRange: [0, 2], outputRange: [3, h * 2.5] }),
          backgroundColor: recording ? RED : 'rgba(255,255,255,0.25)',
        }]} />
      ))}
    </View>
  );
}

const wv = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 3, height: 60, paddingHorizontal: 8 },
  bar: { width: 4, borderRadius: 2 },
});

export default function VoterInteractionScreen({ navigation }) {
  const [selected,  setSelected]  = useState(null);
  const [recording, setRecording] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (recording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,   duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [recording]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerFlag}>🇰🇳</Text>
            <Text style={styles.headerTitle}>Campaign 365</Text>
          </View>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={{ fontSize: 18 }}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Voter info bar */}
      <View style={styles.voterBar}>
        <Text style={styles.voterBarText}>Voter: Michael Edwards — Basseterre</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

        {/* Support level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick-Tap Support Level</Text>
          <View style={styles.grid}>
            {SUPPORT_LEVELS.map(s => (
              <TouchableOpacity
                key={s.key}
                style={[styles.supportCard, selected === s.key && styles.supportCardActive]}
                onPress={() => setSelected(s.key)}
              >
                <Text style={[styles.supportCardTxt, selected === s.key && styles.supportCardTxtActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Waveform + mic */}
        <View style={styles.micSection}>
          <View style={styles.waveWrap}>
            <Waveform recording={recording} />
            <Animated.View style={[styles.micOuter, { transform: [{ scale: pulseAnim }] }]}>
              <TouchableOpacity
                style={[styles.micBtn, recording && styles.micBtnActive]}
                onPress={() => setRecording(v => !v)}
              >
                <Text style={styles.micIcon}>🎤</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* Transcription box */}
        <View style={styles.transcriptionWrap}>
          <View style={styles.transcriptionHeader}>
            <Text style={styles.transcriptionLabel}>Real-Time Trascription</Text>
          </View>
          <View style={styles.transcriptionBody}>
            <Text style={styles.transcriptionText}>
              Voter says: "I like the Labour education plan"
            </Text>
          </View>
          <View style={styles.autoTagBar}>
            <Text style={styles.autoTagText}>✓ Auto-Tagged Strong SKNLP</Text>
          </View>
        </View>

        {/* Save & Next */}
        <View style={styles.bottomWrap}>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => navigation.navigate('CanvassingComplete')}
          >
            <Text style={styles.saveBtnTxt}>Save &amp; Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1A2E' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  backBtn:      { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backArrow:    { color: 'white', fontSize: 28, fontWeight: '300' },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerFlag:   { fontSize: 22 },
  headerTitle:  { color: 'white', fontSize: 17, fontWeight: '800' },
  settingsBtn:  { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  voterBar: {
    backgroundColor: TEAL, paddingVertical: 12, paddingHorizontal: 20,
  },
  voterBarText: { color: 'white', fontWeight: '800', fontSize: 15, textAlign: 'center' },
  section: { padding: 20 },
  sectionTitle: { color: 'white', fontWeight: '800', fontSize: 17, textAlign: 'center', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  supportCard: {
    width: (width - 52) / 2,
    backgroundColor: TEAL,
    borderRadius: 14, paddingVertical: 20, paddingHorizontal: 12,
    alignItems: 'center', justifyContent: 'center', minHeight: 72,
  },
  supportCardActive: { backgroundColor: '#0a5558', borderWidth: 2, borderColor: 'white' },
  supportCardTxt: { color: 'white', fontWeight: '800', fontSize: 15, textAlign: 'center' },
  supportCardTxtActive: { color: 'white' },
  micSection: { paddingHorizontal: 20, marginBottom: 8 },
  waveWrap: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16, overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: 16, position: 'relative',
  },
  micOuter: {
    position: 'absolute',
    shadowColor: RED, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 20, elevation: 12,
  },
  micBtn: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: RED,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
  },
  micBtnActive: { backgroundColor: '#a00020' },
  micIcon: { fontSize: 30 },
  transcriptionWrap: {
    marginHorizontal: 20, marginBottom: 16,
    borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  transcriptionHeader: { backgroundColor: RED, paddingVertical: 10, paddingHorizontal: 16 },
  transcriptionLabel:  { color: 'white', fontWeight: '800', fontSize: 14 },
  transcriptionBody:   { backgroundColor: '#1E293B', padding: 16 },
  transcriptionText:   { color: 'white', fontSize: 16, fontWeight: '600', lineHeight: 24 },
  autoTagBar: { backgroundColor: '#22C55E', paddingVertical: 10, paddingHorizontal: 16 },
  autoTagText: { color: 'white', fontWeight: '800', fontSize: 13 },
  bottomWrap: { paddingHorizontal: 20, paddingBottom: 40 },
  saveBtn: {
    backgroundColor: RED, borderRadius: 14, paddingVertical: 17, alignItems: 'center',
    shadowColor: RED, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 10,
  },
  saveBtnTxt: { color: 'white', fontWeight: '900', fontSize: 17 },
});
