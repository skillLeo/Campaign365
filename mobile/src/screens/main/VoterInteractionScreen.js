import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, Dimensions, StatusBar, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, G, Line, Ellipse, Polygon } from 'react-native-svg';

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

function UKFlagIcon({ size = 22 }) {
  return (
    <Svg width={size} height={size * 0.6} viewBox="0 0 60 36">
      <Rect width="60" height="36" fill="#012169" />
      <Path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="7" />
      <Path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="4" />
      <Path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="12" />
      <Path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="7" />
    </Svg>
  );
}

function JamaicaFlagIcon({ size = 22 }) {
  return (
    <Svg width={size} height={size * 0.6} viewBox="0 0 60 36">
      <Rect width="60" height="36" fill="#000" />
      <Path d="M0,0 L60,36 M0,36 L60,0" stroke="#FFD700" strokeWidth="10" />
      <Path d="M0,0 L30,18 L0,36Z" fill="#00A551" />
      <Path d="M60,0 L30,18 L60,36Z" fill="#00A551" />
    </Svg>
  );
}

function CrownLogoIcon({ size = 40 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Circle cx="20" cy="20" r="18" fill={GOLD} />
      <Path
        d="M8,26 L8,16 L14,21 L20,12 L26,21 L32,16 L32,26 Z"
        fill={NAVY}
      />
      <Rect x="8" y="26" width="24" height="4" rx="2" fill={NAVY} />
    </Svg>
  );
}

function BasketIcon({ size = 26, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M17.21,9L12.83,2.44C12.64,2.16 12.32,2 12,2C11.68,2 11.36,2.16 11.17,2.44L6.79,9H2V11L3.57,18.29C3.78,19.27 4.65,20 5.64,20H18.36C19.35,20 20.22,19.27 20.43,18.29L22,11V9H17.21ZM12,4.44L14.8,9H9.2L12,4.44ZM13,16H11V14H13V16ZM13,12H11V10H13V12Z"
        fill={color}
      />
    </Svg>
  );
}

function PersonCircleIcon({ size = 54 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 54 54">
      <Circle cx="27" cy="27" r="27" fill={NAVY} />
      <Circle cx="27" cy="22" r="9" fill="rgba(255,255,255,0.7)" />
      <Path
        d="M8,48 C8,38 17,32 27,32 C37,32 46,38 46,48Z"
        fill="rgba(255,255,255,0.7)"
      />
    </Svg>
  );
}

function FamilyGroupIcon({ size = 70 }) {
  const adults = [14, 30, 46, 62];
  const childX = 54;
  return (
    <Svg width={size + 20} height={size} viewBox="0 0 90 70">
      {/* Adult 1 */}
      <Circle cx="14" cy="16" r="7" fill="rgba(255,255,255,0.9)" />
      <Path d="M7,26 Q14,22 21,26 L21,50 L7,50Z" fill="rgba(255,255,255,0.9)" />
      {/* Adult 2 */}
      <Circle cx="32" cy="14" r="8" fill="rgba(255,255,255,1)" />
      <Path d="M24,25 Q32,20 40,25 L40,52 L24,52Z" fill="rgba(255,255,255,1)" />
      {/* Adult 3 */}
      <Circle cx="55" cy="14" r="8" fill="rgba(255,255,255,1)" />
      <Path d="M47,25 Q55,20 63,25 L63,52 L47,52Z" fill="rgba(255,255,255,1)" />
      {/* Child */}
      <Circle cx="76" cy="22" r="6" fill="rgba(255,255,255,0.8)" />
      <Path d="M70,30 Q76,26 82,30 L82,50 L70,50Z" fill="rgba(255,255,255,0.8)" />
    </Svg>
  );
}

function MicIcon({ size = 36, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12,14 C10.34,14 9,12.66 9,11 L9,5 C9,3.34 10.34,2 12,2 C13.66,2 15,3.34 15,5 L15,11 C15,12.66 13.66,14 12,14Z"
        fill={color}
      />
      <Path
        d="M17,11 C17,13.76 14.76,16 12,16 C9.24,16 7,13.76 7,11 L5,11 C5,14.52 7.61,17.43 11,17.92 L11,20 L9,20 L9,22 L15,22 L15,20 L13,20 L13,17.92 C16.39,17.43 19,14.52 19,11Z"
        fill={color}
      />
    </Svg>
  );
}

