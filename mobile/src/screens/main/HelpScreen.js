import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const GOLD = '#C9A84C';
const DARK = '#1A0A08';

const HELP_ITEMS = [
  { icon: '📁', title: 'How to Use\nSpeech-to-Text',   sub: 'Canvassing Speech-to-Text guide' },
  { icon: '📤', title: 'Panic Button\nTutorial',        sub: 'Canvassing Best Practices Tutorial' },
  { icon: '▶️', title: 'Canvassing Best\nPractices Video', sub: 'Canvassing Best Practices Video' },
  { icon: '📱', title: 'Contact Cluster\nManager',      sub: 'Reach your Cluster Manager directly' },
];

const FAQS = [
  { q: 'How do I use the app offline?',            a: 'The app works fully offline. All data syncs automatically when you reconnect.' },
  { q: 'How do I record voter conversations?',     a: 'Tap the mic button on the Canvassing screen to start Speech-to-Text recording.' },
  { q: 'What does the Panic Button do?',           a: 'It immediately alerts HQ and emergency contacts with your GPS location.' },
  { q: 'How do I sync my data?',                   a: 'Data syncs automatically. You can also tap Log Out & Sync Data from your profile.' },
  { q: 'How do I assign a voter a support level?', a: 'On the Voter Interaction screen, tap one of the 4 support level cards.' },
];

export default function HelpScreen({ navigation }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Maroon header */}
      <View style={s.headerBg}>
        <SafeAreaView>
          <View style={s.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
              <Text style={s.backArrow}>‹</Text>
            </TouchableOpacity>
            <View style={s.headerTextWrap}>
              <Text style={s.headerTitle}>Campaign 365</Text>
              <Text style={s.headerSub}>Canvassing Mobile App</Text>
            </View>
            <View style={{ width: 32 }} />
          </View>
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Section title */}
        <Text style={s.sectionTitle}>Help &amp; Training Center</Text>

        {/* 2x2 grid */}
        <View style={s.grid}>
          {HELP_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={s.helpCard} activeOpacity={0.8}>
              <View style={s.helpIconWrap}>
                <Text style={s.helpIcon}>{item.icon}</Text>
              </View>
              <Text style={s.helpTitle}>{item.title}</Text>
              <Text style={s.helpSub}>{item.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ */}
        <Text style={s.faqTitle}>Frequently Asked Questions</Text>
        <View style={s.faqList}>
          {FAQS.map((faq, i) => (
            <TouchableOpacity
              key={i}
              style={s.faqItem}
              onPress={() => setOpenFaq(openFaq === i ? null : i)}
              activeOpacity={0.85}
            >
              <View style={s.faqRow}>
                <Text style={s.faqIcon}>🔄</Text>
                <Text style={s.faqQ}>{faq.q}</Text>
                <Text style={s.faqChevron}>{openFaq === i ? '∨' : '›'}</Text>
              </View>
              {openFaq === i && (
                <Text style={s.faqA}>{faq.a}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Bottom tab bar */}
      <SafeAreaView style={{ backgroundColor: '#111' }}>
        <View style={s.tabBar}>
          {[
            { icon: '🏠', label: 'Home',       route: 'Main'    },
            { icon: '🗺️', label: 'Canvassing', route: null      },
            { icon: '🎒', label: 'Help',        route: null, active: true },
            { icon: '👤', label: 'Profile',     route: null      },
          ].map((t, i) => (
            <TouchableOpacity
              key={i}
              style={s.tabItem}
              onPress={() => t.route && navigation.navigate(t.route)}
            >
              <Text style={{ fontSize: 20 }}>{t.icon}</Text>
              <Text style={[s.tabLabel, t.active && s.tabLabelActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },

  headerBg: { backgroundColor: '#3D0A0A' },
  headerContent: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn:   { width: 32, padding: 4 },
  backArrow: { color: 'white', fontSize: 28, fontWeight: '300', lineHeight: 28 },
  headerTextWrap: { flex: 1, alignItems: 'center' },
  headerTitle: {
    color: GOLD, fontSize: 26, fontWeight: '900', fontStyle: 'italic', letterSpacing: -0.5,
  },
  headerSub: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '500' },

  scroll: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 20 },

  sectionTitle: {
    color: 'white', fontSize: 26, fontWeight: '900', marginBottom: 16, letterSpacing: -0.5,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 },
  helpCard: {
    width: (width - 42) / 2,
    backgroundColor: '#1E1E1E', borderRadius: 16,
    padding: 18, gap: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  helpIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(201,168,76,0.15)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.3)',
  },
  helpIcon:  { fontSize: 22 },
  helpTitle: {
    color: 'white', fontSize: 14, fontWeight: '700', lineHeight: 20,
  },
  helpSub: {
    color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 16,
  },

  faqTitle: {
    color: 'white', fontSize: 22, fontWeight: '900', marginBottom: 12, letterSpacing: -0.3,
  },
  faqList: { gap: 8 },
  faqItem: {
    backgroundColor: '#1E1E1E', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  faqRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  faqIcon:    { fontSize: 16 },
  faqQ:       { flex: 1, color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: '600' },
  faqChevron: { color: 'rgba(255,255,255,0.4)', fontSize: 18, fontWeight: '300' },
  faqA: {
    color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 20,
    marginTop: 10, paddingTop: 10,
    borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },

  tabBar:       { flexDirection: 'row', paddingVertical: 10 },
  tabItem:      { flex: 1, alignItems: 'center', gap: 4 },
  tabLabel:     { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '600' },
  tabLabelActive: { color: GOLD },
});
