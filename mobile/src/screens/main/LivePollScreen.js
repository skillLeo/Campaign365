import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, G, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');
const NAVY     = '#001F3F';
const GOLD     = '#C9A227';
const GOLD_DRK = '#A6841E';
const WHITE    = '#FFFFFF';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function HamburgerIcon({ size = 22, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="3" y="6"  width="18" height="2.5" rx="1.25" fill={color} />
      <Rect x="3" y="11" width="18" height="2.5" rx="1.25" fill={color} />
      <Rect x="3" y="16" width="18" height="2.5" rx="1.25" fill={color} />
    </Svg>
  );
}

function CloseIcon({ size = 22, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12Z"
        fill={color}
      />
    </Svg>
  );
}

function ShoppingCartIcon({ size = 44, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.11,18 17,18M1,2V4H3L6.6,11.59L5.25,14C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.11,18 7,18Z"
        fill={color}
      />
    </Svg>
  );
}

function HealthcareIcon({ size = 38, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,17H11V13H7V11H11V7H13V11H17V13H13V17Z"
        fill={color}
      />
    </Svg>
  );
}

function EducationIcon({ size = 38, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"
        fill={color}
      />
    </Svg>
  );
}

function CrimeIcon({ size = 38, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M13.49,5.48C14.56,5.48 15.43,4.61 15.43,3.54C15.43,2.47 14.56,1.6 13.49,1.6C12.42,1.6 11.55,2.47 11.55,3.54C11.55,4.61 12.42,5.48 13.49,5.48M10.28,20.4C9.21,20.4 8.34,19.53 8.34,18.46C8.34,17.39 9.21,16.52 10.28,16.52C11.35,16.52 12.22,17.39 12.22,18.46C12.22,19.53 11.35,20.4 10.28,20.4M10.28,13.7C9.21,13.7 8.34,12.83 8.34,11.76C8.34,10.69 9.21,9.82 10.28,9.82C11.35,9.82 12.22,10.69 12.22,11.76C12.22,12.83 11.35,13.7 10.28,13.7M15.47,7.33L13.55,9.25C14.16,10.28 14.5,11.47 14.5,12.76C14.5,14.18 14.07,15.5 13.35,16.6L15.25,18.5C16.44,17.0 17.15,15.1 17.15,13.0C17.15,10.85 16.44,8.85 15.47,7.33Z"
        fill={color}
      />
    </Svg>
  );
}

function MicIcon({ size = 22, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12,14C13.66,14 15,12.66 15,11V5C15,3.34 13.66,2 12,2C10.34,2 9,3.34 9,5V11C9,12.66 10.34,14 12,14ZM17,11C17,13.76 14.76,16 12,16C9.24,16 7,13.76 7,11H5C5,14.53 7.61,17.43 11,17.92V20H9V22H15V20H13V17.92C16.39,17.43 19,14.53 19,11H17Z"
        fill={color}
      />
    </Svg>
  );
}

// ─── Poll option card ─────────────────────────────────────────────────────────

const POLL_OPTIONS = [
  { key: 'cost',      label: 'Cost of Living', Icon: ShoppingCartIcon },
  { key: 'health',    label: 'Healthcare',     Icon: HealthcareIcon   },
  { key: 'education', label: 'Education',      Icon: EducationIcon    },
  { key: 'crime',     label: 'Crime & Safety', Icon: CrimeIcon        },
];

function OptionCard({ option, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[st.optCard, selected && st.optCardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <option.Icon size={38} color={selected ? WHITE : NAVY} />
      <Text style={[st.optLabel, selected && st.optLabelSelected]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function LivePollScreen({ navigation }) {
  const [selected, setSelected]   = useState(null);
  const [otherText, setOtherText] = useState('');

  return (
    <View style={st.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: NAVY }} edges={['top']}>
        <View style={st.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={st.headerBtn}>
            <HamburgerIcon size={22} color={WHITE} />
          </TouchableOpacity>

          <View style={st.headerCenter}>
            <Text style={st.headerTitle}>Quick Survey - Polling</Text>
            <Text style={st.headerSub}>Division 12</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()} style={st.headerBtn}>
            <CloseIcon size={22} color={WHITE} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.scroll}>

        {/* Question */}
        <Text style={st.question}>
          What is the most important issue facing your family right now?
        </Text>

        {/* 2×2 option grid */}
        <View style={st.grid}>
          {POLL_OPTIONS.map(opt => (
            <OptionCard
              key={opt.key}
              option={opt}
              selected={selected === opt.key}
              onPress={() => setSelected(opt.key)}
            />
          ))}
        </View>

        {/* Other input */}
        <View style={st.otherRow}>
          <TextInput
            style={st.otherInput}
            placeholder="Other (type or speak)"
            placeholderTextColor="rgba(0,31,63,0.4)"
            value={otherText}
            onChangeText={setOtherText}
          />
          <View style={st.micWrap}>
            <MicIcon size={22} color={NAVY} />
          </View>
        </View>

        {/* Progress */}
        <Text style={st.progress}>Question 2 of 5</Text>

        {/* Submit */}
        <TouchableOpacity
          style={st.submitBtn}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
        >
          <Text style={st.submitBtnText}>Submit & Continue</Text>
        </TouchableOpacity>

        {/* Skip / Save */}
        <View style={st.skipRow}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={st.skipText}>Skip</Text>
          </TouchableOpacity>
          <Text style={st.divider}>|</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={st.skipText}>Save for Later</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const CARD_SIZE = (width - 56) / 2;

const st = StyleSheet.create({
  root:   { flex: 1, backgroundColor: NAVY },
  scroll: { paddingHorizontal: 20, paddingTop: 8 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBtn: {
    width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle:  { color: WHITE, fontWeight: '800', fontSize: 21 },
  headerSub:    { color: 'rgba(255,255,255,0.6)', fontSize: 15, marginTop: 2 },

  // Question
  question: {
    color: WHITE,
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 38,
    textAlign: 'center',
    marginBottom: 24,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'center',
    marginBottom: 20,
  },
  optCard: {
    width: CARD_SIZE,
    height: CARD_SIZE * 0.9,
    backgroundColor: GOLD,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  optCardSelected: {
    backgroundColor: GOLD_DRK,
    borderWidth: 3,
    borderColor: WHITE,
  },
  optLabel: {
    color: NAVY,
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  optLabelSelected: { color: WHITE },

  // Other input
  otherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
    marginBottom: 16,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  otherInput: {
    flex: 1,
    color: NAVY,
    fontSize: 18,
    paddingVertical: 14,
    fontWeight: '500',
  },
  micWrap: { padding: 6 },

  // Progress
  progress: {
    color: GOLD,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 18,
  },

  // Submit
  submitBtn: {
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
  submitBtnText: { color: NAVY, fontWeight: '900', fontSize: 21 },

  // Skip row
  skipRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  skipText:  { color: 'rgba(255,255,255,0.6)', fontWeight: '600', fontSize: 18 },
  divider:   { color: 'rgba(255,255,255,0.25)', fontSize: 18 },
});
