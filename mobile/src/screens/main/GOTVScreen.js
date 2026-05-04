import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Switch, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, G } from 'react-native-svg';
import { gotvAPI, votersAPI } from '../../services/api';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const GOLD = '#D4A017';
const BLUE = '#2563EB';

const VOTERS = [
  { name: 'John Smith',   action: 'Call Now',      type: 'call' },
  { name: 'Maria Lopez',  action: 'Call Now',      type: 'call' },
  { name: 'Robert Chen',  action: 'Call Now',      type: 'call' },
  { name: 'Joln',         action: 'Send Reminder', type: 'reminder' },
];

function HeatMap() {
  const mw = width - 48;
  const zones = [
    { d: `M${mw*0.05},${40} L${mw*0.3},${20} L${mw*0.45},${30} L${mw*0.4},${80} L${mw*0.2},${90} Z`, fill: '#DC143C', opacity: 0.5 },
    { d: `M${mw*0.4},${30} L${mw*0.65},${20} L${mw*0.7},${70} L${mw*0.45},${80} Z`,                   fill: '#EF4444', opacity: 0.35 },
    { d: `M${mw*0.2},${90} L${mw*0.45},${80} L${mw*0.5},${130} L${mw*0.25},${140} Z`,                 fill: '#D4A017', opacity: 0.5 },
    { d: `M${mw*0.45},${80} L${mw*0.7},${70} L${mw*0.75},${130} L${mw*0.5},${130} Z`,                 fill: '#FCD34D', opacity: 0.4 },
    { d: `M${mw*0.65},${20} L${mw*0.9},${30} L${mw*0.88},${90} L${mw*0.7},${70} Z`,                   fill: '#93C5FD', opacity: 0.4 },
    { d: `M${mw*0.25},${140} L${mw*0.5},${130} L${mw*0.52},${170} L${mw*0.28},${170} Z`,             fill: '#60A5FA', opacity: 0.4 },
    { d: `M${mw*0.5},${130} L${mw*0.75},${130} L${mw*0.78},${170} L${mw*0.52},${170} Z`,             fill: '#3B82F6', opacity: 0.35 },
  ];
  return (
    <Svg width={mw} height={190} viewBox={`0 0 ${mw} 190`}>
      <Rect width={mw} height={190} rx={12} fill="#1E293B" />
      {zones.map((z, i) => <Path key={i} d={z.d} fill={z.fill} opacity={z.opacity} />)}
      {/* Ove label */}
      <Rect x={8} y={8} width={36} height={20} rx={6} fill="rgba(0,0,0,0.4)" />
    </Svg>
  );
}

