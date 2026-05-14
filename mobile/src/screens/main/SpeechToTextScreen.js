import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, G, Line, Ellipse } from 'react-native-svg';

const { width } = Dimensions.get('window');
const NAVY  = '#001F3F';
const GOLD  = '#C9A227';
const WHITE = '#FFFFFF';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function BackArrow({ size = 24, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M20,11H7.83L13.42,5.41L12,4L4,12L12,20L13.41,18.59L7.83,13H20V11Z" fill={color} />
    </Svg>
  );
}

function LargeMicIcon({ size = 80, color = GOLD }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80">
      {/* Outer glow ring */}
      <Circle cx="40" cy="40" r="38" fill="rgba(201,162,39,0.12)" />
      <Circle cx="40" cy="40" r="30" fill="rgba(201,162,39,0.18)" />
      {/* Mic body */}
      <Rect x="28" y="12" width="24" height="36" rx="12" fill={color} />
      {/* Mic stand arc */}
      <Path
        d="M18,40 C18,52.15 27.85,62 40,62 C52.15,62 62,52.15 62,40"
        stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"
      />
      {/* Stand pole */}
      <Rect x="38" y="62" width="4" height="10" rx="2" fill={color} />
      {/* Base */}
      <Rect x="26" y="72" width="28" height="5" rx="2.5" fill={color} />
      {/* Inner detail */}
      <Rect x="34" y="22" width="12" height="3" rx="1.5" fill="rgba(0,31,63,0.3)" />
      <Rect x="34" y="29" width="12" height="3" rx="1.5" fill="rgba(0,31,63,0.3)" />
      <Rect x="34" y="36" width="12" height="3" rx="1.5" fill="rgba(0,31,63,0.3)" />
    </Svg>
  );
}

function SaveIcon({ size = 20, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12M6,6H15V10H6V6Z"
        fill={color}
      />
    </Svg>
  );
}

function ReRecordIcon({ size = 20, color = GOLD }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12,14C13.66,14 15,12.66 15,11V5C15,3.34 13.66,2 12,2C10.34,2 9,3.34 9,5V11C9,12.66 10.34,14 12,14M17,11C17,13.76 14.76,16 12,16C9.24,16 7,13.76 7,11H5C5,14.53 7.61,17.43 11,17.92V20H9V22H15V20H13V17.92C16.39,17.43 19,14.53 19,11H17Z"
        fill={color}
      />
    </Svg>
  );
}

// ─── Animated Waveform ────────────────────────────────────────────────────────

const WAVE_BARS = [6, 14, 9, 22, 13, 28, 18, 10, 24, 16, 8, 26, 15, 20, 11, 25, 12, 19, 7, 23];

function AnimatedWaveform({ active }) {
  const anims = useRef(WAVE_BARS.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    if (active) {
      const loops = anims.map((a, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(a, {
              toValue: 1 + Math.random() * 2.8,
              duration: 160 + i * 20,
              useNativeDriver: false,
            }),
            Animated.timing(a, {
              toValue: 0.2,
              duration: 160 + i * 16,
              useNativeDriver: false,
            }),
          ])
        )
      );
      loops.forEach(l => l.start());
      return () => loops.forEach(l => l.stop());
    } else {
      anims.forEach(a => a.setValue(1));
    }
  }, [active]);

  return (
    <View style={wSt.row}>
      {WAVE_BARS.map((h, i) => (
        <Animated.View
          key={i}
          style={[wSt.bar, {
            height: anims[i].interpolate({ inputRange: [0, 3], outputRange: [3, h] }),
            backgroundColor: active ? GOLD : 'rgba(255,255,255,0.35)',
          }]}
        />
      ))}
    </View>
  );
}

const wSt = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 56,
    paddingHorizontal: 4,
  },
  bar: { flex: 1, borderRadius: 3, maxWidth: 7 },
});

// ─── Highlighted transcript tags ──────────────────────────────────────────────

function TaggedText() {
  return (
    <View style={st.tagRow}>
      <Text style={st.tagPlain}>Issue: </Text>
      <View style={st.tagChip}>
        <Text style={st.tagChipText}>Cost of Living</Text>
      </View>
      <Text style={st.tagPlain}> • Support Level: </Text>
      <View style={st.tagChip}>
        <Text style={st.tagChipText}>Strong Yes</Text>
      </View>
      <Text style={st.tagPlain}> • Follow-up: </Text>
      <View style={st.tagChip}>
        <Text style={st.tagChipText}>Yes</Text>
      </View>
    </View>
  );
}

