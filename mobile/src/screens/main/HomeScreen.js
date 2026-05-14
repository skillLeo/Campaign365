import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Path, Rect, Circle, G, Line, Polygon,
  Defs, LinearGradient, RadialGradient, Stop, Ellipse,
} from 'react-native-svg';

const { width, height: SHEIGHT } = Dimensions.get('window');
const NAVY   = '#001F3F';
const NAVY2  = '#0A2847';
const GOLD   = '#C9A227';
const GOLD_B = '#C9A84C';
const WHITE  = '#FFFFFF';
const MUTED  = '#A0AEC0';

// ── Diamond outline ───────────────────────────────────────────────────────────
function DiamondIcon() {
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24">
      <Polygon points="12,2 22,12 12,22 2,12"
        fill="none" stroke={GOLD} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

// ── Realistic person avatar (SVG face) ────────────────────────────────────────
function PersonAvatar({ size = 36 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36">
      {/* Circular clip background */}
      <Circle cx={18} cy={18} r={18} fill="#c8a882" />
      {/* Sky/backdrop top */}
      <Rect x={0} y={0} width={36} height={22} rx={0} fill="#87CEEB" opacity={0.5} />
      {/* Shirt/body */}
      <Path d="M4,36 Q4,26 18,24 Q32,26 32,36 Z" fill="#2563EB" />
      {/* Neck */}
      <Rect x={15} y={19} width={6} height={6} rx={2} fill="#c8a882" />
      {/* Head */}
      <Ellipse cx={18} cy={14} rx={8} ry={9} fill="#c8a882" />
      {/* Hair */}
      <Path d="M10,12 Q10,4 18,3 Q26,4 26,12 Q24,7 18,7 Q12,7 10,12 Z" fill="#2d1b00" />
      {/* Eyes */}
      <Ellipse cx={14.5} cy={14} rx={1.8} ry={1.5} fill="#1a0e00" />
      <Ellipse cx={21.5} cy={14} rx={1.8} ry={1.5} fill="#1a0e00" />
      {/* Eye shine */}
      <Circle cx={15.1} cy={13.4} r={0.6} fill="white" opacity={0.7} />
      <Circle cx={22.1} cy={13.4} r={0.6} fill="white" opacity={0.7} />
      {/* Nose */}
      <Path d="M17,15.5 Q18,17.5 19,15.5" stroke="#b08060" strokeWidth={0.8} fill="none" strokeLinecap="round" />
      {/* Smile */}
      <Path d="M14.5,18.5 Q18,21 21.5,18.5" stroke="#a07050" strokeWidth={1} fill="none" strokeLinecap="round" />
      {/* Border */}
      <Circle cx={18} cy={18} r={17.5} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
    </Svg>
  );
}

// ── Walk icon ─────────────────────────────────────────────────────────────────
function WalkIcon({ size = 18, color = NAVY }) {
  return (
    <Svg width={size} height={size * 1.5} viewBox="0 0 14 21">
      <Circle cx={7} cy={2.5} r={2.2} fill={color} />
      <Line x1={7} y1={4.7} x2={7} y2={13}   stroke={color} strokeWidth={2}   strokeLinecap="round" />
      <Line x1={3} y1={7.5} x2={11} y2={9.5} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Line x1={7} y1={13}  x2={4}  y2={20}  stroke={color} strokeWidth={2}   strokeLinecap="round" />
      <Line x1={7} y1={13}  x2={10} y2={19}  stroke={color} strokeWidth={2}   strokeLinecap="round" />
    </Svg>
  );
}

// ── Hamburger ─────────────────────────────────────────────────────────────────
function HamburgerIcon() {
  return (
    <Svg width={23} height={18} viewBox="0 0 18 14">
      <Line x1={0} y1={1}  x2={18} y2={1}  stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
      <Line x1={0} y1={7}  x2={18} y2={7}  stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
      <Line x1={0} y1={13} x2={18} y2={13} stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// ── Bar chart ─────────────────────────────────────────────────────────────────
function BarChart() {
  return (
    <Svg width={43} height={35} viewBox="0 0 34 28">
      <Rect x={1}  y={14} width={9}  height={13} rx={2} fill={GOLD} opacity={0.6} />
      <Rect x={13} y={6}  width={9}  height={21} rx={2} fill={GOLD} />
      <Rect x={25} y={10} width={9}  height={17} rx={2} fill={GOLD} opacity={0.78} />
    </Svg>
  );
}

// ── Colorful street-map thumbnail ─────────────────────────────────────────────
function MapThumb() {
  return (
    <Svg width={78} height={70} viewBox="0 0 62 56">
      {/* Map background — warm light gray */}
      <Rect width={62} height={56} rx={8} fill="#e8e0d5" />
      {/* Green park blocks */}
      <Rect x={4}  y={4}  width={14} height={10} rx={1} fill="#a8d5a2" />
      <Rect x={38} y={30} width={18} height={14} rx={1} fill="#b2d9a8" />
      {/* Water / blue feature */}
      <Path d="M0,36 Q12,30 24,36 Q36,42 62,34 L62,44 Q36,52 24,46 Q12,40 0,46 Z"
        fill="#7ec8e3" opacity={0.75} />
      {/* Roads — orange/tan main roads */}
      <Rect x={0}  y={23} width={62} height={5}  rx={0} fill="#f0c060" opacity={0.9} />
      <Rect x={24} y={0}  width={5}  height={56} rx={0} fill="#f0c060" opacity={0.9} />
      {/* White road center lines */}
      <Line x1={0}  y1={25.5} x2={62} y2={25.5} stroke="white" strokeWidth={1} strokeDasharray="5,4" />
      <Line x1={26.5} y1={0}  x2={26.5} y2={56} stroke="white" strokeWidth={1} strokeDasharray="5,4" />
      {/* Side streets — thin gray */}
      <Line x1={10} y1={0}  x2={10} y2={56} stroke="#ccc" strokeWidth={2} opacity={0.7} />
      <Line x1={46} y1={0}  x2={46} y2={56} stroke="#ccc" strokeWidth={2} opacity={0.7} />
      <Line x1={0}  y1={12} x2={62} y2={12} stroke="#ccc" strokeWidth={2} opacity={0.7} />
      <Line x1={0}  y1={42} x2={62} y2={42} stroke="#ccc" strokeWidth={2} opacity={0.7} />
      {/* Building blocks */}
      <Rect x={4}  y={14} width={5}  height={7}  fill="#d4c8b8" rx={1} />
      <Rect x={12} y={14} width={8}  height={7}  fill="#ccc2b0" rx={1} />
      <Rect x={30} y={4}  width={12} height={7}  fill="#d4c8b8" rx={1} />
      <Rect x={48} y={14} width={10} height={7}  fill="#ccc2b0" rx={1} />
      <Rect x={4}  y={30} width={16} height={10} fill="#d4c8b8" rx={1} />
      <Rect x={30} y={14} width={12} height={7}  fill="#ccc2b0" rx={1} />
      {/* Red location pin */}
      <G transform="translate(20, 3)">
        <Path d="M5,0 C2.24,0 0,2.24 0,5 C0,8.75 5,12 5,12 C5,12 10,8.75 10,5 C10,2.24 7.76,0 5,0Z"
          fill="#e53935" />
        <Circle cx={5} cy={5} r={2} fill="white" />
      </G>
      {/* Border */}
      <Rect width={62} height={56} rx={8} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={1} />
    </Svg>
  );
}

// ── Hero: Bright sunny street + angular map overlay ───────────────────────────
function HeroScene() {
  const W = width - 32;
  const H = 155;

  // Angular irregular polygon for the map (right side only)
  const mapPoints = [
    `${W*0.58},${H*0.04}`,
    `${W*0.70},${H*0.02}`,
    `${W*0.80},${H*0.07}`,
    `${W*0.91},${H*0.05}`,
    `${W*0.98},${H*0.14}`,
    `${W*0.99},${H*0.26}`,
    `${W*0.95},${H*0.35}`,
    `${W*0.99},${H*0.46}`,
    `${W*0.96},${H*0.58}`,
    `${W*0.90},${H*0.65}`,
    `${W*0.82},${H*0.70}`,
    `${W*0.73},${H*0.68}`,
    `${W*0.65},${H*0.72}`,
    `${W*0.57},${H*0.64}`,
    `${W*0.52},${H*0.52}`,
    `${W*0.54},${H*0.40}`,
    `${W*0.50},${H*0.30}`,
    `${W*0.55},${H*0.18}`,
    `${W*0.58},${H*0.10}`,
  ].join(' ');

  const whitePins = [
    { x: W * 0.64, y: H * 0.14 },
    { x: W * 0.80, y: H * 0.22 },
    { x: W * 0.74, y: H * 0.46 },
    { x: W * 0.90, y: H * 0.50 },
  ];

  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <Defs>
        {/* Bright golden-hour sky */}
        <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0"   stopColor="#87CEEB" stopOpacity="1" />
          <Stop offset="0.5" stopColor="#F4A460" stopOpacity="0.7" />
          <Stop offset="1"   stopColor="#D2956A" stopOpacity="1"   />
        </LinearGradient>
        {/* Warm sun glow */}
        <RadialGradient id="sun" cx="38%" cy="38%" r="30%">
          <Stop offset="0"   stopColor="#FFE082" stopOpacity="0.8" />
          <Stop offset="0.6" stopColor="#FFB74D" stopOpacity="0.3" />
          <Stop offset="1"   stopColor="#FFB74D" stopOpacity="0"   />
        </RadialGradient>
        {/* Road */}
        <LinearGradient id="road" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#9E9E9E" stopOpacity="1" />
          <Stop offset="1" stopColor="#757575" stopOpacity="1" />
        </LinearGradient>
        {/* Sidewalk */}
        <LinearGradient id="sidewalk" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#BDBDBD" stopOpacity="1" />
          <Stop offset="1" stopColor="#9E9E9E" stopOpacity="1" />
        </LinearGradient>
      </Defs>

      {/* Sky */}
      <Rect width={W} height={H} fill="url(#sky)" rx={14} />
      {/* Sun glow */}
      <Rect width={W} height={H} fill="url(#sun)" rx={14} />

      {/* Background buildings — light warm tones */}
      <Rect x={0}       y={H*0.10} width={W*0.10} height={H*0.90} fill="#D4B896" opacity={0.9} />
      <Rect x={W*0.02}  y={H*0.04} width={W*0.07} height={H*0.96} fill="#C8A882" opacity={0.85} />
      <Rect x={W*0.09}  y={H*0.18} width={W*0.08} height={H*0.82} fill="#DEC89A" opacity={0.9} />
      <Rect x={W*0.16}  y={H*0.25} width={W*0.06} height={H*0.75} fill="#CDB88A" opacity={0.85} />

      {/* Building windows — golden lit */}
      {[
        [3,H*0.12],[3,H*0.22],[3,H*0.32],[3,H*0.42],[8,H*0.12],[8,H*0.22],[8,H*0.32],
        [W*0.10,H*0.22],[W*0.10,H*0.32],[W*0.10,H*0.42],[W*0.14,H*0.28],[W*0.14,H*0.38],
      ].map(([x,y], i) => (
        <Rect key={i} x={x} y={y} width={4} height={5} rx={0.5}
          fill="#FFE082" opacity={0.65} />
      ))}

      {/* Streetlamp */}
      <Line x1={W*0.245} y1={H*0.18} x2={W*0.245} y2={H}
        stroke="#888" strokeWidth={2} />
      <Path d={`M${W*0.245},${H*0.18} Q${W*0.29},${H*0.12} ${W*0.31},${H*0.17}`}
        stroke="#888" strokeWidth={2} fill="none" />
      <Ellipse cx={W*0.31} cy={H*0.165} rx={4} ry={3} fill="#FFE082" opacity={0.9} />

      {/* Road surface — perspective */}
      <Path d={`M${W*0.14},${H} L${W*0.34},${H*0.46} L${W*0.47},${H*0.46} L${W*0.66},${H} Z`}
        fill="url(#road)" />
      {/* Sidewalk left */}
      <Path d={`M0,${H} L${W*0.14},${H} L${W*0.33},${H*0.46} L${W*0.27},${H*0.46} L${W*0.08},${H} Z`}
        fill="url(#sidewalk)" />
      {/* Road markings */}
      <Line x1={W*0.40} y1={H*0.48} x2={W*0.40} y2={H}
        stroke="white" strokeWidth={1.5} strokeDasharray="10,8" opacity={0.7} />
      {/* Curbs */}
      <Line x1={W*0.14} y1={H} x2={W*0.33} y2={H*0.46}
        stroke="#AAA" strokeWidth={1.5} opacity={0.6} />

      {/* Walking figure — BRIGHT, clearly visible */}
      {/* Shadow on ground */}
      <Ellipse cx={W*0.375} cy={H*0.935} rx={13} ry={3.5}
        fill="rgba(0,0,0,0.22)" />
      {/* Trousers */}
      <Path d={`M${W*0.355},${H*0.68} Q${W*0.33},${H*0.80} ${W*0.315},${H*0.93}`}
        stroke="#4a5568" strokeWidth={7} strokeLinecap="round" fill="none" />
      <Path d={`M${W*0.395},${H*0.68} Q${W*0.42},${H*0.80} ${W*0.435},${H*0.93}`}
        stroke="#4a5568" strokeWidth={7} strokeLinecap="round" fill="none" />
      {/* Jacket / body */}
      <Path d={`M${W*0.325},${H*0.50} Q${W*0.305},${H*0.59} ${W*0.325},${H*0.69}
                L${W*0.425},${H*0.69} Q${W*0.445},${H*0.59} ${W*0.425},${H*0.50} Z`}
        fill="#5B7FA6" />
      {/* Arms */}
      <Path d={`M${W*0.33},${H*0.52} Q${W*0.28},${H*0.59} ${W*0.265},${H*0.67}`}
        stroke="#5B7FA6" strokeWidth={5.5} strokeLinecap="round" fill="none" />
      <Path d={`M${W*0.42},${H*0.53} Q${W*0.47},${H*0.59} ${W*0.485},${H*0.66}`}
        stroke="#5B7FA6" strokeWidth={5.5} strokeLinecap="round" fill="none" />
      {/* Neck */}
      <Rect x={W*0.364} y={H*0.47} width={6.5} height={5} rx={1} fill="#c8a882" />
      {/* Head */}
      <Ellipse cx={W*0.375} cy={H*0.41} rx={8.5} ry={9.5} fill="#c8a882" />
      {/* Hair */}
      <Path d={`M${W*0.29},${H*0.39} Q${W*0.295},${H*0.31} ${W*0.375},${H*0.30}
               Q${W*0.455},${H*0.31} ${W*0.46},${H*0.39} Q${W*0.44},${H*0.345} ${W*0.375},${H*0.34}
               Q${W*0.31},${H*0.345} ${W*0.29},${H*0.39} Z`}
        fill="#2d1b00" />
      {/* Backpack */}
      <Rect x={W*0.358} y={H*0.46} width={10} height={13} rx={3} fill="#2B4E82" />
      <Rect x={W*0.363} y={H*0.49} width={6}  height={8}  rx={2} fill="#3A5F96" />

      {/* ANGULAR MAP OVERLAY — right side, smaller, irregular polygon */}
      <Polygon
        points={mapPoints}
        fill={GOLD_B}
        opacity={0.82}
      />

      {/* Internal grid lines on map */}
      {[H*0.20, H*0.36, H*0.52].map((y, i) => (
        <Line key={`ml${i}`}
          x1={W*0.52} y1={y} x2={W*0.98} y2={y + H*0.01}
          stroke="rgba(255,255,255,0.18)" strokeWidth={0.8} />
      ))}
      {[W*0.67, W*0.80].map((x, i) => (
        <Line key={`mv${i}`}
          x1={x} y1={H*0.03} x2={x} y2={H*0.70}
          stroke="rgba(255,255,255,0.15)" strokeWidth={0.8} />
      ))}

      {/* WHITE location pins on map */}
      {whitePins.map((p, i) => (
        <G key={i} transform={`translate(${p.x - 4.5}, ${p.y - 10})`}>
          <Path d="M4.5,0 C2.0,0 0,2.0 0,4.5 C0,7.9 4.5,12 4.5,12 C4.5,12 9,7.9 9,4.5 C9,2.0 7.0,0 4.5,0Z"
            fill="white" opacity={0.95} />
          <Circle cx={4.5} cy={4.5} r={2} fill={GOLD_B} />
        </G>
      ))}

      {/* Map border */}
      <Polygon points={mapPoints}
        fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={1} />

      {/* Card border */}
      <Rect x={0} y={0} width={W} height={H} rx={14}
        fill="none" stroke="rgba(201,168,76,0.20)" strokeWidth={1} />
    </Svg>
  );
}

// ── FILLED tab icons ──────────────────────────────────────────────────────────
function TabHome({ active }) {
  const c = active ? GOLD : '#4A5568';
  return (
    <Svg width={28} height={25} viewBox="0 0 24 22">
      <Path d="M12,2 L22,11 L22,22 L16,22 L16,15 L8,15 L8,22 L2,22 L2,11 Z"
        fill={c} />
    </Svg>
  );
}
function TabCanvass({ active }) {
  const c = active ? GOLD : '#4A5568';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path d="M12,2 C8.13,2 5,5.13 5,9 C5,14.25 12,22 12,22 C12,22 19,14.25 19,9 C19,5.13 15.87,2 12,2Z"
        fill={c} />
      <Circle cx={12} cy={9} r={3} fill={active ? NAVY : '#E2E8F0'} />
    </Svg>
  );
}
function TabPolls({ active }) {
  const c = active ? GOLD : '#4A5568';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Rect x={3}  y={12} width={5} height={9}  rx={1.5} fill={c} />
      <Rect x={10} y={6}  width={5} height={15} rx={1.5} fill={c} />
      <Rect x={17} y={9}  width={5} height={12} rx={1.5} fill={c} />
    </Svg>
  );
}
function TabMessages({ active }) {
  const c = active ? GOLD : '#4A5568';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path d="M2,4 Q2,2 4,2 L20,2 Q22,2 22,4 L22,16 Q22,18 20,18 L8,18 L4,22 L4,18 Q2,18 2,16 Z"
        fill={c} />
    </Svg>
  );
}
function TabMore({ active }) {
  const c = active ? GOLD : '#4A5568';
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Circle cx={5}  cy={12} r={2} fill={c} />
      <Circle cx={12} cy={12} r={2} fill={c} />
      <Circle cx={19} cy={12} r={2} fill={c} />
    </Svg>
  );
}