export default function GOTVScreen({ navigation }) {
  const [gotvActive, setGotvActive] = useState(false);
  const [voters, setVoters] = useState(VOTERS);
  const [turnoutData, setTurnoutData] = useState(null);

  useEffect(() => {
    votersAPI.list('?sentiment=undecided&per_page=4').then(res => {
      const data = res.data || [];
      if (data.length > 0) {
        setVoters(data.map(v => ({
          name: `${v.first_name} ${v.last_name}`,
          action: v.phone ? 'Call Now' : 'Reminder',
          type: v.phone ? 'call' : 'reminder',
        })));
      }
    }).catch(() => {});
    gotvAPI.turnout().then(res => setTurnoutData(res.data)).catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Panic FAB */}
      <TouchableOpacity
        style={styles.panicFab}
        onPress={() => navigation.navigate('Panic')}
      >
        <Text style={styles.panicFabIcon}>❗</Text>
        <Text style={styles.panicFabTxt}>Panic Button</Text>
      </TouchableOpacity>

      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>GOTV Mode — Election Day</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Activate GOTV toggle */}
        <View style={[styles.gotvToggle, gotvActive && styles.gotvToggleActive]}>
          <Text style={styles.gotvToggleTxt}>Activate GOTV</Text>
          <Switch
            value={gotvActive}
            onValueChange={setGotvActive}
            trackColor={{ false: 'rgba(255,255,255,0.2)', true: 'rgba(255,255,255,0.3)' }}
            thumbColor="white"
          />
        </View>

        {/* Priority Voters */}
        <Text style={styles.sectionTitle}>Priority Voters</Text>
        <View style={styles.voterList}>
          {voters.map((v, i) => (
            <View key={i} style={styles.voterRow}>
              <View style={styles.voterAvatar}>
                <Text style={styles.voterAvatarTxt}>{v.name[0]}</Text>
              </View>
              <Text style={styles.voterName}>{v.name}</Text>
              <TouchableOpacity style={[
                styles.actionBtn,
                v.type === 'reminder' && styles.actionBtnReminder,
              ]}>
                <Text style={[
                  styles.actionBtnTxt,
                  v.type === 'reminder' && styles.actionBtnTxtReminder,
                ]}>{v.action}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Heat Map */}
        <Text style={styles.sectionTitle}>Live Heat Map of Voter Turnout</Text>
        <View style={styles.mapWrap}>
          <HeatMap />
        </View>

        {/* Legend */}
        <View style={styles.legendRow}>
          {[
            { color: BLUE, label: 'High' },
            { color: GOLD, label: 'Visit Now' },
            { color: RED,  label: 'Low' },
          ].map((l, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendBar, { backgroundColor: l.color }]} />
              <Text style={styles.legendTxt}>{l.label}</Text>
            </View>
          ))}
        </View>

        {/* Target */}
        <View style={styles.targetBox}>
          <Text style={styles.targetTxt}>Target: 1,200 votes in turf</Text>
          <View style={styles.targetBar}>
            <View style={[styles.targetFill, { width: '60%' }]} />
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080E1C' },
  panicFab: {
    position: 'absolute', top: 60, right: 16, zIndex: 99,
    backgroundColor: RED, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 5,
    shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8,
  },
  panicFabIcon: { fontSize: 14 },
  panicFabTxt:  { color: 'white', fontWeight: '800', fontSize: 12 },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn:     { width: 32, alignItems: 'center' },
  backArrow:   { color: 'white', fontSize: 28, fontWeight: '300' },
  headerTitle: { color: 'white', fontWeight: '800', fontSize: 16 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  gotvToggle: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: RED, borderRadius: 14, paddingHorizontal: 20, paddingVertical: 14,
    marginBottom: 24,
  },
  gotvToggleActive: { backgroundColor: '#a00020' },
  gotvToggleTxt: { color: 'white', fontWeight: '900', fontSize: 17 },
  sectionTitle: { color: 'white', fontWeight: '800', fontSize: 16, marginBottom: 12 },
  voterList: {
    backgroundColor: '#111827', borderRadius: 14, overflow: 'hidden',
    marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  voterRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  voterAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center',
  },
  voterAvatarTxt: { color: 'white', fontWeight: '700', fontSize: 14 },
  voterName:  { color: 'white', fontSize: 14, fontWeight: '600', flex: 1 },
  actionBtn: {
    backgroundColor: '#1E293B', borderRadius: 8,
    paddingHorizontal: 14, paddingVertical: 7,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  actionBtnReminder: { borderColor: GOLD },
  actionBtnTxt:      { color: 'white', fontSize: 12, fontWeight: '700' },
  actionBtnTxtReminder: { color: GOLD },
  mapWrap:    { marginBottom: 12 },
  legendRow:  { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 16 },
  legendItem: { alignItems: 'center', gap: 4 },
  legendBar:  { height: 4, width: 50, borderRadius: 2 },
  legendTxt:  { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600' },
  targetBox:  { backgroundColor: '#111827', borderRadius: 14, padding: 16, gap: 10 },
  targetTxt:  { color: 'white', fontWeight: '700', fontSize: 14 },
  targetBar:  { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
  targetFill: { height: '100%', backgroundColor: BLUE, borderRadius: 3 },
});
