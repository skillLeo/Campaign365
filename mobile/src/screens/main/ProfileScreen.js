import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Switch, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../store/authStore';

const RED  = '#DC143C';
const GOLD = '#D4A017';

export default function ProfileScreen({ navigation }) {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailAlert, setEmailAlert] = useState(true);
  const { user, tenant } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* SKNLP corner ribbon */}
      <View style={styles.ribbon}>
        <Text style={styles.ribbonTxt}>SKNLP</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          {/* Top bar */}
          <View style={styles.topBar}>
            <View style={styles.userRow}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarTxt}>
                  {(user?.name || 'SJ').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </Text>
                <View style={styles.onlineDot} />
              </View>
              <Text style={styles.userName}>
                {user?.name || 'Sarah James'} — {user?.roles?.[0]?.name?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Canvasser'}
              </Text>
            </View>
            <TouchableOpacity style={styles.settingsBtn}>
              <Text style={{ fontSize: 20 }}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* SKNLP banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerSKNLP}>SKNLP</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editTxt}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Dots */}
        <View style={styles.dotsRow}>
          {[0,1,2,3].map(i => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.sections}>

          {/* Account Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <TouchableOpacity style={styles.settingRow}>
              <Text style={styles.settingLabel}>Change Password</Text>
            </TouchableOpacity>
            <Text style={styles.settingDesc}>Alerts to your devices when you're ready to canvassing, resync.</Text>
            <TouchableOpacity style={styles.settingRowBorder}>
              <Text style={styles.settingLabel}>Privacy Policy</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Notification Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notification Preferences</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Push Notifications</Text>
              <Switch
                value={pushNotif}
                onValueChange={setPushNotif}
                trackColor={{ false: '#334155', true: '#22C55E' }}
                thumbColor="white"
              />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Email Alerts</Text>
              <Switch
                value={emailAlert}
                onValueChange={setEmailAlert}
                trackColor={{ false: '#334155', true: RED }}
                thumbColor="white"
              />
            </View>
          </View>

          {/* Offline Sync */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Offline Sync Status</Text>
            <Text style={styles.syncStatus}>Last Sync: Today, 2:15 PM</Text>
          </View>

          {/* Panic Button Test */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Panic Button Test</Text>
            <TouchableOpacity
              style={styles.panicBtn}
              onPress={() => navigation.navigate('Panic')}
            >
              <Text style={styles.panicBtnTxt}>Test Panic Button</Text>
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => navigation.navigate('Logout')}
          >
            <Text style={styles.logoutTxt}>Log Out</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      {/* Bottom tabs */}
      <SafeAreaView style={{ backgroundColor: '#0F172A' }}>
        <View style={styles.tabBar}>
          {[
            { icon: '🏠', label: 'Home'    },
            { icon: '🗺️', label: 'Map'     },
            { icon: '📋', label: 'Tasks'   },
            { icon: '📊', label: 'Reports' },
            { icon: '👤', label: 'Profile', active: true },
          ].map((t, i) => (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => {
                if (t.label === 'Home') {
                  navigation.navigate('Main');
                }
              }}
            >
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
  ribbon: {
    position: 'absolute', top: 0, left: 0, zIndex: 10,
    backgroundColor: RED, paddingHorizontal: 14, paddingVertical: 4,
    borderBottomRightRadius: 10,
  },
  ribbonTxt: { color: 'white', fontWeight: '900', fontSize: 11, letterSpacing: 1 },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  userRow:    { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#7B4F2E', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  avatarTxt:  { color: 'white', fontWeight: '900', fontSize: 14 },
  onlineDot:  {
    position: 'absolute', bottom: 0, right: 0,
    width: 10, height: 10, borderRadius: 5, backgroundColor: RED,
    borderWidth: 2, borderColor: '#080E1C',
  },
  userName:    { color: 'white', fontWeight: '700', fontSize: 14 },
  settingsBtn: { padding: 4 },
  banner: {
    marginHorizontal: 20, height: 100, borderRadius: 14,
    backgroundColor: RED, overflow: 'hidden',
    position: 'relative', marginBottom: 10,
  },
  bannerContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bannerSKNLP:   { color: 'white', fontWeight: '900', fontSize: 36, letterSpacing: 4 },
  editBtn: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 8,
    paddingHorizontal: 14, paddingVertical: 6,
  },
  editTxt: { color: '#111', fontWeight: '700', fontSize: 12 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 20 },
  dot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotActive: { backgroundColor: 'white', width: 16 },
  sections:    { paddingHorizontal: 20, gap: 6 },
  section: {
    backgroundColor: '#111827', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', marginBottom: 10,
  },
  sectionTitle: { color: 'white', fontWeight: '800', fontSize: 16, marginBottom: 12 },
  settingRow: {
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 11, marginBottom: 8,
  },
  settingLabel: { color: 'white', fontWeight: '600', fontSize: 14 },
  settingDesc:  { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 10, lineHeight: 18 },
  settingRowBorder: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
  },
  chevron:    { color: 'rgba(255,255,255,0.3)', fontSize: 18 },
  toggleRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  toggleLabel: { color: 'white', fontSize: 14, fontWeight: '600' },
  syncStatus:  { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  panicBtn: {
    backgroundColor: RED, borderRadius: 12, paddingVertical: 15, alignItems: 'center',
    shadowColor: RED, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10,
  },
  panicBtnTxt: { color: 'white', fontWeight: '900', fontSize: 15 },
  logoutBtn: {
    paddingVertical: 14, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12,
  },
  logoutTxt: { color: 'rgba(255,255,255,0.5)', fontWeight: '700', fontSize: 14 },
  tabBar:       { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 8 },
  tabItem:      { flex: 1, alignItems: 'center', gap: 3 },
  tabLabel:     { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '600' },
  tabLabelActive: { color: RED },
});
