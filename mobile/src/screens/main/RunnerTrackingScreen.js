import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Line, G, Ellipse } from 'react-native-svg';
import { runnersAPI } from '../../services/api';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const BLUE = '#2563EB';
const GOLD = '#D4A017';

const RUNNERS = [
  { name: 'Jamal', dist: '200m away', task: 'Delivering flyers', eta: '1:42ml', gps: null },
  { name: 'Jamal', dist: '200m away', task: 'Live GPS 189',      eta: '1:25ml', gps: true  },
];

const BLUE_PINS  = [{ x: 0.32, y: 0.38 }, { x: 0.28, y: 0.52 }, { x: 0.38, y: 0.58 }, { x: 0.22, y: 0.62 }, { x: 0.42, y: 0.70 }];
const GOLD_PINS  = [{ x: 0.40, y: 0.22 }, { x: 0.50, y: 0.28 }, { x: 0.45, y: 0.35 }, { x: 0.35, y: 0.45 }, { x: 0.55, y: 0.48 }, { x: 0.48, y: 0.72 }, { x: 0.42, y: 0.82 }];
const PANIC_PIN  = { x: 0.52, y: 0.50 };
const SMALL_GOLD = { x: 0.38, y: 0.75 };

function MapView() {
  const mw = width;
  const mh = 300;
  return (
    <Svg width={mw} height={mh} viewBox={`0 0 ${mw} ${mh}`}>
      <Rect width={mw} height={mh} fill="#1a2a4a" />
      {/* Grid */}
      {[50,100,150,200,250].map(y => <Line key={y} x1={0} y1={y} x2={mw} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />)}
      {[60,120,180,240,300].map(x => <Line key={x} x1={x} y1={0} x2={x} y2={mh} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />)}

      {/* St Kitts island shape */}
      <Path
        d={`M${mw*0.15},${mh*0.25} L${mw*0.28},${mh*0.15} L${mw*0.45},${mh*0.12} L${mw*0.58},${mh*0.18} L${mw*0.62},${mh*0.28} L${mw*0.58},${mh*0.40} L${mw*0.52},${mh*0.52} L${mw*0.48},${mh*0.68} L${mw*0.42},${mh*0.80} L${mw*0.35},${mh*0.88} L${mw*0.25},${mh*0.82} L${mw*0.20},${mh*0.68} L${mw*0.18},${mh*0.52} Z`}
        fill="#2a3a5a" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5}
      />

      {/* Ray lines from center */}
      {[[0.2,0.1],[0.4,0.08],[0.6,0.1],[0.7,0.2],[0.72,0.35]].map(([tx,ty], i) => (
        <Line key={i}
          x1={mw*0.45} y1={mh*0.38}
          x2={mw*tx}   y2={mh*ty}
          stroke="rgba(255,220,100,0.2)" strokeWidth={1}
        />
      ))}

      {/* Gold pins (Runners) */}
      {GOLD_PINS.map((p, i) => (
        <G key={i}>
          <Circle cx={mw*p.x} cy={mh*p.y} r={12} fill={GOLD} opacity={0.9} />
          <Circle cx={mw*p.x} cy={mh*p.y} r={5}  fill="white" />
          <Line x1={mw*p.x} y1={mh*p.y+12} x2={mw*p.x} y2={mh*p.y+22} stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
        </G>
      ))}

      {/* Blue pins (Canvassers) */}
      {BLUE_PINS.map((p, i) => (
        <G key={i}>
          <Circle cx={mw*p.x} cy={mh*p.y} r={11} fill={BLUE} opacity={0.9} />
          <Circle cx={mw*p.x} cy={mh*p.y} r={4}  fill="white" />
          <Line x1={mw*p.x} y1={mh*p.y+11} x2={mw*p.x} y2={mh*p.y+20} stroke={BLUE} strokeWidth={2} strokeLinecap="round" />
        </G>
      ))}

      {/* Panic pin (red glow) */}
      <Circle cx={mw*PANIC_PIN.x} cy={mh*PANIC_PIN.y} r={24} fill="rgba(220,20,60,0.25)" />
      <Circle cx={mw*PANIC_PIN.x} cy={mh*PANIC_PIN.y} r={16} fill={RED} />
      <Circle cx={mw*PANIC_PIN.x} cy={mh*PANIC_PIN.y} r={7}  fill="white" />

      {/* Small gold dot */}
      <Circle cx={mw*SMALL_GOLD.x} cy={mh*SMALL_GOLD.y} r={8} fill={GOLD} opacity={0.7} />

      {/* Car icon bottom right */}
      <G>
        <Rect x={mw*0.85} y={mh*0.88} width={28} height={18} rx={6} fill="#1E293B" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
        <Text>🚗</Text>
      </G>
    </Svg>
  );
}

