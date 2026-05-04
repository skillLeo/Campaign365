import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect, Path, Circle, G, Text as SvgText } from 'react-native-svg';
import { reportsAPI, dashboardAPI } from '../../services/api';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const GOLD = '#D4A017';

const BAR_DATA = [
  { day: 'Au', val: 28, color: GOLD },
  { day: 'Fb', val: 40, color: RED  },
  { day: 'Wd', val: 35, color: '#22C55E' },
  { day: 'To', val: 8,  color: 'rgba(255,255,255,0.3)' },
];

const DONUT_SLICES = [
  { pct: 0.45, color: '#22C55E' },
  { pct: 0.30, color: RED       },
  { pct: 0.25, color: GOLD      },
];

function BarChart() {
  const cw = (width / 2) - 36;
  const ch = 120;
  const maxVal = 40;
  const barW = (cw - 40) / BAR_DATA.length - 6;
  return (
    <Svg width={cw} height={ch} viewBox={`0 0 ${cw} ${ch}`}>
      {/* Y axis labels */}
      {[0,10,20,30,40].reverse().map((v, i) => (
        <SvgText key={v} x={0} y={8 + i * (ch*0.7/4)} fill="rgba(255,255,255,0.3)" fontSize={8}>{v}</SvgText>
      ))}
      {/* Bars */}
      {BAR_DATA.map((b, i) => {
        const bh = (b.val / maxVal) * (ch * 0.75);
        const x  = 20 + i * (barW + 6);
        return (
          <G key={i}>
            <Rect x={x} y={ch*0.82 - bh} width={barW} height={bh} rx={3} fill={b.color} />
            <SvgText x={x + barW/2} y={ch - 2} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={8}>{b.day}</SvgText>
          </G>
        );
      })}
    </Svg>
  );
}

function DonutChart() {
  const size = (width / 2) - 36;
  const cx   = size / 2;
  const cy   = size / 2;
  const r    = size * 0.35;
  let cumAngle = -Math.PI / 2;

  const slices = DONUT_SLICES.map(s => {
    const startA = cumAngle;
    const endA   = cumAngle + s.pct * 2 * Math.PI;
    cumAngle     = endA;
    const x1 = cx + r * Math.cos(startA);
    const y1 = cy + r * Math.sin(startA);
    const x2 = cx + r * Math.cos(endA);
    const y2 = cy + r * Math.sin(endA);
    const large = s.pct > 0.5 ? 1 : 0;
    const ir = r * 0.55;
    const ix1 = cx + ir * Math.cos(startA);
    const iy1 = cy + ir * Math.sin(startA);
    const ix2 = cx + ir * Math.cos(endA);
    const iy2 = cy + ir * Math.sin(endA);
    return { ...s, d: `M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${ir},${ir} 0 ${large},0 ${ix1},${iy1} Z` };
  });

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => <Path key={i} d={s.d} fill={s.color} />)}
    </Svg>
  );
}

export default function QuickReportsScreen({ navigation }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    dashboardAPI.stats().then(res => setStats(res.data)).catch(() => {});
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
            <View style={styles.sknlpBadge}>
              <Text style={styles.sknlpFlag}>🇰🇳</Text>
              <View>
                <Text style={styles.sknlpTxt}>SKNLP</Text>
                <Text style={styles.sknlpSub}>St. Kitts Nevis Labour Party</Text>
              </View>
            </View>
          </View>
          <Text style={styles.camp365}>Campaign 365</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Quick Reports</Text>

        {/* 4 stat grid */}
        <View style={styles.grid}>
          {/* This Week */}
          <View style={[styles.card, styles.cardGold]}>
            <Text style={styles.cardLabel}>This Week</Text>
            <Text style={styles.cardValue}>{stats?.doors_knocked_today ?? 412}</Text>
            <Text style={styles.cardUnit}>doors</Text>
          </View>

          {/* KPI Summary */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>KPI Summary</Text>
            <Text style={styles.cardValue}>{stats?.sentiment_breakdown?.supporter ?? 187}</Text>
            <Text style={styles.cardUnit}>persuaded</Text>
          </View>

          {/* Support Trend */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Support Trend</Text>
            <BarChart />
          </View>

          {/* Voter Sentiment */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Voter Sentiment</Text>
            <DonutChart />
          </View>
        </View>

        {/* Export button */}
        <TouchableOpacity style={styles.exportBtn}>
          <Text style={styles.exportTxt}>Export Report</Text>
        </TouchableOpacity>

        {/* Share row */}
        <TouchableOpacity style={styles.shareRow}>
          <Text style={styles.shareIcon}>↗</Text>
          <Text style={styles.shareTxt}>Share with Cluster Manager</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom tab bar */}
      <SafeAreaView style={{ backgroundColor: '#0F172A' }}>
        <View style={styles.tabBar}>
          {[
            { icon: '🖼', label: 'Reports' },
            { icon: '📊', label: 'Reports', active: true },
            { icon: '👤', label: 'Reports' },
          ].map((t, i) => (
            <TouchableOpacity key={i} style={styles.tabItem}>
              <Text style={{ fontSize: 20 }}>{t.icon}</Text>
              <Text style={[styles.tabLabel, t.active && styles.tabLabelActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080E1C' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  logoRow:   { flexDirection: 'row', alignItems: 'center' },
  sknlpBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sknlpFlag:  { fontSize: 28 },
  sknlpTxt:   { color: 'white', fontWeight: '900', fontSize: 16 },
  sknlpSub:   { color: 'rgba(255,255,255,0.4)', fontSize: 9 },
  camp365:    { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '600' },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  title: { color: 'white', fontSize: 26, fontWeight: '900', marginBottom: 16, letterSpacing: -0.5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  card: {
    width: (width - 52) / 2,
    backgroundColor: '#1E293B', borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    minHeight: 130, justifyContent: 'center',
  },
  cardGold: {
    borderColor: GOLD, borderWidth: 1.5,
    shadowColor: GOLD, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 10,
  },
  cardLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600', marginBottom: 6 },
  cardValue: { color: 'white', fontSize: 48, fontWeight: '900', lineHeight: 52, letterSpacing: -1 },
  cardUnit:  { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
  exportBtn: {
    backgroundColor: RED, borderRadius: 14, paddingVertical: 17, alignItems: 'center',
    marginBottom: 14,
    shadowColor: RED, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12,
  },
  exportTxt: { color: 'white', fontWeight: '900', fontSize: 17 },
  shareRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  shareIcon: { color: 'rgba(255,255,255,0.5)', fontSize: 16 },
  shareTxt:  { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '600' },
  tabBar:    { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 8 },
  tabItem:   { flex: 1, alignItems: 'center', gap: 3 },
  tabLabel:  { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '600' },
  tabLabelActive: { color: RED },
});
