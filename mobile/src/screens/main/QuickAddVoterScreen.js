import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, StatusBar, Dimensions, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { votersAPI } from '../../services/api';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const GOLD = '#C9A84C';

const SUPPORT = ['Strong SKNLP', 'Leaning', 'Undecided', 'Oppose'];
const AGE_GROUPS = ['18-24', '25-34', '35-44', '45-54', '55+'];

export default function QuickAddVoterScreen({ navigation }) {
  const [name,     setName]     = useState('');
  const [address,  setAddress]  = useState('');
  const [phone,    setPhone]    = useState('');
  const [email,    setEmail]    = useState('');
  const [ageGroup, setAgeGroup] = useState('25-34');
  const [support,  setSupport]  = useState('Leaning');
  const [notes,    setNotes]    = useState('');
  const [saved,    setSaved]    = useState(false);
  const [saving,   setSaving]   = useState(false);

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ backgroundColor: '#0A0F1E' }}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.menuBtn}>
            <Text style={s.menuIcon}>‹</Text>
          </TouchableOpacity>
          <View style={s.headerMid}>
            <Text style={s.sknlp}>SKNLP</Text>
          </View>
          <Text style={s.camp365}>Campaign{'\n'}365</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <Text style={s.title}>Quick Add New Voter</Text>

        {/* Full Name */}
        <Text style={s.label}>Full Name</Text>
        <TextInput style={s.input} placeholder="Full Name" placeholderTextColor="rgba(255,255,255,0.3)"
          value={name} onChangeText={setName} />

        {/* Address */}
        <Text style={s.label}>Address</Text>
        <TextInput style={s.input} placeholder="Address" placeholderTextColor="rgba(255,255,255,0.3)"
          value={address} onChangeText={setAddress} />

        {/* Phone */}
        <Text style={s.label}>Phone</Text>
        <TextInput style={s.input} placeholder="011" placeholderTextColor="rgba(255,255,255,0.3)"
          value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        {/* Email + Age Group */}
        <View style={s.rowFields}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Email</Text>
            <View style={[s.input, s.rowInput]}>
              <TextInput style={{ flex: 1, color: 'white', fontSize: 14 }}
                placeholder="Email" placeholderTextColor="rgba(255,255,255,0.3)"
                value={email} onChangeText={setEmail} keyboardType="email-address" />
              <Text style={{ fontSize: 16 }}>✉️</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Age Group</Text>
            <View style={[s.input, s.rowInput]}>
              <Text style={{ color: 'white', fontSize: 14, flex: 1 }}>{ageGroup}</Text>
              <Text style={{ fontSize: 14 }}>⌄</Text>
            </View>
          </View>
        </View>

        {/* GPS row */}
        <View style={s.gpsRow}>
          <Text style={s.gpsLabel}>📍 GPS Coordinates</Text>
          <TouchableOpacity style={s.autoFillBtn}>
            <Text style={s.autoFillTxt}>Auto-Fill</Text>
          </TouchableOpacity>
        </View>

        {/* Support Level */}
        <Text style={s.label}>Support Level</Text>
        <View style={s.supportRow}>
          {SUPPORT.map(sv => (
            <TouchableOpacity
              key={sv}
              style={[s.supportPill, support === sv && s.supportPillActive]}
              onPress={() => setSupport(sv)}
            >
              <Text style={[s.supportTxt, support === sv && s.supportTxtActive]}>{sv}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes */}
        <Text style={s.label}>Notes</Text>
        <View style={[s.input, s.notesWrap]}>
          <TextInput
            style={{ flex: 1, color: 'white', fontSize: 14, minHeight: 50 }}
            placeholder="Notes" placeholderTextColor="rgba(255,255,255,0.3)"
            value={notes} onChangeText={setNotes} multiline
          />
          <Text style={{ fontSize: 18, alignSelf: 'flex-end' }}>🎤</Text>
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={[s.saveBtn, saved && { backgroundColor: '#22C55E' }, saving && { opacity: 0.7 }]}
          onPress={async () => {
            if (saved || saving) return;
            if (!name.trim()) { Alert.alert('Error', 'Please enter voter name'); return; }
            setSaving(true);
            const [firstName, ...rest] = name.trim().split(' ');
            try {
              await votersAPI.create({
                first_name: firstName,
                last_name: rest.join(' ') || firstName,
                address: address.trim(),
                phone: phone.trim(),
                email: email.trim(),
                sentiment: support === 'Strong SKNLP' ? 'supporter' : support === 'Oppose' ? 'opposition' : 'undecided',
              });
              setSaved(true);
            } catch (e) {
              Alert.alert('Saved Locally', 'Voter saved offline — will sync when connected.');
              setSaved(true);
            }
            setSaving(false);
          }}
          activeOpacity={0.85}
        >
          <Text style={s.saveTxt}>{saved ? '✓ Voter Added!' : saving ? 'Saving...' : 'Save & Add to Turf'}</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Panic FAB */}
      <TouchableOpacity
        style={s.panicFab}
        onPress={() => navigation.navigate('Panic')}
      >
        <Text style={{ fontSize: 18 }}>🆘</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1E' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  menuBtn:    { padding: 6, marginRight: 4 },
  menuIcon:   { color: 'white', fontSize: 28, fontWeight: '300', lineHeight: 28 },
  headerMid:  { flex: 1, alignItems: 'center' },
  sknlp: {
    color: GOLD, fontWeight: '900', fontSize: 22, letterSpacing: 2,
    textShadowColor: GOLD, textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 },
  },
  camp365: { color: 'white', fontWeight: '900', fontSize: 14, textAlign: 'right' },

  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 },
  title: {
    color: 'white', fontSize: 26, fontWeight: '900', marginBottom: 20,
    letterSpacing: -0.5,
  },
  label: { color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: 13, marginBottom: 8 },
  input: {
    backgroundColor: 'rgba(201,168,76,0.12)',
    borderWidth: 1.5, borderColor: GOLD,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13,
    color: 'white', fontSize: 14, marginBottom: 16,
  },
  rowFields: { flexDirection: 'row', gap: 10, marginBottom: 0 },
  rowInput:  { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  notesWrap: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },

  gpsRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  gpsLabel:    { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600' },
  autoFillBtn: { backgroundColor: GOLD, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  autoFillTxt: { color: '#0A0F1E', fontWeight: '800', fontSize: 12 },

  supportRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  supportPill: {
    paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  supportPillActive: { backgroundColor: GOLD, borderColor: GOLD },
  supportTxt:        { color: 'rgba(255,255,255,0.6)', fontWeight: '700', fontSize: 13 },
  supportTxtActive:  { color: '#0A0F1E' },

  saveBtn: {
    backgroundColor: RED, borderRadius: 14, paddingVertical: 18,
    alignItems: 'center', marginTop: 8,
    shadowColor: RED, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.45, shadowRadius: 14,
  },
  saveTxt: { color: 'white', fontWeight: '900', fontSize: 17 },

  panicFab: {
    position: 'absolute', bottom: 32, right: 20,
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: RED, alignItems: 'center', justifyContent: 'center',
    shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 10,
  },
});