function PlayIcon({ size = 22, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M8,5V19L19,12Z" fill={color} />
    </Svg>
  );
}

// ─── Animated Waveform ────────────────────────────────────────────────────────

const WAVE_HEIGHTS = [8,12,5,18,10,22,15,7,20,14,9,25,16,11,19,6,21,13,8,17];

function AnimatedWaveform({ active }) {
  const anims = useRef(WAVE_HEIGHTS.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    if (active) {
      const loops = anims.map((a, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(a, { toValue: 1 + Math.random() * 2.5, duration: 180 + i * 18, useNativeDriver: false }),
            Animated.timing(a, { toValue: 0.3, duration: 180 + i * 14, useNativeDriver: false }),
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
    <View style={waveSt.row}>
      {WAVE_HEIGHTS.map((h, i) => (
        <Animated.View
          key={i}
          style={[waveSt.bar, {
            height: anims[i].interpolate({ inputRange: [0, 2.5], outputRange: [3, h * 1.8] }),
            backgroundColor: active ? GOLD : 'rgba(255,255,255,0.3)',
          }]}
        />
      ))}
    </View>
  );
}
const waveSt = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4, height: 56, paddingHorizontal: 12 },
  bar: { width: 5, borderRadius: 3 },
});

// ─── Support Chips ────────────────────────────────────────────────────────────

const SUPPORT_LEVELS = [
  { key: 'strong_yes', label: 'Strong Yes' },
  { key: 'lean_yes',   label: 'Lean Yes'   },
  { key: 'undecided',  label: 'Undecided'  },
  { key: 'lean_no',    label: 'Lean No'    },
  { key: 'strong_no',  label: 'Strong No'  },
];

