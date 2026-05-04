import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  Dimensions, ScrollView, StatusBar, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, Line, G } from 'react-native-svg';
import { canvassingAPI, votersAPI } from '../../services/api';

const { width } = Dimensions.get('window');
const RED = '#DC143C';

const VOTER_FALLBACK = {
  id: null,
  name: 'Michael Edwards',
  location: 'Basseterre',
  status: 'Undecided',
  initials: 'ME',
};

function MapView() {
  return (
    <Svg width={width} height={200} viewBox={`0 0 ${width} 200`}>
      <Rect width={width} height={200} fill="#c8d6c0" />
      {/* Roads */}
      <Path d={`M0,80 Q${width*0.3},60 ${width*0.6},90 L${width},70`} stroke="#b5a97a" strokeWidth={18} fill="none" />
      <Path d={`M${width*0.2},0 L${width*0.25},200`} stroke="#b5a97a" strokeWidth={14} fill="none" />
      <Path d={`M0,140 Q${width*0.4},120 ${width},150`} stroke="#b5a97a" strokeWidth={10} fill="none" />
      <Path d={`M${width*0.55},0 L${width*0.6},200`} stroke="#b5a97a" strokeWidth={10} fill="none" />
      {/* Road center lines */}
      <Path d={`M0,80 Q${width*0.3},60 ${width*0.6},90 L${width},70`} stroke="rgba(255,255,255,0.6)" strokeWidth={2} strokeDasharray="12,8" fill="none" />
      {/* Buildings */}
      {[[20,100,50,35],[90,95,40,40],[160,92,55,45],[240,100,45,38],[310,95,50,42],[375,98,45,36]].map(([x,y,w,h],i) => (
        <Rect key={i} x={x} y={y} width={w} height={h} fill={['#e8e0d0','#d4cfc0','#ddd8c5'][i%3]} rx={2} />
      ))}
      {/* Red route line */}
      <Path d={`M${width*0.35},200 Q${width*0.38},150 ${width*0.42},100 Q${width*0.44},80 ${width*0.4},70`}
        stroke={RED} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* Location pin */}
      <G>
        <Circle cx={width*0.4} cy={58} r={18} fill={RED} />
        <Circle cx={width*0.4} cy={58} r={8}  fill="white" />
        <Path d={`M${width*0.4},76 L${width*0.4},90`} stroke={RED} strokeWidth={3} strokeLinecap="round" />
      </G>
      {/* Map labels */}
      <Rect x={width*0.5} y={60} width={70} height={16} rx={3} fill="rgba(255,255,255,0.8)" />
      <Rect x={width*0.52} y={63} width={55} height={10} rx={2} fill="#888" opacity={0.3} />
    </Svg>
  );
}

function Waveform({ active }) {
  const bars = [3,6,10,8,14,9,12,6,10,8,5,12,9,14,8,10,6,11,7,13,9,6,11,8,14,10,7,12,9,6];
  return (
    <View style={wv.wrap}>
      {bars.map((h, i) => (
        <Animated.View key={i} style={[wv.bar, {
          height: active ? h * 2.5 : h,
          backgroundColor: active ? RED : 'rgba(255,255,255,0.2)',
          opacity: active ? (0.4 + (i % 5) * 0.15) : 0.3,
        }]} />
      ))}
    </View>
  );
}

const wv = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 3, flex: 1 },
  bar:  { width: 3, borderRadius: 2 },
});

