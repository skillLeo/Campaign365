import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const RED  = '#DC143C';
const GOLD = '#B8860B';

const ITEMS = ['Flyers', 'Palm Cards', 'T-Shirts', 'Banners', 'Stickers', 'Other'];

export default function CampaignMaterialsScreen({ navigation }) {
  const [selected, setSelected] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [turf,     setTurf]     = useState('');
  const [date,     setDate]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggle = item =>
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );

  const handleSubmit = () => setSubmitted(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: '#0F172A' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <View style={styles.logoRow}>
            <View style={styles.logoCircle}><Text style={styles.logoTxt}>365</Text></View>
            <View>
              <Text style={styles.logoSKNLP}>SKNLP</Text>
              <Text style={styles.logoCamp}>Campaign 365</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Request Campaign{'\n'}Materials</Text>

        {/* Item pills */}
        <Text style={styles.label}>Item</Text>
        <View style={styles.pillGrid}>
          {ITEMS.map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.pill, selected.includes(item) && styles.pillActive]}
              onPress={() => toggle(item)}
            >
              <Text style={[styles.pillTxt, selected.includes(item) && styles.pillTxtActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity */}
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          placeholderTextColor="rgba(0,0,0,0.4)"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        {/* Turf Location */}
        <Text style={styles.label}>Turf Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Turf Location"
          placeholderTextColor="rgba(0,0,0,0.4)"
          value={turf}
          onChangeText={setTurf}
        />

        {/* Delivery Date */}
        <View style={styles.dateRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Delivery Date"
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={date}
            onChangeText={setDate}
          />
          <TouchableOpacity style={styles.calendarBtn}>
            <Text style={{ fontSize: 20 }}>📅</Text>
          </TouchableOpacity>
        </View>

        {/* Upload button */}
        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadTxt}>Upload Photo of Current Stock</Text>
        </TouchableOpacity>

        {/* Submit button */}
        <TouchableOpacity
          style={[styles.submitBtn, submitted && { backgroundColor: '#22C55E' }]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitTxt}>
            {submitted ? '✓ Request Submitted!' : 'Submit Request to Cluster Manager'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Status footer */}
      <View style={styles.footer}>
        <Text style={styles.footerBold}>
          Request Status: {submitted ? '✓ Submitted' : 'Pending Approval'}
        </Text>
        <Text style={styles.footerSub}>Last Updated: Today, 10:30 AM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn:    { width: 32, alignItems: 'center' },
  backArrow:  { color: 'white', fontSize: 28, fontWeight: '300' },
  logoRow:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoCircle: { width: 32, height: 32, borderRadius: 8, backgroundColor: RED, alignItems: 'center', justifyContent: 'center' },
  logoTxt:    { color: 'white', fontWeight: '900', fontSize: 10 },
  logoSKNLP:  { color: 'white', fontWeight: '900', fontSize: 13 },
  logoCamp:   { color: 'rgba(255,255,255,0.6)', fontSize: 9 },
  scroll: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 30, fontWeight: '900', color: '#111',
    marginBottom: 24, lineHeight: 36, letterSpacing: -0.5,
  },
  label: { color: '#111', fontWeight: '700', fontSize: 15, marginBottom: 10 },
  pillGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  pill: {
    paddingHorizontal: 20, paddingVertical: 11,
    backgroundColor: 'white', borderRadius: 30,
    borderWidth: 1.5, borderColor: '#ddd',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 4,
  },
  pillActive:    { backgroundColor: '#111', borderColor: '#111' },
  pillTxt:       { color: '#111', fontWeight: '600', fontSize: 14 },
  pillTxtActive: { color: 'white' },
  input: {
    backgroundColor: 'white', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 15,
    fontSize: 15, color: '#111', marginBottom: 14,
    borderWidth: 1, borderColor: '#e5e7eb',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3,
  },
  dateRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'white', borderRadius: 12,
    paddingRight: 12, marginBottom: 20,
    borderWidth: 1, borderColor: '#e5e7eb',
  },
  calendarBtn: { padding: 4 },
  uploadBtn: {
    backgroundColor: GOLD, borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginBottom: 14,
    shadowColor: GOLD, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8,
  },
  uploadTxt: { color: 'white', fontWeight: '800', fontSize: 15 },
  submitBtn: {
    backgroundColor: RED, borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10,
  },
  submitTxt: { color: 'white', fontWeight: '900', fontSize: 15 },
  footer: {
    backgroundColor: '#111', paddingVertical: 16,
    alignItems: 'center', gap: 3,
  },
  footerBold: { color: 'white', fontWeight: '800', fontSize: 14 },
  footerSub:  { color: 'rgba(255,255,255,0.55)', fontSize: 12 },
});
