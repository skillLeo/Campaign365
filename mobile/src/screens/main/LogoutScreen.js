import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, Dimensions, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, G, Circle } from 'react-native-svg';
import { useAuth } from '../../store/authStore';

const { width, height } = Dimensions.get('window');
const RED = '#DC143C';

function SKNLPLogo({ size = 80 }) {
  return (
    <Svg width={size} height={size * 0.7} viewBox="0 0 120 84">
      {/* Arrow/bolt icon */}
      <Path d="M60,4 L85,38 L70,38 L85,80 L35,36 L52,36 Z"
        fill={RED} />
      <Path d="M62,4 L87,38 L72,38 L87,80 L37,36 L54,36 Z"
        fill="white" opacity={0.15} />
    </Svg>
  );
}

export default function LogoutScreen({ navigation }) {
  const { logout } = useAuth();
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.replace('SyncComplete');
  };

  const handleCancel = () => navigation.goBack();

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Dark background with SKNLP logo */}
      <Animated.View style={[s.topArea, { opacity: fadeAnim }]}>
        <SKNLPLogo size={100} />
        <Text style={s.logoTxt}>SKNLP</Text>
      </Animated.View>

      {/* Slide-up sheet */}
      <Animated.View style={[s.sheet, { transform: [{ translateY: slideAnim }] }]}>
        {/* Title */}
        <Text style={s.title}>Ready to Log Out?</Text>
        <View style={s.titleLine} />

        <Text style={s.subtitle}>
          Today's work saved locally • 87 voters contacted
        </Text>

        {/* Log Out button */}
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={s.logoutTxt}>Log Out &amp; Sync Data</Text>
        </TouchableOpacity>

        {/* Cancel button */}
        <TouchableOpacity style={s.cancelBtn} onPress={handleCancel} activeOpacity={0.85}>
          <Text style={s.cancelTxt}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Red Wave banner at very bottom */}
      <View style={s.waveBanner}>
        <View style={s.waveBannerInner}>
          <Text style={s.waveEmoji}>🏴</Text>
          <Text style={s.waveTxt}>Thank you for powering the Red Wave!</Text>
        </View>
        <View style={s.crowdRow}>
          {['🌴','👐','🇰🇳','👐','🌴'].map((e, i) => (
            <Text key={i} style={{ fontSize: i === 2 ? 26 : 20 }}>{e}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },

  topArea: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  logoTxt: {
    color: 'white', fontSize: 38, fontWeight: '900', letterSpacing: 4,
  },

  sheet: {
    backgroundColor: '#111', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: 28, paddingTop: 32, paddingBottom: 24,
    borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  title: {
    color: 'white', fontSize: 28, fontWeight: '900', letterSpacing: -0.5,
    textAlign: 'center', marginBottom: 10,
  },
  titleLine: {
    height: 3, width: 50, backgroundColor: RED, borderRadius: 2,
    alignSelf: 'center', marginBottom: 14,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.55)', fontSize: 14, textAlign: 'center',
    lineHeight: 20, marginBottom: 28,
  },
  logoutBtn: {
    backgroundColor: RED, borderRadius: 14, paddingVertical: 18,
    alignItems: 'center', marginBottom: 12,
    shadowColor: RED, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.45, shadowRadius: 14,
  },
  logoutTxt: { color: 'white', fontWeight: '900', fontSize: 17 },
  cancelBtn: {
    backgroundColor: 'white', borderRadius: 14, paddingVertical: 18, alignItems: 'center',
  },
  cancelTxt: { color: '#111', fontWeight: '800', fontSize: 17 },

  waveBanner: {
    backgroundColor: '#1a0505',
    borderTopWidth: 1, borderColor: 'rgba(220,20,60,0.3)',
    paddingVertical: 18, paddingHorizontal: 20, alignItems: 'center', gap: 10,
  },
  waveBannerInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  waveEmoji: { fontSize: 22 },
  waveTxt: { color: 'white', fontWeight: '800', fontSize: 15 },
  crowdRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
});
