import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const RED  = '#DC143C';
const GOLD = '#D4A017';

const INSIGHTS = [
  {
    icon: '👤',
    title: 'Focus on these 14 undecided voters —\npredicted 68% conversion',
    type: 'voter',
  },
  {
    icon: '🎤',
    prefix: 'Speech-to-Text trend:',
    title: '42% mention healthcare',
    type: 'stt',
  },
  {
    icon: '📍',
    prefix: 'Suggested next door:',
    title: 'Mrs. Thomas (high influence)',
    type: 'location',
  },
];

function BackgroundWaveform() {
  const bars = Array.from({ length: 40 }, (_, i) => 10 + (i % 7) * 8);
  return (
    <View style={bw.wrap}>
      {bars.map((h, i) => (
        <View key={i} style={[bw.bar, { height: h, opacity: 0.06 + (i % 5) * 0.01 }]} />
      ))}
    </View>
  );
}

const bw = StyleSheet.create({
  wrap: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-end', gap: 3, paddingHorizontal: 8 },
  bar:  { flex: 1, backgroundColor: 'white', borderRadius: 2 },
});

export default function AIInsightsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('AI Assistant');
  const [listening, setListening] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim,  { toValue: 1, duration: 2000, useNativeDriver: false }),
        Animated.timing(glowAnim,  { toValue: 0, duration: 2000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (listening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,    duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [listening]);

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(220,20,60,0.05)', 'rgba(220,20,60,0.12)'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: '#0D1A2E' }]}>
      <StatusBar barStyle="light-content" />

      {/* Background waveform */}
      <BackgroundWaveform />

      {/* Glow overlay */}
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: glowColor }]} />

      <SafeAreaView>
        {/* Back + Tab bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingTop: 4 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: '300', lineHeight: 28 }}>‹</Text>
          </TouchableOpacity>
          <View style={[styles.topTabs, { flex: 1 }]}>
            {['SKNLP', 'Campaign 365', 'AI Assistant'].map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.topTab, activeTab === t && styles.topTabActive]}
              onPress={() => setActiveTab(t)}
            >
              <Text style={[styles.topTabTxt, activeTab === t && styles.topTabTxtActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Title */}
        <Text style={styles.title}>Smart Insights{'\n'}for Your Turf</Text>

        {/* Insight cards */}
        {INSIGHTS.map((ins, i) => (
          <View key={i} style={styles.insightCard}>
            {ins.prefix ? (
              <>
                <Text style={styles.insightPrefix}>
                  {ins.icon} {ins.prefix}
                </Text>
                <Text style={styles.insightTitle}>{ins.title}</Text>
              </>
            ) : (
              <View style={styles.insightRow}>
                <Text style={styles.insightTitle}>{ins.title}</Text>
                <View style={styles.insightAvatar}>
                  <Text style={{ fontSize: 16 }}>{ins.icon}</Text>
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Dots */}
        <View style={styles.dotsRow}>
          {[0,1,2,3,4].map(i => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>
      </ScrollView>

      {/* Ask AI button */}
      <View style={styles.bottomWrap}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={[styles.askBtn, listening && styles.askBtnListening]}
            onPress={() => setListening(v => !v)}
            activeOpacity={0.85}
          >
            <Text style={styles.askMic}>🎤</Text>
            <Text style={styles.askTxt}>{listening ? 'Listening...' : 'Ask AI'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topTabs: {
    flexDirection: 'row', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4, gap: 4,
  },
  topTab: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
  },
  topTabActive: {
    borderBottomWidth: 2, borderBottomColor: RED,
  },
  topTabTxt:       { color: 'rgba(255,255,255,0.45)', fontWeight: '600', fontSize: 13 },
  topTabTxtActive: { color: 'white', fontWeight: '800' },
  scroll: { paddingHorizontal: 24, paddingBottom: 120 },
  title: {
    color: 'white', fontSize: 36, fontWeight: '900',
    lineHeight: 42, letterSpacing: -0.5,
    marginTop: 16, marginBottom: 24,
  },
  insightCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16, padding: 18, marginBottom: 12,
  },
  insightRow: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
  },
  insightPrefix: {
    color: GOLD, fontWeight: '700', fontSize: 14, marginBottom: 4,
  },
  insightTitle: {
    color: 'white', fontSize: 16, fontWeight: '700', lineHeight: 24, flex: 1,
  },
  insightAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 8 },
  dot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotActive: { backgroundColor: 'white', width: 16 },
  bottomWrap: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 24, paddingBottom: 44, paddingTop: 16,
    backgroundColor: 'rgba(13,26,46,0.95)',
  },
  askBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: RED, borderRadius: 30, paddingVertical: 18,
    shadowColor: RED, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5, shadowRadius: 16, elevation: 12,
  },
  askBtnListening: { backgroundColor: '#a00020' },
  askMic: { fontSize: 20 },
  askTxt: { color: 'white', fontWeight: '900', fontSize: 18, letterSpacing: 0.5 },
});