// ─── SpeechToTextScreen ───────────────────────────────────────────────────────

export default function SpeechToTextScreen({ navigation }) {
  const [recording, setRecording] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (recording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,    duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [recording]);

  return (
    <View style={st.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: NAVY }} edges={['top']}>
        <View style={st.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={st.headerBtn}>
            <BackArrow size={24} color={WHITE} />
          </TouchableOpacity>

          <View style={st.headerCenter}>
            <Text style={st.headerBrand}>Campaign 365</Text>
          </View>

          <View style={st.headerRight}>
            <View style={st.canvasserPill}>
              <Text style={st.canvasserPillText}>Canvasser</Text>
            </View>
            <Text style={st.headerArrow}>{'›'}</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.scroll}>

        {/* Title */}
        <Text style={st.title}>Speech-to-Text Note</Text>

        {/* Mic button */}
        <View style={st.micSection}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              onPress={() => setRecording(v => !v)}
              activeOpacity={0.85}
              style={[st.micBtn, recording && st.micBtnActive]}
            >
              <LargeMicIcon size={80} color={recording ? WHITE : GOLD} />
            </TouchableOpacity>
          </Animated.View>
          <Text style={st.tapSpeak}>
            {recording ? 'Recording... Tap to stop' : 'Tap & Speak'}
          </Text>
        </View>

        {/* Live waveform */}
        <View style={st.waveCard}>
          <Text style={st.liveLabel}>Live Transcription</Text>
          <AnimatedWaveform active={recording} />
        </View>

        {/* Transcript box */}
        <View style={st.transcriptCard}>
          <Text style={st.transcriptText}>
            "The main issue for me is the rising cost of living and I definitely
            support our candidate on healthcare."
          </Text>
        </View>

        {/* Auto-tags */}
        <TaggedText />

        {/* Action buttons */}
        <View style={st.actionsRow}>
          <TouchableOpacity
            style={st.saveBtn}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
          >
            <SaveIcon size={20} color={NAVY} />
            <Text style={st.saveBtnText}>Save & Categorize</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={st.reRecordBtn}
            activeOpacity={0.85}
            onPress={() => setRecording(v => !v)}
          >
            <ReRecordIcon size={20} color={GOLD} />
            <Text style={st.reRecordText}>Re-record</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={st.poweredBy}>Powered by Whisper AI • Works offline</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  root:   { flex: 1, backgroundColor: NAVY },
  scroll: { paddingHorizontal: 20, paddingTop: 10 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBtn:    { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerCenter: { flex: 1 },
  headerBrand:  { color: WHITE, fontWeight: '800', fontSize: 20 },
  headerRight:  { flexDirection: 'row', alignItems: 'center', gap: 4 },
  canvasserPill: {
    backgroundColor: GOLD,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  canvasserPillText: { color: NAVY, fontWeight: '800', fontSize: 14 },
  headerArrow:       { color: 'rgba(255,255,255,0.6)', fontSize: 22, fontWeight: '700' },

  // Title
  title: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: -0.3,
  },

  // Mic
  micSection: { alignItems: 'center', marginBottom: 24 },
  micBtn: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(201,162,39,0.3)',
  },
  micBtnActive: {
    backgroundColor: 'rgba(201,162,39,0.2)',
    borderColor: GOLD,
  },
  tapSpeak: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 14,
  },

  // Waveform card
  waveCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  liveLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
    textTransform: 'uppercase',
  },

  // Transcript card
  transcriptCard: {
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  transcriptText: {
    color: NAVY,
    fontSize: 19,
    lineHeight: 30,
    fontStyle: 'italic',
    fontWeight: '500',
  },

  // Tags
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 20,
    gap: 2,
  },
  tagPlain:     { color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: '500' },
  tagChip: {
    backgroundColor: 'rgba(201,162,39,0.25)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: GOLD,
  },
  tagChipText: { color: GOLD, fontWeight: '700', fontSize: 15 },

  // Action buttons
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  saveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 15,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  saveBtnText: { color: NAVY, fontWeight: '900', fontSize: 18 },
  reRecordBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: GOLD,
    borderRadius: 14,
    paddingVertical: 15,
  },
  reRecordText: { color: GOLD, fontWeight: '800', fontSize: 18 },

  // Footer
  poweredBy: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 15,
    textAlign: 'center',
  },
});