export default function CanvassingScreen({ navigation }) {
  const [support, setSupport] = useState('Undecided');
  const [recording, setRecording] = useState(false);
  const [currentVoter, setCurrentVoter] = useState(VOTER_FALLBACK);
  const [canvassingList, setCanvassingList] = useState(null);
  const [saving, setSaving] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    canvassingAPI.lists().then(res => {
      const lists = res.data || [];
      const active = lists.find(l => l.status === 'active') || lists[0];
      if (active) {
        setCanvassingList(active);
        canvassingAPI.showList(active.id).then(r => {
          const voters = r.data?.door_knocks?.filter(dk => !dk.result).map(dk => dk.voter);
          if (voters && voters.length > 0) {
            const v = voters[0];
            const fullName = `${v.first_name} ${v.last_name}`;
            setCurrentVoter({
              id: v.id,
              name: fullName,
              location: v.constituency || 'Basseterre',
              status: v.sentiment ? v.sentiment.charAt(0).toUpperCase() + v.sentiment.slice(1) : 'Undecided',
              initials: `${v.first_name?.[0] || 'M'}${v.last_name?.[0] || 'E'}`.toUpperCase(),
            });
          }
        }).catch(() => {});
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (recording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.25, duration: 500, useNativeDriver: true }),
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
          <View style={styles.logoRow}>
            <View style={styles.logoCircle}><Text style={styles.logoTxt}>365</Text></View>
            <View>
              <Text style={styles.logoSKNLP}>SKNLP</Text>
              <Text style={styles.logoCamp}>Campaign 365</Text>
            </View>
          </View>
          <View style={styles.gpsRow}>
            <View style={styles.gpsDot} />
            <Text style={styles.gpsText}>Live GPS</Text>
          </View>
          <View style={styles.avatarCircle}><Text style={styles.avatarText}>JD</Text></View>
        </View>
      </SafeAreaView>

      {/* Red banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Active Canvassing — Basseterre Turf</Text>
      </View>

      {/* Map */}
      <View style={styles.mapWrap}>
        <MapView />
        {/* Mic mute btn */}
        <TouchableOpacity style={styles.muteBtn}>
          <Text style={{ fontSize: 18 }}>🎙</Text>
        </TouchableOpacity>
      </View>

      {/* Panic button */}
      <TouchableOpacity
        style={styles.panicBtn}
        onPress={() => navigation.navigate('Panic')}
      >
        <Text style={styles.panicSkull}>💀</Text>
        <Text style={styles.panicLabel}>Panic</Text>
      </TouchableOpacity>

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        <View style={styles.sheetHandle} />

        {/* Next Door header */}
        <View style={styles.nextDoorRow}>
          <Text style={styles.nextDoor}>Next Door</Text>
          <TouchableOpacity style={styles.notHomeBtn}>
            <Text style={styles.notHomeTxt}>Not Home</Text>
          </TouchableOpacity>
        </View>

        {/* Voter card */}
        <View style={styles.voterCard}>
          <View style={styles.voterAvatar}>
            <Text style={styles.voterInitials}>{currentVoter.initials}</Text>
          </View>
          <View style={styles.voterInfo}>
            <Text style={styles.voterName}>{currentVoter.name}</Text>
            <View style={styles.voterTags}>
              <Text style={styles.tagUndecided}>{currentVoter.status}</Text>
              <Text style={styles.tagLocation}>{currentVoter.location}</Text>
            </View>
          </View>
        </View>

        {/* Support buttons */}
        <View style={styles.supportRow}>
          {['Support', 'Undecided', 'Oppose'].map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.supportBtn, support === s && styles.supportBtnActive]}
              onPress={() => setSupport(s)}
            >
              <Text style={[styles.supportBtnTxt, support === s && styles.supportBtnTxtActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

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

        <Text style={styles.sttLabel}>Start Speech-to-Text Recording</Text>

        {/* Save & Next */}
        <TouchableOpacity
          style={[styles.saveBtn, saving && { opacity: 0.7 }]}
          disabled={saving}
          onPress={async () => {
            if (canvassingList && currentVoter.id) {
              setSaving(true);
              try {
                await canvassingAPI.doorKnock({
                  canvassing_list_id: canvassingList.id,
                  voter_id: currentVoter.id,
                  result: 'answered',
                  sentiment: support === 'Support' ? 'supporter' : support === 'Oppose' ? 'opposition' : 'undecided',
                });
              } catch {}
              setSaving(false);
            }
            navigation.navigate('VoterInteraction');
          }}
        >
          <Text style={styles.saveBtnTxt}>Save & Next Voter →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080E1C' },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  logoRow:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoCircle: { width: 32, height: 32, borderRadius: 8, backgroundColor: RED, alignItems: 'center', justifyContent: 'center' },
  logoTxt:   { color: 'white', fontWeight: '900', fontSize: 10 },
  logoSKNLP: { color: 'white', fontWeight: '900', fontSize: 13 },
  logoCamp:  { color: '#D4A017', fontSize: 9, fontWeight: '600' },
  gpsRow:    { flexDirection: 'row', alignItems: 'center', gap: 5 },
  gpsDot:    { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  gpsText:   { color: 'white', fontSize: 13, fontWeight: '700' },
  avatarCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: 'white', fontWeight: '700', fontSize: 12 },
  banner: { backgroundColor: RED, paddingVertical: 10, paddingHorizontal: 16 },
  bannerText: { color: 'white', fontWeight: '800', fontSize: 14, textAlign: 'center' },
  mapWrap: { position: 'relative' },
  muteBtn: {
    position: 'absolute', top: 12, right: 12,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
  panicBtn: {
    position: 'absolute', right: -2, top: 280,
    backgroundColor: RED, borderRadius: 12, borderTopRightRadius: 0, borderBottomRightRadius: 0,
    paddingHorizontal: 10, paddingVertical: 10, alignItems: 'center', zIndex: 10,
    shadowColor: RED, shadowOffset: { width: -4, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10,
  },
  panicSkull: { fontSize: 22 },
  panicLabel: { color: 'white', fontSize: 10, fontWeight: '800', marginTop: 2 },
  sheet: {
    flex: 1, backgroundColor: '#111827',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24,
  },
  sheetHandle: { width: 36, height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  nextDoorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  nextDoor: { color: 'white', fontSize: 18, fontWeight: '900' },
  notHomeBtn: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  notHomeTxt: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
  voterCard: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  voterAvatar: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center' },
  voterInitials: { color: 'white', fontWeight: '900', fontSize: 20 },
  voterInfo: { flex: 1 },
  voterName: { color: 'white', fontWeight: '900', fontSize: 22, marginBottom: 6 },
  voterTags: { flexDirection: 'row', gap: 8 },
  tagUndecided: { color: RED, fontSize: 13, fontWeight: '700' },
  tagNotHome:   { color: '#64748B', fontSize: 13 },
  tagLocation:  { color: '#64748B', fontSize: 13 },
  supportRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  supportBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
  },
  supportBtnActive: { backgroundColor: RED, borderColor: RED },
  supportBtnTxt: { color: 'rgba(255,255,255,0.6)', fontWeight: '700', fontSize: 13 },
  supportBtnTxtActive: { color: 'white' },
  micRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  micBtn: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#1E293B',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.15)',
  },
  micBtnActive: { backgroundColor: RED, borderColor: RED },
  micIcon: { fontSize: 24 },
  sttLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 12, textAlign: 'center', marginBottom: 14 },
  saveBtn: { backgroundColor: RED, borderRadius: 14, paddingVertical: 15, alignItems: 'center', shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 },
  saveBtnTxt: { color: 'white', fontWeight: '800', fontSize: 15 },
});