export default function RunnerTrackingScreen({ navigation }) {
  const [runners, setRunners] = useState(RUNNERS);

  useEffect(() => {
    runnersAPI.list().then(res => {
      const data = res.data || [];
      if (data.length > 0) {
        setRunners(data.map(r => ({
          name: r.user?.name || r.name || 'Runner',
          dist: r.distance_km ? `${r.distance_km} km away` : '0.8 km away',
          task: r.current_task || r.status || 'Door-to-Door',
          eta: r.eta_minutes ? `${r.eta_minutes} min` : '10 min',
          gps: r.last_lat ? 'GPS Active' : 'GPS Active',
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6, marginRight: 4 }}>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: '300', lineHeight: 28 }}>‹</Text>
          </TouchableOpacity>
          <View style={styles.logoRow}>
            <View style={styles.logoCircle}><Text style={styles.logoTxt}>365</Text></View>
            <Text style={styles.headerTitle}>Campaign 365</Text>
          </View>
          <View style={styles.liveTeam}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live Team</Text>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          {[
            { color: BLUE, label: 'Canvassers' },
            { color: GOLD, label: 'Runners' },
            { color: RED,  label: 'Panic Button' },
          ].map((l, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: l.color }]} />
              <Text style={styles.legendTxt}>{l.label}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>

      {/* Map */}
      <View style={styles.mapWrap}>
        <MapView />
        {/* Left sidebar icons */}
        <View style={styles.mapSidebar}>
          {['🚗','📍','❤'].map((icon, i) => (
            <TouchableOpacity key={i} style={styles.sidebarBtn}>
              <Text style={{ fontSize: 16 }}>{icon}</Text>
              {i === 2 && <Text style={styles.sidebarLabel}>Vitie</Text>}
            </TouchableOpacity>
          ))}
        </View>
        {/* Car FAB */}
        <TouchableOpacity style={styles.carFab}>
          <Text style={{ fontSize: 20 }}>🚗</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>Runner</Text>
        {runners.map((r, i) => (
          <View key={i} style={styles.runnerRow}>
            <View style={styles.runnerAvatar}>
              <Text style={styles.runnerAvatarTxt}>{r.name ? r.name[0].toUpperCase() : 'R'}</Text>
              <View style={styles.runnerOnline} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.runnerName}>{r.name} — {r.dist}</Text>
              <Text style={styles.runnerTask}>• {r.task}</Text>
            </View>
            <Text style={styles.runnerEta}>ETA: <Text style={{ fontWeight: '900' }}>{r.eta}</Text></Text>
          </View>
        ))}

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.contactBtn}>
            <Text style={styles.contactTxt}>Contact Runner</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backupBtn}>
            <Text style={styles.backupTxt}>Request Backup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080E1C' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  logoRow:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoCircle:  { width: 32, height: 32, borderRadius: 8, backgroundColor: '#DC143C', alignItems: 'center', justifyContent: 'center' },
  logoTxt:     { color: 'white', fontWeight: '900', fontSize: 10 },
  headerTitle: { color: 'white', fontWeight: '800', fontSize: 15 },
  liveTeam:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot:     { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  liveText:    { color: 'white', fontWeight: '700', fontSize: 13 },
  legend: {
    flexDirection: 'row', gap: 16, paddingHorizontal: 16, paddingBottom: 8,
  },
  legendItem:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot:   { width: 10, height: 10, borderRadius: 5 },
  legendTxt:   { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
  mapWrap:     { flex: 1, position: 'relative' },
  mapSidebar: {
    position: 'absolute', left: 12, top: 16, gap: 8,
  },
  sidebarBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
  sidebarLabel: { color: 'white', fontSize: 8, marginTop: 2 },
  carFab: {
    position: 'absolute', bottom: 12, right: 12,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#1E3A6A', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: BLUE,
  },
  sheet: {
    backgroundColor: '#111827', padding: 16,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  sheetTitle: { color: 'white', fontWeight: '900', fontSize: 17, marginBottom: 12 },
  runnerRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginBottom: 10, paddingBottom: 10,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  runnerAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: RED, alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  runnerAvatarTxt: { color: 'white', fontWeight: '900', fontSize: 14 },
  runnerOnline: {
    position: 'absolute', bottom: 0, right: 0,
    width: 10, height: 10, borderRadius: 5, backgroundColor: '#22C55E',
    borderWidth: 2, borderColor: '#111827',
  },
  runnerName:  { color: 'white', fontWeight: '700', fontSize: 13 },
  runnerTask:  { color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 2 },
  runnerEta:   { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  actionRow:   { flexDirection: 'row', gap: 10, marginTop: 4 },
  contactBtn: {
    flex: 1, backgroundColor: '#1E293B', borderRadius: 12, paddingVertical: 14,
    alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  contactTxt: { color: 'white', fontWeight: '700', fontSize: 13 },
  backupBtn: {
    flex: 1, backgroundColor: '#1E293B', borderRadius: 12, paddingVertical: 14,
    alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  backupTxt: { color: 'white', fontWeight: '700', fontSize: 13 },
});
