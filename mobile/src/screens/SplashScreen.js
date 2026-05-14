import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar, Image } from 'react-native';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TYPE } from '../theme/typography';

const { width } = Dimensions.get('window');
const NAVY = '#001F3F';
const GOLD = '#C9A227';

function BallotIcon() {
  return (
    <Svg width={225} height={202} viewBox="0 0 122 110">
      <Path
        d="M61,0 C50.5,0 42,8.5 42,19 C42,32.5 61,52 61,52 C61,52 80,32.5 80,19 C80,8.5 71.5,0 61,0 Z"
        fill={GOLD}
      />
      <Circle cx={61} cy={19} r={8} fill={NAVY} />
      <Rect x={5} y={57} width={112} height={48} rx={7} fill={GOLD} />
      <Rect x={30} y={52} width={62} height={9} rx={4.5} fill={NAVY} />
      <Rect x={5} y={77} width={112} height={5} rx={2.5} fill="rgba(0,0,0,0.18)" />
    </Svg>
  );
}

function Spinner({ anim }) {
  const rotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Svg width={50} height={50} viewBox="0 0 40 40">
        <Circle cx={20} cy={20} r={15} fill="none" stroke="rgba(201,162,39,0.25)" strokeWidth={2.4} />
        <Path d="M20,5 A15,15 0 1,1 5,20" fill="none" stroke={GOLD} strokeWidth={2.4} strokeLinecap="round" />
      </Svg>
    </Animated.View>
  );
}

export default function SplashScreen({ navigation }) {
  const fade  = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;
  const spin  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6,   useNativeDriver: true }),
    ]).start();
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 1100, useNativeDriver: true })
    ).start();
    const t = setTimeout(async () => {
      const token = await AsyncStorage.getItem('c365_token');
      navigation.replace(token ? 'Main' : 'Login');
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />
      <Animated.View style={[s.center, { opacity: fade, transform: [{ scale }] }]}>
        <Image source={require('../../assets/logo.jpg')} style={s.logo} resizeMode="contain" />
        <Text style={s.campaign}>Campaign</Text>
        <Text style={s.n365}>365</Text>
        <Text style={s.sub}>Empowering Westminster Campaigns</Text>
      </Animated.View>
      <View style={s.spinWrap}><Spinner anim={spin} /></View>
      <Text style={s.ver}>Version 1.0</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 4,
  },
  campaign: {
    ...TYPE.heading,
    color: '#FFFFFF',
    fontSize: 60,
    lineHeight: 68,
    marginTop: 20,
  },
  n365: {
    ...TYPE.heading,
    color: GOLD,
    fontSize: 60,
    lineHeight: 68,
    marginTop: 2,
  },
  sub: {
    ...TYPE.subtitle,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    marginTop: 16,
    letterSpacing: 0.2,
    paddingHorizontal: 32,
  },
  spinWrap: {
    position: 'absolute',
    bottom: 88,
  },
  ver: {
    position: 'absolute',
    bottom: 40,
    color: 'rgba(255,255,255,0.40)',
    fontSize: 16,
  },
});
