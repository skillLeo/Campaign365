import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const RED = '#DC143C';

const ISSUE_TYPES = [
  { id: 'hostile', label: 'Hostile Voter', icon: '🏛' },
  { id: 'dog',     label: 'Dog Present',   icon: '🏦' },
  { id: 'access',  label: 'No Access',     icon: '🐕' },
  { id: 'safety',  label: 'Safety Concern',icon: '🪪' },
];

const SAFETY_TIPS = ['Stay Calm', 'Do Not Engage', 'Document Evidence', 'Leave Safely'];

export default function ReportIssueScreen({ navigation }) {
  const [selected,    setSelected]    = useState('hostile');
  const [notes,       setNotes]       = useState('');
  const [showTips,    setShowTips]    = useState(true);
  const [submitted,   setSubmitted]   = useState(false);

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={s.backArrow}>‹</Text>
          </TouchableOpacity>
          <View style={s.logoRow}>
            <Text style={s.sknlpTxt}>SKNLP</Text>
            <Text style={s.camp365}>Campaign 365</Text>
          </View>
          <TouchableOpacity>
            <Text style={s.menuIcon}>≡</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Red banner */}
      <View style={s.redBanner}>
        <Text style={s.bannerTxt}>Report Issue - Hostile Door</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* 2x2 issue grid */}
        <View style={s.issueGrid}>
          {ISSUE_TYPES.map(it => (
            <TouchableOpacity
              key={it.id}
              style={[s.issueBtn, selected === it.id && s.issueBtnActive]}
              onPress={() => setSelected(it.id)}
            >
              <Text style={s.issueIcon}>{it.icon}</Text>
              <Text style={[s.issueLabel, selected === it.id && s.issueLabelActive]}>{it.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Safety Tips */}
        {showTips && (
          <View style={s.tipsCard}>
            <View style={s.tipsHeader}>
              <Text style={s.tipsTitleTxt}>Safety Tips</Text>
              <TouchableOpacity onPress={() => setShowTips(false)}>
                <Text style={{ color: '#999', fontSize: 16 }}>✕</Text>
              </TouchableOpacity>
            </View>
            {SAFETY_TIPS.map((tip, i) => (
              <Text key={i} style={s.tipItem}>• {tip}</Text>
            ))}
          </View>
        )}

        {/* Photo + GPS row */}
        <View style={s.photoRow}>
          <View style={s.photoBox}>
            <Text style={{ fontSize: 32 }}>🖼</Text>
            <Text style={s.photoLabel}>GPS 📷</Text>
          </View>
          <View style={s.locationBox}>
            <Text style={s.locationPre}>Auto-Filled:</Text>
            <Text style={s.locationVal}>📍 Your Location</Text>
          </View>
        </View>

        {/* Notes */}
        <View style={s.notesWrap}>
          <TextInput
            style={s.notesInput}
            placeholder={'Note: Describe the situation (e.g., "Voter\nrefused entry, dog aggressive")'}
            placeholderTextColor="#999"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[s.submitBtn, submitted && { backgroundColor: '#22C55E' }]}
          onPress={() => setSubmitted(true)}
          activeOpacity={0.85}
        >
          <Text style={s.submitIcon}>🛡</Text>
          <Text style={s.submitTxt}>
            {submitted ? '✓ Report Submitted!' : 'Submit Report & Alert Cluster'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Panic FAB */}
      <TouchableOpacity
        style={s.panicFab}
        onPress={() => navigation.navigate('Panic')}
      >
        <Text style={{ fontSize: 22 }}>🆘</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#F5F5F7' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: 'white',
  },
  backBtn:   { padding: 6 },
  backArrow: { color: '#333', fontSize: 28, fontWeight: '300', lineHeight: 28 },
  logoRow:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sknlpTxt:  { color: RED, fontWeight: '900', fontSize: 18, letterSpacing: 1 },
  camp365:   { color: '#333', fontWeight: '700', fontSize: 14 },
  menuIcon:  { color: '#333', fontSize: 22 },

  redBanner: {
    backgroundColor: RED, paddingVertical: 14, paddingHorizontal: 20,
  },
  bannerTxt: { color: 'white', fontWeight: '800', fontSize: 17 },

  scroll: { padding: 16, paddingBottom: 100 },

  issueGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  issueBtn: {
    width: (width - 42) / 2,
    backgroundColor: 'white', borderRadius: 14,
    paddingVertical: 18, alignItems: 'center', gap: 8,
    borderWidth: 1.5, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6,
  },
  issueBtnActive:  { backgroundColor: RED, borderColor: RED },
  issueIcon:       { fontSize: 26 },
  issueLabel:      { color: '#333', fontWeight: '700', fontSize: 13, textAlign: 'center' },
  issueLabelActive:{ color: 'white' },

  tipsCard: {
    backgroundColor: 'white', borderRadius: 14, padding: 16,
    marginBottom: 16, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6,
  },
  tipsHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  tipsTitleTxt:{ color: '#111', fontWeight: '800', fontSize: 15 },
  tipItem:     { color: '#444', fontSize: 14, lineHeight: 24, fontWeight: '500' },

  photoRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  photoBox: {
    flex: 1, backgroundColor: 'white', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', paddingVertical: 20,
    borderWidth: 1, borderColor: '#E5E7EB', gap: 4,
  },
  photoLabel:   { color: '#666', fontSize: 12, fontWeight: '600' },
  locationBox: {
    flex: 1, backgroundColor: 'white', borderRadius: 12,
    justifyContent: 'center', paddingHorizontal: 14,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  locationPre: { color: '#999', fontSize: 12, marginBottom: 4 },
  locationVal: { color: '#111', fontWeight: '700', fontSize: 14 },

  notesWrap: {
    backgroundColor: 'white', borderRadius: 12, marginBottom: 16,
    borderWidth: 1, borderColor: '#E5E7EB',
    paddingHorizontal: 14, paddingVertical: 12,
  },
  notesInput: { color: '#333', fontSize: 13, lineHeight: 20, minHeight: 60 },

  submitBtn: {
    backgroundColor: RED, borderRadius: 14, paddingVertical: 18,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: RED, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12,
  },
  submitIcon: { fontSize: 18 },
  submitTxt:  { color: 'white', fontWeight: '900', fontSize: 16 },

  panicFab: {
    position: 'absolute', bottom: 32, right: 20,
    width: 54, height: 54, borderRadius: 27,
    backgroundColor: RED, alignItems: 'center', justifyContent: 'center',
    shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.55, shadowRadius: 10,
  },
});
