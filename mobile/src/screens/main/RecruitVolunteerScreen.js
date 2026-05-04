import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const RED = '#DC143C';

export default function RecruitVolunteerScreen({ navigation }) {
  const [availability, setAvailability] = useState('Canvassing');
  const [skill,        setSkill]        = useState('Phone Bank');
  const [info,         setInfo]         = useState('');
  const [success,      setSuccess]      = useState(false);

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
            <View style={s.logoCircle}><Text style={s.logoIcon}>🔴</Text></View>
            <Text style={s.sknlpTxt}>SKNLP</Text>
          </View>
          <Text style={s.camp365}>Campaign 365</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Title */}
        <Text style={s.title}>Recruit Volunteer</Text>
        <Text style={s.subtitle}>
          Great conversation!{'\n'}Would you like to join the Red Wave team?
        </Text>

        {/* Quick Form */}
        <View style={s.formCard}>
          <Text style={s.sectionLabel}>Quick Form</Text>

          <View style={s.formGrid}>
            {/* Availability */}
            <View style={s.formCol}>
              <Text style={s.colLabel}>Availability</Text>
              {['Canvassing', 'Runner'].map(opt => (
                <TouchableOpacity key={opt} style={s.radioRow} onPress={() => setAvailability(opt)}>
                  <View style={[s.radioOuter, availability === opt && s.radioOuterActive]}>
                    {availability === opt && <View style={s.radioInner} />}
                  </View>
                  <Text style={s.radioLabel}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Skills */}
            <View style={s.formCol}>
              <Text style={s.colLabel}>Skills</Text>
              {['Phone Bank', 'Social Media'].map(opt => (
                <TouchableOpacity key={opt} style={s.radioRow} onPress={() => setSkill(opt)}>
                  <View style={[s.radioOuter, skill === opt && s.radioOuterActive]}>
                    {skill === opt && <View style={s.radioInner} />}
                  </View>
                  <Text style={s.radioLabel}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={s.autoFillNote}>Automatically filled from voter database.</Text>
          <TextInput
            style={s.infoInput}
            placeholder="Select information"
            placeholderTextColor="#999"
            value={info}
            onChangeText={setInfo}
          />

          {/* Sign up button */}
          <TouchableOpacity
            style={[s.signBtn, success && { backgroundColor: '#22C55E' }]}
            onPress={() => setSuccess(true)}
            activeOpacity={0.85}
          >
            <Text style={s.signIcon}>◎</Text>
            <Text style={s.signTxt}>{success ? '✓ Volunteer Signed Up!' : 'Sign Up as Volunteer'}</Text>
          </TouchableOpacity>
        </View>

        {/* Success Preview */}
        <View style={s.successPreview}>
          <Text style={s.successTitle}>Success Preview.</Text>
          <View style={s.successBox}>
            {success ? (
              <>
                <Text style={{ fontSize: 48 }}>✅</Text>
                <Text style={s.successMsg}>Volunteer successfully added{'\n'}to the Red Wave team!</Text>
              </>
            ) : (
              <>
                <View style={s.checkCircle}>
                  <Text style={{ fontSize: 32 }}>✓</Text>
                </View>
                <Text style={s.successMsg}>You successfully Volunteer!{'\n'}Happy to join the Red Wave team!</Text>
              </>
            )}
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Panic FAB */}
      <TouchableOpacity
        style={s.panicFab}
        onPress={() => navigation.navigate('Panic')}
      >
        <View style={s.panicInner}>
          <Text style={{ fontSize: 18 }}>⏻</Text>
          <Text style={s.panicTxt}>Panic{'\n'}Button</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F7' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10, backgroundColor: 'white',
  },
  backBtn:    { padding: 6 },
  backArrow:  { color: '#333', fontSize: 28, fontWeight: '300', lineHeight: 28 },
  logoRow:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFE5E5', alignItems: 'center', justifyContent: 'center' },
  logoIcon:   { fontSize: 14 },
  sknlpTxt:   { color: '#DC143C', fontWeight: '900', fontSize: 18, letterSpacing: 1 },
  camp365:    { color: '#333', fontWeight: '600', fontSize: 13 },

  scroll: { padding: 20, paddingBottom: 100 },

  title: {
    color: '#111', fontSize: 28, fontWeight: '900', letterSpacing: -0.5, marginBottom: 8,
  },
  subtitle: {
    color: '#555', fontSize: 14, lineHeight: 22, marginBottom: 20,
  },

  formCard: {
    backgroundColor: 'white', borderRadius: 16, padding: 20,
    marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8,
  },
  sectionLabel: { color: '#111', fontWeight: '800', fontSize: 16, marginBottom: 16 },

  formGrid: { flexDirection: 'row', gap: 20, marginBottom: 16 },
  formCol:  { flex: 1, gap: 12 },
  colLabel: { color: '#111', fontWeight: '700', fontSize: 13, marginBottom: 4 },

  radioRow:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  radioOuter: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: '#CCC',
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterActive: { borderColor: '#DC143C' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#DC143C' },
  radioLabel: { color: '#333', fontSize: 14, fontWeight: '500' },

  autoFillNote: { color: '#999', fontSize: 12, marginBottom: 8 },
  infoInput: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12,
    color: '#333', fontSize: 14, marginBottom: 16,
  },

  signBtn: {
    backgroundColor: '#DC143C', borderRadius: 12,
    paddingVertical: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: '#DC143C', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10,
  },
  signIcon: { color: 'white', fontSize: 18 },
  signTxt:  { color: 'white', fontWeight: '900', fontSize: 16 },

  successPreview: { backgroundColor: 'white', borderRadius: 16, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6,
  },
  successTitle: { color: '#111', fontWeight: '800', fontSize: 16, marginBottom: 16, textAlign: 'center' },
  successBox:   { alignItems: 'center', gap: 12, paddingVertical: 16 },
  checkCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#DCFCE7', borderWidth: 3, borderColor: '#22C55E',
    alignItems: 'center', justifyContent: 'center',
  },
  successMsg: { color: '#555', fontSize: 13, textAlign: 'center', lineHeight: 20 },

  panicFab: {
    position: 'absolute', bottom: 32, right: 16,
    backgroundColor: '#DC143C', borderRadius: 16,
    paddingHorizontal: 14, paddingVertical: 10,
    shadowColor: '#DC143C', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 10,
  },
  panicInner: { alignItems: 'center', gap: 4 },
  panicTxt:   { color: 'white', fontWeight: '900', fontSize: 11, textAlign: 'center' },
});