const ISSUES = [
  { key: 'cost',       label: 'Cost of Living' },
  { key: 'healthcare', label: 'Healthcare'     },
  { key: 'education',  label: 'Education'      },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function VoterInteractionScreen({ navigation }) {
  const [selectedSupport, setSelectedSupport] = useState('strong_yes');
  const [selectedIssues,  setSelectedIssues]  = useState(['cost']);
  const [recording, setRecording] = useState(false);
  const [note, setNote] = useState('');

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (recording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 550, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,   duration: 550, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [recording]);

  const toggleIssue = (key) => {
    setSelectedIssues(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <View style={st.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: NAVY }} edges={['top']}>
        <View style={st.header}>
          {/* Left flags */}
          <View style={st.flagRow}>
            <UKFlagIcon size={22} />
            <JamaicaFlagIcon size={22} />
          </View>
          {/* Center logo */}
          <CrownLogoIcon size={40} />
          {/* Right basket */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BasketIcon size={26} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>

        {/* Voter title */}
        <Text style={st.voterTitle}>John Thompson - 12 Smith Street</Text>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

        {/* Gold info card */}
        <View style={st.ph}>
          <View style={st.infoCard}>
            {/* Left: photo + details */}
            <View style={st.infoLeft}>
              <PersonCircleIcon size={54} />
              <Text style={st.ageBig}>52</Text>
              <Text style={st.infoJob}>Retired Teacher</Text>
              <Text style={st.infoVoted}>Voted 2022, 2019</Text>
            </View>
            {/* Right: family */}
            <View style={st.infoRight}>
              <FamilyGroupIcon size={70} />
            </View>
          </View>
        </View>

        {/* Support Level */}
        <View style={st.ph}>
          <Text style={st.sectionLabel}>Support Level</Text>
          <View style={st.chipRow}>
            {SUPPORT_LEVELS.map(item => {
              const active = selectedSupport === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[st.chip, active ? st.chipActive : st.chipOutline]}
                  onPress={() => setSelectedSupport(item.key)}
                  activeOpacity={0.75}
                >
                  <Text style={[st.chipText, active ? st.chipTextActive : st.chipTextOutline]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Issues */}
        <View style={st.ph}>
          <Text style={st.sectionLabel}>Issues</Text>
          <View style={st.chipRow}>
            {ISSUES.map(item => {
              const active = selectedIssues.includes(item.key);
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[st.chip, active ? st.chipActive : st.chipOutline]}
                  onPress={() => toggleIssue(item.key)}
                  activeOpacity={0.75}
                >
                  <Text style={[st.chipText, active ? st.chipTextActive : st.chipTextOutline]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Record button */}
        <View style={st.ph}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={[st.recordBtn, recording && st.recordBtnActive]}
              onPress={() => setRecording(v => !v)}
              activeOpacity={0.85}
            >
              <MicIcon size={22} color={recording ? WHITE : NAVY} />
              <Text style={[st.recordBtnText, recording && { color: WHITE }]}>
                {recording ? 'Recording... Tap to Stop' : 'Record Conversation'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Text style={st.sttHint}>Tap to use Speech-to-Text</Text>
        </View>

        {/* Waveform */}
        <View style={[st.ph, st.waveCard]}>
          <AnimatedWaveform active={recording} />

          {/* Play + basket row */}
          <View style={st.waveBottom}>
            <PlayIcon size={22} color={GOLD} />
            <View style={{ flex: 1, marginHorizontal: 8 }}>
              <AnimatedWaveform active={false} />
            </View>
            <BasketIcon size={20} color={GOLD} />
          </View>
        </View>

        {/* Transcript */}
        <View style={st.ph}>
          <Text style={st.transcriptText}>
            "The main issue for me is the rising cost of living. I definitely support
            the candidate's position on healthcare."
          </Text>
        </View>

        {/* Quick Note */}
        <View style={st.ph}>
          <Text style={st.sectionLabel}>Quick Note:</Text>
          <TextInput
            style={st.noteInput}
            placeholder="Add a note..."
            placeholderTextColor="rgba(255,255,255,0.35)"
            value={note}
            onChangeText={setNote}
            multiline
          />
        </View>

        {/* Save & Next */}
        <View style={[st.ph, { marginTop: 16, marginBottom: 40 }]}>
          <TouchableOpacity
            style={st.saveBtn}
            onPress={() => navigation.navigate('CanvassingComplete')}
            activeOpacity={0.85}
          >
            <Text style={st.saveBtnText}>Save & Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  root: { flex: 1, backgroundColor: NAVY },
  ph:   { paddingHorizontal: 20, marginBottom: 16 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  flagRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  voterTitle: {
    color: WHITE,
    fontWeight: '800',
    fontSize: 22,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },

  // Info card
  infoCard: {
    backgroundColor: GOLD,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  infoLeft:  { alignItems: 'center', gap: 4 },
  ageBig:    { color: NAVY, fontWeight: '900', fontSize: 40, lineHeight: 45 },
  infoJob:   { color: NAVY, fontWeight: '700', fontSize: 15 },
  infoVoted: { color: 'rgba(0,31,63,0.7)', fontSize: 14 },
  infoRight: { alignItems: 'center', justifyContent: 'center' },

  // Section label
  sectionLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },

  // Chips
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
  },
  chipActive:       { backgroundColor: GOLD },
  chipOutline:      { borderWidth: 1.5, borderColor: GOLD },
  chipText:         { fontWeight: '700', fontSize: 16 },
  chipTextActive:   { color: NAVY },
  chipTextOutline:  { color: GOLD },

  // Record button
  recordBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 15,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  recordBtnActive: { backgroundColor: '#B8102A' },
  recordBtnText:   { color: NAVY, fontWeight: '900', fontSize: 20 },
  sttHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },

  // Waveform card
  waveCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingTop: 4,
  },
  waveBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },

  // Transcript
  transcriptText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 18,
    lineHeight: 28,
    fontStyle: 'italic',
  },

  // Note input
  noteInput: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 14,
    color: WHITE,
    fontSize: 18,
    minHeight: 70,
    borderWidth: 1,
    borderColor: GOLD,
    textAlignVertical: 'top',
  },

  // Save button
  saveBtn: {
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
  saveBtnText: { color: NAVY, fontWeight: '900', fontSize: 21 },
});
