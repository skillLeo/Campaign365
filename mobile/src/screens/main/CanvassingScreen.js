import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Animated, Dimensions, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, Line, G, Polygon } from 'react-native-svg';
import { TYPE } from '../../theme/typography';
import { canvassingAPI } from '../../services/api';

const { width } = Dimensions.get('window');
const NAVY     = '#001F3F';
const NAVY2    = '#0D2844';
const GOLD     = '#C9A227';
const GOLD_BTN = '#D4A017';
const WHITE    = '#FFFFFF';
const LIGHT_BG = '#F0F2F5';
const RED      = '#DC143C';

// ── SVG Icons ─────────────────────────────────────────────────────────────────
function MapIcon({ size = 28, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Line x1={8} y1={2} x2={8} y2={18} stroke={color} strokeWidth={1.8} />
      <Line x1={16} y1={6} x2={16} y2={22} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

function DoorIcon({ size = 20, color = NAVY }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={3} y={2} width={14} height={20} rx={1} fill="none" stroke={color} strokeWidth={2} />
      <Circle cx={14} cy={12} r={1.5} fill={color} />
    </Svg>
  );
}

function CheckIcon({ size = 16, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5,12 L10,17 L19,7" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PinIcon({ size = 18, color = GOLD }) {
  return (
    <Svg width={size} height={size * 1.2} viewBox="0 0 18 22">
      <Path d="M9,0 C5.13,0 2,3.13 2,7 C2,12.25 9,20 9,20 C9,20 16,12.25 16,7 C16,3.13 12.87,0 9,0 Z" fill={color} />
      <Circle cx={9} cy={7} r={3} fill={NAVY} />
    </Svg>
  );
}

function MicIcon({ size = 22, color = WHITE }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={9} y={2} width={6} height={11} rx={3} fill={color} />
      <Path d="M5,10 Q5,16 12,16 Q19,16 19,10" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={12} y1={16} x2={12} y2={21} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={8} y1={21} x2={16} y2={21} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function ChevronRight({ color = '#999', size = 18 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M10,6L8.59,7.41L13.17,12L8.59,16.59L10,18L16,12Z" fill={color} />
    </Svg>
  );
}

// ── Mini Map SVG ──────────────────────────────────────────────────────────────
function MiniMap() {
  const W = width - 40;
  const H = 160;
  const pins = [
    { x: W * 0.22, y: H * 0.35 },
    { x: W * 0.42, y: H * 0.25 },
    { x: W * 0.62, y: H * 0.45 },
    { x: W * 0.78, y: H * 0.30 },
    { x: W * 0.35, y: H * 0.65 },
  ];
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} rx={14} fill="#0a1e36" />
      {/* Grid lines */}
      {[30, 60, 90, 120].map(y => (
        <Line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      ))}
      {[W*0.2, W*0.4, W*0.6, W*0.8].map((x, i) => (
        <Line key={`v${i}`} x1={x} y1={0} x2={x} y2={H} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      ))}
      {/* Roads */}
      <Path d={`M0,${H*0.5} Q${W*0.3},${H*0.4} ${W*0.6},${H*0.55} L${W},${H*0.45}`}
        stroke="rgba(201,162,39,0.25)" strokeWidth={8} fill="none" strokeLinecap="round" />
      <Path d={`M${W*0.35},0 L${W*0.4},${H}`}
        stroke="rgba(201,162,39,0.2)" strokeWidth={6} fill="none" />
      {/* Route highlight */}
      <Path d={`M${pins[0].x},${pins[0].y} L${pins[1].x},${pins[1].y} L${pins[2].x},${pins[2].y} L${pins[3].x},${pins[3].y}`}
        stroke={GOLD} strokeWidth={2.5} fill="none" strokeDasharray="6,4" strokeLinecap="round" />
      {/* Pins */}
      {pins.map((p, i) => (
        <G key={i} transform={`translate(${p.x - 7}, ${p.y - 14})`}>
          <Path d="M7,0 C3.13,0 0,3.13 0,7 C0,10.87 7,16 7,16 C7,16 14,10.87 14,7 C14,3.13 10.87,0 7,0Z"
            fill={i === 0 ? RED : GOLD} opacity={i === 0 ? 1 : 0.85} />
          <Circle cx={7} cy={7} r={2.5} fill={NAVY} />
        </G>
      ))}
      {/* Border */}
      <Rect width={W} height={H} rx={14} fill="none" stroke={GOLD} strokeWidth={1.5} opacity={0.4} />
    </Svg>
  );
}

// ── Walk List Item ─────────────────────────────────────────────────────────────
function WalkItem({ number, name, status, onPress }) {
  const colors = {
    done:      { bg: '#ECFDF5', text: '#059669', label: 'Done' },
    active:    { bg: '#FEF3C7', text: '#D97706', label: 'Active' },
    pending:   { bg: '#F1F5F9', text: '#64748B', label: 'Pending' },
    'not-home':{ bg: '#FEE2E2', text: '#DC2626', label: 'Not Home' },
  };
  const c = colors[status] || colors.pending;
  return (
    <TouchableOpacity style={wl.row} onPress={onPress} activeOpacity={0.75}>
      <View style={[wl.num, status === 'done' && { backgroundColor: '#059669' }]}>
        {status === 'done'
          ? <CheckIcon size={14} color={WHITE} />
          : <Text style={wl.numTxt}>{number}</Text>
        }
      </View>
      <View style={wl.info}>
        <Text style={wl.name}>{name}</Text>
      </View>
      <View style={[wl.badge, { backgroundColor: c.bg }]}>
        <Text style={[wl.badgeTxt, { color: c.text }]}>{c.label}</Text>
      </View>
      <ChevronRight color="#ccc" size={16} />
    </TouchableOpacity>
  );
}

const wl = StyleSheet.create({
  row:      { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  num:      { width: 30, height: 30, borderRadius: 15, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center' },
  numTxt:   { color: WHITE, fontSize: 15, fontWeight: '800' },
  info:     { flex: 1 },
  name:     { color: NAVY, fontSize: 18, fontWeight: '600' },
  badge:    { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  badgeTxt: { fontSize: 14, fontWeight: '700' },
});

// ── Support Button ─────────────────────────────────────────────────────────────
function SupportBtn({ label, selected, onPress, color }) {
  return (
    <TouchableOpacity
      style={[sb.btn, selected && { backgroundColor: color, borderColor: color }]}
      onPress={onPress} activeOpacity={0.8}
    >
      <Text style={[sb.txt, selected && { color: WHITE }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const sb = StyleSheet.create({
  btn: { flex: 1, paddingVertical: 11, borderRadius: 12, borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: WHITE, alignItems: 'center' },
  txt: { fontSize: 16, fontWeight: '700', color: '#64748B' },
});

// ── Main Screen ───────────────────────────────────────────────────────────────
const WALK_LIST = [
  { id: 1, name: 'Sarah Thompson',  status: 'done' },
  { id: 2, name: 'James Pemberton', status: 'active' },
  { id: 3, name: 'Monica Clarke',   status: 'pending' },
  { id: 4, name: 'David Nisbett',   status: 'not-home' },
  { id: 5, name: 'Grace Williams',  status: 'pending' },
];

export default function CanvassingScreen({ navigation }) {
  const [support, setSupport]   = useState(null);
  const [recording, setRecording] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const doorsKnocked = WALK_LIST.filter(w => w.status === 'done' || w.status === 'not-home').length;
  const totalDoors   = WALK_LIST.length;
  const progress     = Math.round((doorsKnocked / totalDoors) * 100);

  useEffect(() => {
    if (recording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,   duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [recording]);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* ── Header ── */}
      <SafeAreaView style={{ backgroundColor: NAVY }} edges={['top']}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Image source={require('../../../assets/logo.jpg')} style={s.headerLogo} resizeMode="contain" />
            <Text style={s.headerTitle}>Campaign 365</Text>
          </View>
          <View style={s.headerRight}>
            <View style={s.gpsDot} />
            <Text style={s.gpsText}>Live GPS</Text>
            <View style={s.avatar}><Text style={s.avatarTxt}>AJ</Text></View>
          </View>
        </View>
      </SafeAreaView>

      {/* ── Active banner ── */}
      <View style={s.activeBanner}>
        <View style={s.activeDot} />
        <Text style={s.activeTxt}>Active Canvassing — Basseterre Central</Text>
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Navy section ── */}
        <View style={s.navySection}>
          {/* Stats row */}
          <View style={s.statsRow}>
            <View style={s.statCard}>
              <Text style={s.statNum}>{doorsKnocked}</Text>
              <Text style={s.statLbl}>Doors{'\n'}Knocked</Text>
            </View>
            <View style={[s.statCard, { borderColor: GOLD }]}>
              <Text style={[s.statNum, { color: GOLD }]}>{progress}%</Text>
              <Text style={s.statLbl}>Progress</Text>
            </View>
            <View style={s.statCard}>
              <Text style={s.statNum}>{totalDoors}</Text>
              <Text style={s.statLbl}>Total{'\n'}Assigned</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={s.progressWrap}>
            <View style={s.progressTrack}>
              <View style={[s.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={s.progressLbl}>{doorsKnocked} of {totalDoors} doors</Text>
          </View>

          {/* Mini map */}
          <Text style={s.mapLabel}>Today's Route</Text>
          <MiniMap />
        </View>

        {/* ── Light section ── */}
        <View style={s.lightSection}>

          {/* Current voter card */}
          <View style={s.sectionHeader}>
            <DoorIcon size={18} color={NAVY} />
            <Text style={s.sectionTitle}>Next Door</Text>
            <View style={s.activePill}><Text style={s.activePillTxt}>James Pemberton</Text></View>
          </View>

          <View style={s.voterCard}>
            <View style={s.voterAvatar}><Text style={s.voterInitials}>JP</Text></View>
            <View style={s.voterInfo}>
              <Text style={s.voterName}>James Pemberton</Text>
              <Text style={s.voterAddr}>14 Victoria Road, Basseterre</Text>
              <View style={s.voterTags}>
                <View style={s.tagUndecided}><Text style={s.tagUndecidedTxt}>Undecided</Text></View>
                <View style={s.tagAge}><Text style={s.tagAgeTxt}>Age 42</Text></View>
              </View>
            </View>
          </View>

          {/* Support buttons */}
          <Text style={s.supportLabel}>Mark Support Level</Text>
          <View style={s.supportRow}>
            <SupportBtn label="Support"   selected={support === 'support'}   color="#059669" onPress={() => setSupport('support')} />
            <SupportBtn label="Undecided" selected={support === 'undecided'} color={GOLD_BTN} onPress={() => setSupport('undecided')} />
            <SupportBtn label="Oppose"    selected={support === 'oppose'}    color={RED}     onPress={() => setSupport('oppose')} />
          </View>

          {/* Voice note */}
          <View style={s.voiceRow}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                style={[s.micBtn, recording && s.micBtnActive]}
                onPress={() => setRecording(v => !v)}
                activeOpacity={0.85}
              >
                <MicIcon size={20} color={recording ? WHITE : NAVY} />
              </TouchableOpacity>
            </Animated.View>
            <View style={s.voiceInfo}>
              <Text style={s.voiceTxt}>{recording ? 'Recording...' : 'Voice Note'}</Text>
              <Text style={s.voiceSubTxt}>{recording ? 'Tap to stop' : 'Tap mic to record conversation'}</Text>
            </View>
            {recording && <View style={s.recDot} />}
          </View>

          {/* Action buttons */}
          <View style={s.actionRow}>
            <TouchableOpacity style={s.notHomeBtn} activeOpacity={0.8}>
              <Text style={s.notHomeTxt}>Not Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.saveBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('VoterInteraction')}
            >
              <Text style={s.saveBtnTxt}>Save & Next →</Text>
            </TouchableOpacity>
          </View>

          {/* Walk list */}
          <Text style={[s.sectionTitle, { marginTop: 24, marginBottom: 4 }]}>Today's Walk List</Text>
          <View style={s.walkCard}>
            {WALK_LIST.map((item, i) => (
              <WalkItem
                key={item.id}
                number={i + 1}
                name={item.name}
                status={item.status}
                onPress={() => navigation.navigate('VoterInteraction')}
              />
            ))}
          </View>

          {/* Panic button */}
          <TouchableOpacity
            style={s.panicBtn}
            onPress={() => navigation.navigate('Panic')}
            activeOpacity={0.85}
          >
            <Text style={s.panicTxt}>PANIC</Text>
          </TouchableOpacity>

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: NAVY },
  scroll: { flex: 1 },

  // Header
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  headerLeft:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerLogo:  { width: 30, height: 30, borderRadius: 15 },
  headerTitle: { ...TYPE.appTitle, color: WHITE },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  gpsDot:      { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  gpsText:     { color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: '600' },
  avatar:      { width: 36, height: 36, borderRadius: 18, backgroundColor: GOLD, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' },
  avatarTxt:   { color: '#000', fontSize: 15, fontWeight: '900' },

  // Active banner
  activeBanner: { backgroundColor: 'rgba(201,162,39,0.15)', borderBottomWidth: 1, borderBottomColor: 'rgba(201,162,39,0.2)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8, gap: 8 },
  activeDot:    { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  activeTxt:    { color: GOLD, fontSize: 15, fontWeight: '700' },

  // Navy section
  navySection: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 24 },

  // Stats
  statsRow:  { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard:  { flex: 1, borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.06)', padding: 14, alignItems: 'center' },
  statNum:   { color: WHITE, fontSize: 32, fontWeight: '900' },
  statLbl:   { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '600', textAlign: 'center', marginTop: 3 },

  // Progress
  progressWrap:  { marginBottom: 20 },
  progressTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 3, marginBottom: 6 },
  progressFill:  { height: 6, backgroundColor: GOLD, borderRadius: 3 },
  progressLbl:   { color: 'rgba(255,255,255,0.45)', fontSize: 15 },

  // Map
  mapLabel: { ...TYPE.sectionTitle, color: 'rgba(255,255,255,0.65)', marginBottom: 10 },

  // Light section
  lightSection: { backgroundColor: LIGHT_BG, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 22 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionTitle:  { ...TYPE.sectionTitle, color: NAVY, flex: 1 },
  activePill:    { backgroundColor: NAVY, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  activePillTxt: { color: GOLD, fontSize: 14, fontWeight: '700' },

  // Voter card
  voterCard:     { backgroundColor: WHITE, borderRadius: 16, padding: 16, flexDirection: 'row', gap: 14, marginBottom: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  voterAvatar:   { width: 58, height: 58, borderRadius: 12, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center' },
  voterInitials: { color: GOLD, fontWeight: '900', fontSize: 25 },
  voterInfo:     { flex: 1 },
  voterName:     { ...TYPE.subheading, fontSize: 21, color: NAVY, marginBottom: 3 },
  voterAddr:     { color: '#888', fontSize: 15, marginBottom: 7 },
  voterTags:     { flexDirection: 'row', gap: 6 },
  tagUndecided:  { backgroundColor: '#FEF3C7', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  tagUndecidedTxt: { color: '#D97706', fontSize: 14, fontWeight: '700' },
  tagAge:        { backgroundColor: '#F1F5F9', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  tagAgeTxt:     { color: '#64748B', fontSize: 14, fontWeight: '600' },

  // Support
  supportLabel: { color: NAVY, fontSize: 16, fontWeight: '600', marginBottom: 10 },
  supportRow:   { flexDirection: 'row', gap: 10, marginBottom: 16 },

  // Voice
  voiceRow:    { backgroundColor: WHITE, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  micBtn:      { width: 44, height: 44, borderRadius: 22, backgroundColor: LIGHT_BG, borderWidth: 1.5, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  micBtnActive:{ backgroundColor: RED, borderColor: RED },
  voiceInfo:   { flex: 1 },
  voiceTxt:    { color: NAVY, fontSize: 18, fontWeight: '700' },
  voiceSubTxt: { color: '#888', fontSize: 15, marginTop: 2 },
  recDot:      { width: 10, height: 10, borderRadius: 5, backgroundColor: RED },

  // Action buttons
  actionRow:   { flexDirection: 'row', gap: 12, marginBottom: 8 },
  notHomeBtn:  { flex: 1, height: 52, borderRadius: 14, borderWidth: 1.5, borderColor: '#CBD5E1', backgroundColor: WHITE, alignItems: 'center', justifyContent: 'center' },
  notHomeTxt:  { color: '#64748B', fontSize: 18, fontWeight: '700' },
  saveBtn:     { flex: 2, height: 52, borderRadius: 14, backgroundColor: GOLD_BTN, alignItems: 'center', justifyContent: 'center', shadowColor: GOLD, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 5 },
  saveBtnTxt:  { ...TYPE.button, color: '#000', fontWeight: '800' },

  // Walk list
  walkCard: { backgroundColor: WHITE, borderRadius: 16, paddingHorizontal: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },

  // Panic
  panicBtn: { backgroundColor: RED, borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center', shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
  panicTxt: { color: WHITE, fontSize: 20, fontWeight: '900', letterSpacing: 1.5 },
});