// ── HomeScreen ────────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const TABS = [
    { name: 'Home',     Icon: TabHome,     route: null },
    { name: 'Canvass',  Icon: TabCanvass,  route: 'Canvass' },
    { name: 'Polls',    Icon: TabPolls,    route: 'Polls' },
    { name: 'Messages', Icon: TabMessages, route: 'Team' },
    { name: 'More',     Icon: TabMore,     route: 'Profile' },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: NAVY }} edges={['top']}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <DiamondIcon />
            <Text style={s.headerTitle}>Campaign 365</Text>
          </View>
          <View style={s.headerRight}>
            <View style={s.userBlock}>
              <Text style={s.userName}>Alex</Text>
              <View style={s.canvBadge}><Text style={s.canvTxt}>Canvasser</Text></View>
            </View>
            <PersonAvatar size={45} />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={s.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollInner}
      >
        {/* Greeting */}
        <Text style={s.greetMain}>Good morning, Alex!</Text>
        <Text style={s.greetSub}>Ready to hit the streets?</Text>

        {/* Hero */}
        <View style={s.heroWrap}>
          <HeroScene />
        </View>

        {/* Start Canvassing */}
        <TouchableOpacity
          style={s.canvasBtn}
          onPress={() => navigation.navigate('MyAssignments')}
          activeOpacity={0.82}
        >
          <WalkIcon size={14} color={NAVY} />
          <Text style={s.canvasBtnTxt}>START CANVASSING NOW</Text>
        </TouchableOpacity>

        {/* Cards row */}
        <View style={s.cardsRow}>
          <TouchableOpacity
            style={s.turfCard}
            onPress={() => navigation.navigate('MyAssignments')}
            activeOpacity={0.82}
          >
            <View style={s.turfTop}>
              <Text style={s.turfTitle}>My Assigned Turfs</Text>
              <Text style={s.arrow}>›</Text>
            </View>
            <View style={s.turfBody}>
              <MapThumb />
              <View style={s.taskList}>
                {["Today's Tasks", "Today's Tasks"].map((t, i) => (
                  <View key={i} style={s.taskRow}>
                    <View style={s.checkBox}><Text style={s.checkTxt}>✓</Text></View>
                    <Text style={s.taskTxt}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={s.myCard} activeOpacity={0.82}>
            <BarChart />
            <View style={s.myBottom}>
              <Text style={s.myTxt}>My</Text>
              <Text style={s.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Poll row */}
        <TouchableOpacity
          style={s.pollRow}
          onPress={() => navigation.navigate('Polls')}
          activeOpacity={0.82}
        >
          <HamburgerIcon />
          <Text style={s.pollTxt}>Take Quick Poll</Text>
          <Text style={[s.arrow, { color: MUTED }]}>›</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* SOS FAB */}
      <TouchableOpacity
        style={s.fab}
        onPress={() => navigation.navigate('Panic')}
        activeOpacity={0.85}
      >
        <Text style={s.fabTxt}>SOS</Text>
      </TouchableOpacity>

      {/* Bottom tab bar */}
      <SafeAreaView style={s.tabBar} edges={['bottom']}>
        {TABS.map(({ name, Icon, route }) => {
          const active = name === 'Home';
          return (
            <TouchableOpacity
              key={name}
              style={s.tabItem}
              onPress={() => route && navigation.navigate(route)}
              activeOpacity={0.7}
            >
              <Icon active={active} />
              <Text style={[s.tabLbl, active && s.tabLblActive]}>{name}</Text>
              {active && <View style={s.tabDot} />}
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root:        { flex: 1, backgroundColor: NAVY },
  scroll:      { flex: 1 },
  scrollInner: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 },

  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  headerLeft:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { color: WHITE, fontSize: 25, fontWeight: '600' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  userBlock:   { alignItems: 'flex-end' },
  userName:    { color: WHITE, fontSize: 16, fontWeight: '600' },
  canvBadge:   { backgroundColor: 'rgba(201,168,76,0.14)', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2, marginTop: 2, borderWidth: 1, borderColor: 'rgba(201,168,76,0.28)' },
  canvTxt:     { color: GOLD, fontSize: 13, fontWeight: '400' },

  greetMain: { color: WHITE, fontSize: 33, fontWeight: '800', lineHeight: 40, letterSpacing: 0, marginTop: 6, marginBottom: 3 },
  greetSub:  { color: MUTED, fontSize: 18, fontWeight: '400', lineHeight: 25, letterSpacing: 0, marginBottom: 12 },

  heroWrap: { borderRadius: 14, overflow: 'hidden', marginBottom: 11 },

  canvasBtn: {
    backgroundColor: GOLD_B, borderRadius: 12, height: 63,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 9, marginBottom: 10,
  },
  canvasBtnTxt: { color: NAVY, fontSize: 16, fontWeight: '700', letterSpacing: 1.5 },

  cardsRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },

  turfCard: {
    flex: 1.55, backgroundColor: NAVY2, borderRadius: 12, padding: 11,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  turfTop:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 },
  turfTitle: { color: WHITE, fontSize: 16, fontWeight: '600' },
  turfBody:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  taskList:  { flex: 1 },
  taskRow:   { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  checkBox:  { width: 18, height: 18, borderRadius: 3, backgroundColor: GOLD_B, alignItems: 'center', justifyContent: 'center' },
  checkTxt:  { color: '#000', fontSize: 10, fontWeight: '900', lineHeight: 18 },
  taskTxt:   { color: 'rgba(255,255,255,0.58)', fontSize: 14, fontWeight: '400' },

  myCard: {
    flex: 1, backgroundColor: NAVY2, borderRadius: 12, padding: 11,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', justifyContent: 'space-between',
  },
  myBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  myTxt:    { color: WHITE, fontSize: 16, fontWeight: '600' },
  arrow:    { color: 'rgba(255,255,255,0.35)', fontSize: 23, fontWeight: '300' },

  pollRow: {
    backgroundColor: NAVY2, borderRadius: 11, height: 60,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  pollTxt: { color: WHITE, fontSize: 16, fontWeight: '600', flex: 1 },

  fab: {
    position: 'absolute', bottom: 82, right: 16,
    width: 63, height: 63, borderRadius: 31,
    backgroundColor: '#DC143C',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#DC143C', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55, shadowRadius: 10, elevation: 10, zIndex: 999,
  },
  fabTxt: { color: WHITE, fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },

  tabBar:       { flexDirection: 'row', backgroundColor: NAVY, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)', paddingTop: 8 },
  tabItem:      { flex: 1, alignItems: 'center', paddingBottom: 4, gap: 2 },
  tabLbl:       { color: '#4A5568', fontSize: 13, fontWeight: '400' },
  tabLblActive: { color: GOLD },
  tabDot:       { width: 5, height: 5, borderRadius: 3, backgroundColor: GOLD, marginTop: 1 },
});
