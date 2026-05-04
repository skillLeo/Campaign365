import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E8C97A';

const DAYS   = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
const DATES  = [28, 29, 30, 1, 2, 2, 3];
const TODAY  = 4; // FRI index

const TASKS = [
  { label: 'Today - Finish Basseterre Turf', voters: 5,  accent: true  },
  { label: 'Tomorrow - GOTV Phone Bank 2pm', voters: 15, accent: false },
  { label: 'Cluster Meeting',                voters: 20, accent: false },
  { label: 'Voter Registration Drive',       voters: 30, accent: false },
];

export default function ScheduleScreen({ navigation }) {
  const [selected, setSelected] = useState(TODAY);

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={s.backArrow}>‹</Text>
          </TouchableOpacity>
          <View style={s.headerCenter}>
            <Text style={s.sknlpTxt}>🌴 SKNLP</Text>
          </View>
          <Text style={s.camp365}>Campaign 365</Text>
        </View>

        {/* Title */}
        <View style={s.titleWrap}>
          <Text style={s.title}>My Schedule</Text>
          <View style={s.titleUnderline} />
        </View>

        {/* Week strip */}
        <View style={s.weekStrip}>
          {DAYS.map((day, i) => (
            <TouchableOpacity key={i} style={s.dayCol} onPress={() => setSelected(i)}>
              <Text style={[s.dayLabel, selected === i && s.dayLabelActive]}>{day}</Text>
              <View style={[s.dateBubble, selected === i && s.dateBubbleActive]}>
                <Text style={[s.dateNum, selected === i && s.dateNumActive]}>{DATES[i]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

      {/* Divider */}
      <View style={s.divider} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {TASKS.map((task, i) => (
          <View key={i} style={[s.taskCard, task.accent && s.taskCardAccent]}>
            <View style={s.taskLeft}>
              <Text style={s.taskLabel}>{task.label}</Text>
              <Text style={s.taskVoters}>{task.voters} Voters</Text>
            </View>
            <TouchableOpacity style={[s.startBtn, task.accent && s.startBtnAccent]}>
              <Text style={[s.startTxt, task.accent && s.startTxtAccent]}>Start Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4,
  },
  backBtn:      { padding: 6 },
  backArrow:    { color: 'white', fontSize: 28, fontWeight: '300', lineHeight: 28 },
  headerCenter: { flex: 1, alignItems: 'center' },
  sknlpTxt:     { color: GOLD, fontWeight: '900', fontSize: 18, letterSpacing: 1 },
  camp365:      { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '600' },

  titleWrap: { alignItems: 'center', marginTop: 8, marginBottom: 20 },
  title: {
    color: 'white', fontSize: 34, fontWeight: '900', letterSpacing: -0.5,
  },
  titleUnderline: {
    marginTop: 6, height: 3, width: 60, borderRadius: 2, backgroundColor: GOLD,
  },

  weekStrip: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingHorizontal: 12, marginBottom: 12,
  },
  dayCol:    { alignItems: 'center', gap: 6 },
  dayLabel:  { color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  dayLabelActive: { color: GOLD },
  dateBubble: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  dateBubbleActive: {
    backgroundColor: GOLD,
    shadowColor: GOLD, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 10,
  },
  dateNum:       { color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: '700' },
  dateNumActive: { color: '#0A0A0A', fontWeight: '900' },

  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.07)', marginHorizontal: 20 },
  scroll:  { padding: 20, gap: 12 },

  taskCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#161616', borderRadius: 16,
    padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    gap: 12,
  },
  taskCardAccent: {
    borderColor: GOLD, borderWidth: 1.5,
  },
  taskLeft: { flex: 1 },
  taskLabel: { color: 'white', fontWeight: '700', fontSize: 15, lineHeight: 22, marginBottom: 4 },
  taskVoters: { color: 'rgba(255,255,255,0.45)', fontSize: 13 },

  startBtn: {
    backgroundColor: 'rgba(201,168,76,0.15)',
    borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10,
    borderWidth: 1.5, borderColor: GOLD,
  },
  startBtnAccent: { backgroundColor: GOLD },
  startTxt:       { color: GOLD, fontWeight: '800', fontSize: 13 },
  startTxtAccent: { color: '#0A0A0A' },
});
