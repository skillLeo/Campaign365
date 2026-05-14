import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Switch, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle, G } from 'react-native-svg';

const NAVY     = '#001F3F';
const GOLD     = '#C9A227';
const WHITE    = '#FFFFFF';
const LIGHT_BG = '#F4F5F7';
const RED      = '#EF4444';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function BackArrow({ size = 24, color = GOLD }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M20,11H7.83L13.42,5.41L12,4L4,12L12,20L13.41,18.59L7.83,13H20V11Z" fill={color} />
    </Svg>
  );
}

function ChevronRight({ size = 20, color = '#bbb' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M10,6L8.59,7.41L13.17,12L8.59,16.59L10,18L16,12L10,6Z" fill={color} />
    </Svg>
  );
}

function PersonRedIcon({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="7" r="5" fill="#EF4444" />
      <Path d="M4,21 C4,16.58 7.58,13 12,13 C16.42,13 20,16.58 20,21Z" fill="#EF4444" />
    </Svg>
  );
}

function PersonGrayIcon({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="7" r="5" fill="#9CA3AF" />
      <Path d="M4,21 C4,16.58 7.58,13 12,13 C16.42,13 20,16.58 20,21Z" fill="#9CA3AF" />
    </Svg>
  );
}

function PersonGreenIcon({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="7" r="5" fill="#22C55E" />
      <Path d="M4,21 C4,16.58 7.58,13 12,13 C16.42,13 20,16.58 20,21Z" fill="#22C55E" />
    </Svg>
  );
}

// ─── Row components ───────────────────────────────────────────────────────────

function ToggleRow({ label, subtitle, value, onValueChange }) {
  return (
    <View style={st.row}>
      <View style={{ flex: 1 }}>
        <Text style={st.rowLabel}>{label}</Text>
        {subtitle ? <Text style={st.rowSub}>{subtitle}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: GOLD }}
        thumbColor={WHITE}
        ios_backgroundColor="#D1D5DB"
      />
    </View>
  );
}

function ChipRow({ label, chipText }) {
  return (
    <View style={st.row}>
      <Text style={st.rowLabel}>{label}</Text>
      <View style={st.tChip}>
        <Text style={st.tChipText}>{chipText}</Text>
      </View>
    </View>
  );
}

function ButtonRow({ label, buttonLabel, onPress }) {
  return (
    <View style={st.row}>
      <Text style={st.rowLabel}>{label}</Text>
      <TouchableOpacity style={st.inlineBtn} onPress={onPress} activeOpacity={0.8}>
        <Text style={st.inlineBtnText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

function LanguageRow() {
  return (
    <View style={st.row}>
      <View style={{ flex: 1 }}>
        <Text style={st.rowLabel}>Language</Text>
        <Text style={st.rowSub}>English / Jamaican Patois</Text>
      </View>
      <View style={st.langIcons}>
        <PersonRedIcon   size={20} />
        <PersonGrayIcon  size={20} />
        <PersonGreenIcon size={20} />
      </View>
      <ChevronRight size={18} color="#bbb" />
    </View>
  );
}

// ─── SettingsScreen ───────────────────────────────────────────────────────────

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [offlineMode,   setOfflineMode]   = useState(true);
  const [darkMode,      setDarkMode]      = useState(true);

  return (
    <View style={st.root}>
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_BG} />

      {/* Navy header */}
      <SafeAreaView style={{ backgroundColor: WHITE }} edges={['top']}>
        <View style={st.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={st.headerBtn}>
            <BackArrow size={24} color={GOLD} />
          </TouchableOpacity>
          <Text style={st.headerTitle}>Settings</Text>
          <View style={st.headerBtn} />
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={st.scroll}>

        {/* Notifications */}
        <View style={st.card}>
          <ToggleRow
            label="Notifications"
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        {/* Offline Mode */}
        <View style={st.card}>
          <ToggleRow
            label="Offline Mode"
            subtitle="Last synced 3 mins ago"
            value={offlineMode}
            onValueChange={setOfflineMode}
          />
        </View>

        {/* Data & Sync */}
        <View style={st.card}>
          <ButtonRow
            label="Data & Sync"
            buttonLabel="Force Sync Now"
            onPress={() => {}}
          />
        </View>

        {/* Language */}
        <View style={st.card}>
          <LanguageRow />
        </View>

        {/* Dark Mode */}
        <View style={st.card}>
          <ToggleRow
            label="Dark Mode"
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        {/* Privacy & Consent */}
        <View style={st.card}>
          <ChipRow label="Privacy & Consent" chipText="T" />
        </View>

        {/* Panic Button Test */}
        <View style={st.card}>
          <ChipRow label="Panic Button Test" chipText="T" />
        </View>

        {/* Logout */}
        <View style={st.card}>
          <TouchableOpacity
            style={st.row}
            onPress={() => navigation.navigate('Logout')}
            activeOpacity={0.7}
          >
            <Text style={st.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  root:   { flex: 1, backgroundColor: LIGHT_BG },
  scroll: { paddingHorizontal: 20, paddingTop: 16 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerBtn:   { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: {
    flex: 1, color: NAVY, fontWeight: '900', fontSize: 25, textAlign: 'center',
  },

  // Card wrapper
  card: {
    backgroundColor: WHITE,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    minHeight: 58,
  },
  rowLabel: { flex: 1, color: NAVY, fontWeight: '700', fontSize: 19 },
  rowSub:   { color: '#888', fontSize: 15, marginTop: 2 },

  // Inline button
  inlineBtn: {
    backgroundColor: GOLD,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  inlineBtnText: { color: NAVY, fontWeight: '800', fontSize: 16 },

  // Language icons
  langIcons: { flexDirection: 'row', gap: 2, marginRight: 6 },

  // Chip (T)
  tChip: {
    width: 30, height: 30,
    borderRadius: 15,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tChipText: { color: NAVY, fontWeight: '900', fontSize: 18 },

  // Logout
  logoutText: { color: RED, fontWeight: '700', fontSize: 19, flex: 1 },
});
