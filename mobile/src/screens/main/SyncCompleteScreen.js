import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, Dimensions, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const BLUE = '#1D4ED8';
const RED  = '#DC143C';

export default function SyncCompleteScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0.4)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const countAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(countAnim, { toValue: 2341, duration: 1200, useNativeDriver: false }),
    ]).start();
  }, []);

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Floating sparkle dots */}
      {[
        { top: '12%', left: '10%' }, { top: '18%', right: '12%' },
        { top: '30%', left: '5%'  }, { top: '25%', right: '8%'  },
        { top: '38%', left: '20%' },
      ].map((pos, i) => (
        <View key={i} style={[s.sparkle, pos]} />
      ))}

      <SafeAreaView style={s.safeArea}>
        <Animated.View style={[s.content, { opacity: fadeAnim }]}>

          {/* Green checkmark */}
          <Animated.View style={[s.checkWrap, { transform: [{ scale: scaleAnim }] }]}>
            <View style={s.checkCircle}>
              <Text style={s.checkMark}>✓</Text>
            </View>
          </Animated.View>

          {/* Sync Complete */}
          <Text style={s.syncTitle}>Sync Complete! ✨</Text>

          {/* Counter */}
          <Animated.Text style={s.countNum}>
            {countAnim.interpolate
              ? '2,341'
              : '2,341'}
          </Animated.Text>
          <Text style={s.countLabel}>records uploaded</Text>
          <Text style={s.safeMsg}>All data safe in Campaign 365 cloud</Text>

          {/* Share button */}
          <TouchableOpacity style={s.shareBtn} activeOpacity={0.85}>
            <Text style={s.shareTxt}>Share this summary</Text>
          </TouchableOpacity>

          <Text style={s.shareNote}>
            Share this summary with your Cluster Manager to confirm sync is complete.
          </Text>

          {/* Celebration row */}
          <View style={s.celebRow}>
            <View style={s.celebBox}>
              {['🌴','👐','🇰🇳','⭐','👐','🌴'].map((e, i) => (
                <Text key={i} style={{ fontSize: i === 2 ? 30 : 22 }}>{e}</Text>
              ))}
            </View>
          </View>

          {/* Back to Home */}
          <TouchableOpacity
            style={s.homeBtn}
            onPress={() => navigation.replace('Main')}
            activeOpacity={0.85}
          >
            <Text style={s.homeTxt}>Back to Home</Text>
          </TouchableOpacity>

        </Animated.View>
      </SafeAreaView>

      {/* Panic FAB */}
      <TouchableOpacity
        style={s.panicFab}
        onPress={() => navigation.navigate('Panic')}
      >
        <Text style={s.panicIcon}>❗</Text>
        <Text style={s.panicTxt}>Panic</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1B2E' },
  sparkle: {
    position: 'absolute', width: 6, height: 6, borderRadius: 3,
    backgroundColor: 'rgba(255,220,60,0.6)',
  },
  safeArea: { flex: 1 },
  content: {
    flex: 1, alignItems: 'center', paddingHorizontal: 28,
    paddingTop: 20, paddingBottom: 100,
  },

  checkWrap: { marginBottom: 24, marginTop: 16 },
  checkCircle: {
    width: 96, height: 96, borderRadius: 22,
    backgroundColor: '#22C55E',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#22C55E', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55, shadowRadius: 20,
  },
  checkMark: { color: 'white', fontSize: 52, fontWeight: '900' },

  syncTitle: {
    color: 'white', fontSize: 28, fontWeight: '900', marginBottom: 8,
    letterSpacing: -0.3,
  },
  countNum: {
    color: 'white', fontSize: 64, fontWeight: '900', lineHeight: 68, letterSpacing: -2,
  },
  countLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  safeMsg:   { color: 'rgba(255,255,255,0.45)', fontSize: 14, marginBottom: 28 },

  shareBtn: {
    backgroundColor: BLUE, borderRadius: 14, paddingVertical: 17,
    alignItems: 'center', width: width - 56, marginBottom: 10,
    shadowColor: BLUE, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12,
  },
  shareTxt:  { color: 'white', fontWeight: '800', fontSize: 16 },
  shareNote: {
    color: 'rgba(255,255,255,0.4)', fontSize: 12, textAlign: 'center',
    lineHeight: 18, marginBottom: 20, paddingHorizontal: 10,
  },

  celebRow: { width: width - 56, marginBottom: 20 },
  celebBox: {
    backgroundColor: 'rgba(220,20,60,0.12)',
    borderRadius: 16, paddingVertical: 20,
    flexDirection: 'row', justifyContent: 'center', gap: 10,
    borderWidth: 1, borderColor: 'rgba(220,20,60,0.25)',
  },

  homeBtn: {
    backgroundColor: BLUE, borderRadius: 14, paddingVertical: 17,
    alignItems: 'center', width: width - 56,
    shadowColor: BLUE, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12,
  },
  homeTxt: { color: 'white', fontWeight: '800', fontSize: 16 },

  panicFab: {
    position: 'absolute', bottom: 36, right: 20,
    backgroundColor: RED, borderRadius: 30,
    paddingHorizontal: 14, paddingVertical: 10,
    alignItems: 'center',
    shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 10,
  },
  panicIcon: { fontSize: 18 },
  panicTxt:  { color: 'white', fontWeight: '900', fontSize: 10, marginTop: 2 },
});
