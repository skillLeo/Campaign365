import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const GOLD = '#D4A017';

const POLL_OPTIONS = [
  { key: 'sknlp',      label: 'SKNLP',      color: RED,      icon: '✓' },
  { key: 'opposition', label: 'Opposition',  color: '#2563EB',icon: '✓' },
  { key: 'undecided',  label: 'Undecided',   color: GOLD,     icon: '✓' },
  { key: 'other',      label: 'Other',       color: '#475569',icon: '✓' },
];

function Waveform({ active }) {
  const bars = [3,5,9,6,13,8,11,5,9,7,4,10,7,12,8,10,5,9,6,13,8,5,10,7,11,9,6,12,8,5];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, flex: 1 }}>
      {bars.map((h, i) => (
        <View key={i} style={{
          width: 3, height: active ? h * 2 : h,
          backgroundColor: active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
          borderRadius: 2,
        }} />
      ))}
    </View>
  );
}

export default function LivePollScreen({ navigation }) {
  const [selected,  setSelected]  = useState(null);
  const [recording, setRecording] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (recording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,    duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [recording]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        {/* Top bar */}
        <View style={styles.topBar}>
          <View style={styles.logoCol}>
            <View style={styles.logoRow}>
              <Text style={styles.logoEmoji}>🚀</Text>
              <Text style={styles.logoCamp}>Campaign 365</Text>
            </View>
            <Text style={styles.logoSKNLP}>SKNLP</Text>
          </View>
          <Text style={styles.userLabel}>Sarah James — Canvasser</Text>
        </View>

        {/* Offline badge */}
        <View style={styles.offlineWrap}>
          <View style={styles.offlineBadge}>
            <View style={styles.offlineDot} />
            <Text style={styles.offlineText}>Offline Mode Ready</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Live Voter Poll — Basseterre Turf</Text>
          <Text style={styles.subtitle}>Polling in your area</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Poll card */}
        <View style={styles.pollCard}>
          <Text style={styles.pollQuestion}>Who will you support on{'\n'}Election Day?</Text>
          <View style={styles.optionsGrid}>
            {POLL_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.optionBtn, { backgroundColor: opt.color }, selected === opt.key && styles.optionBtnSelected]}
                onPress={() => setSelected(opt.key)}
                activeOpacity={0.8}
              >
                <Text style={styles.optionIcon}>{opt.icon}</Text>
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dot indicators */}
          <View style={styles.dotsRow}>
            {[0,1,2,3,4,5].map(i => (
              <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* STT button */}
        <TouchableOpacity
          style={styles.sttBtn}
          onPress={() => setRecording(v => !v)}
          activeOpacity={0.85}
        >
          <Text style={styles.sttBtnTxt}>{recording ? '⏹ Stop Recording' : 'Start Speech-to-Text'}</Text>
        </TouchableOpacity>

        {/* Mic + waveform */}
        <View style={styles.micRow}>
          <Waveform active={recording} />
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={[styles.micBtn, recording && styles.micBtnActive]}
              onPress={() => setRecording(v => !v)}
            >
              <Text style={styles.micIcon}>🎤</Text>
            </TouchableOpacity>
          </Animated.View>
          <Waveform active={recording} />
        </View>

        {/* Transcript */}
        <View style={styles.transcriptBox}>
          <Text style={styles.transcriptText}>
            Voter: "I'm voting Labour because of the new hospital"
          </Text>
        </View>

        {/* Bottom counter row */}
        <View style={styles.counterRow}>
          <Text style={styles.counterText}>12/87 voters</Text>
          <View style={styles.micPill}>
            <Text style={{ fontSize: 16 }}>🎤</Text>
          </View>
          <Text style={styles.counterText}>polled today</Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Panic button floating */}
      <TouchableOpacity
        style={styles.panicFloat}
        onPress={() => navigation.navigate('Panic')}
      >
        <Text style={styles.panicFloatTxt}>Panic Button</Text>
        <Text style={styles.panicFloatSub}>Emergency: Hold 3s</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080E1C' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 8,
  },
  logoCol:   { gap: 0 },
  logoRow:   { flexDirection: 'row', alignItems: 'center', gap: 4 },
  logoEmoji: { fontSize: 14 },
  logoCamp:  { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
  logoSKNLP: { color: 'white', fontWeight: '900', fontSize: 20, letterSpacing: 1 },
  userLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: '600' },
  offlineWrap: { paddingHorizontal: 20, marginBottom: 8 },
  offlineBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start',
  },
  offlineDot:  { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22C55E' },
  offlineText: { color: 'white', fontSize: 12, fontWeight: '600' },
  titleWrap:   { paddingHorizontal: 20, paddingBottom: 12 },
  title:       { color: 'white', fontSize: 22, fontWeight: '900', lineHeight: 28 },
  subtitle:    { color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 3 },
  pollCard: {
    marginHorizontal: 20, backgroundColor: '#111827',
    borderRadius: 18, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  pollQuestion: {
    color: 'white', fontSize: 18, fontWeight: '800',
    textAlign: 'center', marginBottom: 20, lineHeight: 26,
  },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  optionBtn: {
    width: (width - 84) / 2,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 14, paddingHorizontal: 16,
    borderRadius: 12,
  },
  optionBtnSelected: { borderWidth: 2.5, borderColor: 'white' },
  optionIcon:  { color: 'white', fontWeight: '900', fontSize: 16 },
  optionLabel: { color: 'white', fontWeight: '800', fontSize: 15 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 16 },
  dot:       { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotActive: { backgroundColor: 'white', width: 18 },
  sttBtn: {
    marginHorizontal: 20, backgroundColor: RED, borderRadius: 30,
    paddingVertical: 16, alignItems: 'center', marginBottom: 14,
    shadowColor: RED, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 10,
  },
  sttBtnTxt: { color: 'white', fontWeight: '900', fontSize: 16 },
  micRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, gap: 10, marginBottom: 14,
  },
  micBtn: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.15)',
  },
  micBtnActive: { backgroundColor: RED, borderColor: RED },
  micIcon: { fontSize: 22 },
  transcriptBox: {
    marginHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14, padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  transcriptText: { color: 'white', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },
  counterRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 12, paddingVertical: 6,
  },
  counterText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600' },
  micPill: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  panicFloat: {
    position: 'absolute', bottom: 20, right: 16,
    backgroundColor: RED, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
    shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 10,
  },
  panicFloatTxt: { color: 'white', fontWeight: '900', fontSize: 12 },
  panicFloatSub: { color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 1 },
});
