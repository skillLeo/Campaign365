import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RED = '#DC143C';
const GREEN = '#22C55E';

const MESSAGES = [
  {
    id: 1, from: 'St. Kitts Nevis Labour', role: 'SKNLP',
    text: 'Turf updates for Zone A — please confirm your door counts by 5 PM today.',
    time: 'Pinned Day 10:30 AM', type: 'received', pinned: true,
  },
  {
    id: 2, from: 'St. Kitts Nevis Labour', role: 'SKNLP',
    text: 'Turf updates — all teams report to Basseterre central by noon.',
    time: 'Pinned Day 10:30 AM', type: 'received', pinned: true,
  },
  {
    id: 3, from: 'me',
    text: 'Turf Zone A update confirmed — 45 doors knocked!',
    time: 'Yesterday, 3:15 PM', type: 'sent',
  },
  {
    id: 4, from: 'Cluster Manager', role: '6, N2',
    avatar: '🗺',
    text: '',
    time: 'Yesterday, 4:35 PM', type: 'header',
  },
  {
    id: 5, from: 'Cluster Manager', role: 'SKNLP',
    text: 'Great work team! Keep it up for the final push.',
    time: 'Yesterday, 4:35 PM', type: 'received',
  },
  {
    id: 6, from: 'Herler Party', role: 'SKNLP',
    text: 'On my way to Sandy Point now.',
    time: 'Yesterday, 4:40 PM', type: 'received', online: true,
  },
];

export default function TeamChatScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const scrollRef = useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: '#111827' }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Team Chat — Basseterre Cluster</Text>
          </View>
          <TouchableOpacity style={styles.moreBtn}>
            <Text style={styles.moreDots}>···</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.msgList}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {MESSAGES.map((msg) => {
            if (msg.type === 'header') {
              return (
                <View key={msg.id} style={styles.clusterHeader}>
                  <View style={styles.clusterAvatar}>
                    <Text style={{ fontSize: 18 }}>{msg.avatar}</Text>
                  </View>
                  <View>
                    <View style={styles.clusterRow}>
                      <Text style={styles.clusterName}>{msg.from}</Text>
                      <View style={styles.clusterBadge}><Text style={styles.clusterBadgeTxt}>{msg.role}</Text></View>
                    </View>
                  </View>
                </View>
              );
            }

            if (msg.type === 'sent') {
              return (
                <View key={msg.id} style={styles.sentWrap}>
                  {msg.time && <Text style={styles.timeLabel}>{msg.time}</Text>}
                  <View style={styles.sentBubble}>
                    <Text style={styles.sentTxt}>{msg.text}</Text>
                    <Text style={styles.sentCheck}>✓</Text>
                  </View>
                </View>
              );
            }

            return (
              <View key={msg.id} style={styles.receivedWrap}>
                {msg.time && <Text style={styles.timeLabel}>{msg.time}</Text>}
                <View style={styles.receivedRow}>
                  <View style={styles.senderAvatar}>
                    <Text style={styles.senderAvatarTxt}>{msg.from[0]}</Text>
                    {msg.online && <View style={styles.onlineDot} />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.senderMeta}>
                      <Text style={styles.senderName}>{msg.from}</Text>
                      {msg.role && <Text style={styles.senderRole}>{msg.role}</Text>}
                    </View>
                    <View style={styles.receivedBubble}>
                      <Text style={styles.receivedTxt}>{msg.text}</Text>
                      {msg.pinned && <Text style={styles.bubbleCheck}>✓</Text>}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Message ···"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.micBtn}>
            <Text style={{ fontSize: 20 }}>🎤</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom tabs */}
        <SafeAreaView style={{ backgroundColor: '#0F172A' }}>
          <View style={styles.tabBar}>
            {[
              { icon: '🎤', label: 'Safety'  },
              { icon: '🗺️', label: 'Canvass' },
              { icon: '💬', label: 'Chat',   active: true },
              { icon: '📊', label: 'Track'   },
              { icon: '⚙️', label: 'Settings' },
            ].map((t, i) => (
              <TouchableOpacity key={i} style={styles.tabItem}>
                <Text style={{ fontSize: 20 }}>{t.icon}</Text>
                <Text style={[styles.tabLabel, t.active && styles.tabLabelActive]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080E1C' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, gap: 8,
  },
  backBtn:      { width: 32, alignItems: 'center' },
  backArrow:    { color: 'white', fontSize: 28, fontWeight: '300' },
  headerCenter: { flex: 1 },
  headerTitle:  { color: 'white', fontWeight: '800', fontSize: 15 },
  moreBtn:      { width: 32, alignItems: 'center' },
  moreDots:     { color: 'white', fontSize: 18, letterSpacing: 2 },
  msgList: { padding: 16, gap: 4 },
  timeLabel: {
    color: 'rgba(255,255,255,0.3)', fontSize: 11,
    textAlign: 'center', marginVertical: 8,
  },
  sentWrap: { alignItems: 'flex-end', marginBottom: 8 },
  sentBubble: {
    backgroundColor: GREEN, borderRadius: 18, borderBottomRightRadius: 4,
    paddingHorizontal: 14, paddingVertical: 10, maxWidth: '75%',
    flexDirection: 'row', alignItems: 'flex-end', gap: 6,
  },
  sentTxt:   { color: 'white', fontSize: 14, flex: 1, lineHeight: 20 },
  sentCheck: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  receivedWrap: { marginBottom: 8 },
  receivedRow:  { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  senderAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  senderAvatarTxt: { color: 'white', fontWeight: '800', fontSize: 14 },
  onlineDot: {
    position: 'absolute', bottom: 0, right: 0,
    width: 10, height: 10, borderRadius: 5, backgroundColor: GREEN,
    borderWidth: 2, borderColor: '#080E1C',
  },
  senderMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  senderName: { color: 'white', fontWeight: '700', fontSize: 13 },
  senderRole: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  receivedBubble: {
    backgroundColor: '#1E293B', borderRadius: 18, borderBottomLeftRadius: 4,
    paddingHorizontal: 14, paddingVertical: 10, maxWidth: '85%',
    flexDirection: 'row', alignItems: 'flex-end', gap: 6,
  },
  receivedTxt:  { color: 'white', fontSize: 14, flex: 1, lineHeight: 20 },
  bubbleCheck:  { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  clusterHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 8 },
  clusterAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#1E3A6A', alignItems: 'center', justifyContent: 'center',
  },
  clusterRow:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  clusterName:   { color: 'white', fontWeight: '700', fontSize: 14 },
  clusterBadge:  { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  clusterBadgeTxt: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  inputBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: '#111827', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)',
  },
  input: {
    flex: 1, backgroundColor: '#1E293B', borderRadius: 24,
    paddingHorizontal: 16, paddingVertical: 10,
    color: 'white', fontSize: 14, maxHeight: 100,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  micBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  tabBar: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 8 },
  tabItem:      { flex: 1, alignItems: 'center', gap: 3 },
  tabLabel:     { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '600' },
  tabLabelActive: { color: RED },
});
