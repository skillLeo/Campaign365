import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';
import { TYPE } from '../theme/typography';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../store/authStore';

import SplashScreen             from '../screens/SplashScreen';
import OnboardingScreen         from '../screens/OnboardingScreen';
import LoginScreen              from '../screens/LoginScreen';
import SignInSuccessScreen      from '../screens/SignInSuccessScreen';
import SignUpScreen             from '../screens/SignUpScreen';
import ForgotPasswordScreen     from '../screens/ForgotPasswordScreen';
import OfflineModeScreen        from '../screens/main/OfflineModeScreen';
import HomeScreen               from '../screens/main/HomeScreen';
import CanvassingScreen         from '../screens/main/CanvassingScreen';
import VoterInteractionScreen   from '../screens/main/VoterInteractionScreen';
import CanvassingCompleteScreen from '../screens/main/CanvassingCompleteScreen';
import CanvassingHistoryScreen  from '../screens/main/CanvassingHistoryScreen';
import LivePollScreen           from '../screens/main/LivePollScreen';
import VoterProfileScreen       from '../screens/main/VoterProfileScreen';
import TeamChatScreen           from '../screens/main/TeamChatScreen';
import ProfileScreen            from '../screens/main/ProfileScreen';
import PanicScreen              from '../screens/main/PanicScreen';
import MyAssignmentsScreen      from '../screens/main/MyAssignmentsScreen';
import PlaceholderScreen        from '../screens/main/PlaceholderScreen';
import CampaignMaterialsScreen  from '../screens/main/CampaignMaterialsScreen';
import RunnerTrackingScreen     from '../screens/main/RunnerTrackingScreen';
import GOTVScreen               from '../screens/main/GOTVScreen';
import QuickReportsScreen       from '../screens/main/QuickReportsScreen';
import AIInsightsScreen         from '../screens/main/AIInsightsScreen';
import ScheduleScreen           from '../screens/main/ScheduleScreen';
import QuickAddVoterScreen      from '../screens/main/QuickAddVoterScreen';
import ReportIssueScreen        from '../screens/main/ReportIssueScreen';
import ElectionNightScreen      from '../screens/main/ElectionNightScreen';
import RecruitVolunteerScreen   from '../screens/main/RecruitVolunteerScreen';
import LogoutScreen             from '../screens/main/LogoutScreen';
import SyncCompleteScreen       from '../screens/main/SyncCompleteScreen';
import HelpScreen               from '../screens/main/HelpScreen';
import TurfMapScreen            from '../screens/main/TurfMapScreen';
import VoterWalkListScreen      from '../screens/main/VoterWalkListScreen';
import SettingsScreen           from '../screens/main/SettingsScreen';
import SpeechToTextScreen       from '../screens/main/SpeechToTextScreen';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

const RED  = '#DC143C';
const GOLD = '#C9A227';
const DARK = '#0A2540';

function HomeTabIcon({ color })    { return <Svg width={22} height={22} viewBox="0 0 24 24"><Path d="M3,12 L12,4 L21,12 L21,21 L15,21 L15,16 L9,16 L9,21 L3,21 Z" fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" /></Svg>; }
function CanvassTabIcon({ color }) { return <Svg width={22} height={22} viewBox="0 0 24 24"><Rect x={3} y={3} width={18} height={18} rx={2} fill="none" stroke={color} strokeWidth={2} /><Rect x={7} y={7} width={4} height={4} rx={1} fill={color} /><Rect x={13} y={7} width={4} height={4} rx={1} fill={color} /><Rect x={7} y={13} width={4} height={4} rx={1} fill={color} /><Rect x={13} y={13} width={4} height={4} rx={1} fill={color} /></Svg>; }
function PollsTabIcon({ color })   { return <Svg width={22} height={22} viewBox="0 0 24 24"><Rect x={3}  y={13} width={4} height={8}  rx={1} fill={color} /><Rect x={10} y={7}  width={4} height={14} rx={1} fill={color} /><Rect x={17} y={10} width={4} height={11} rx={1} fill={color} /></Svg>; }
function TeamTabIcon({ color })    { return <Svg width={24} height={22} viewBox="0 0 26 22"><Circle cx={9} cy={6} r={4} fill="none" stroke={color} strokeWidth={2} /><Circle cx={19} cy={6} r={3} fill="none" stroke={color} strokeWidth={1.8} /><Path d="M1,22 Q1,13 9,13 Q17,13 17,22" fill="none" stroke={color} strokeWidth={2} /><Path d="M19,13 Q25,13 25,20" fill="none" stroke={color} strokeWidth={1.8} /></Svg>; }
function ProfileTabIcon({ color }) { return <Svg width={22} height={22} viewBox="0 0 24 24"><Circle cx={12} cy={7} r={4} fill="none" stroke={color} strokeWidth={2} /><Path d="M4,22 Q4,14 12,14 Q20,14 20,22" fill="none" stroke={color} strokeWidth={2} /></Svg>; }

function MainTabs({ route }) {
  const user = route?.params?.user;
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tab.Screen name="Home"    component={HomeScreen}           initialParams={{ user }} />
        <Tab.Screen name="Canvass" component={CanvassingScreen}     />
        <Tab.Screen name="Polls"   component={LivePollScreen}       />
        <Tab.Screen name="Team"    component={TeamChatScreen}       />
        <Tab.Screen name="Profile" component={ProfileScreen}        />
      </Tab.Navigator>

    </View>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade' }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash"             component={SplashScreen} />
        <Stack.Screen name="Onboarding"         component={OnboardingScreen} />
        <Stack.Screen name="Login"              component={LoginScreen} />
        <Stack.Screen name="SignUp"             component={SignUpScreen}         options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword"     component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OfflineMode"        component={OfflineModeScreen}    options={{ headerShown: false }} />
        <Stack.Screen name="Main"               component={MainTabs} />
        <Stack.Screen name="VoterInteraction"   component={VoterInteractionScreen}   options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="CanvassingComplete" component={CanvassingCompleteScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="CanvassingHistory"  component={CanvassingHistoryScreen}  options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="VoterProfile"       component={VoterProfileScreen}       options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Panic"              component={PanicScreen}              options={{ animation: 'fade' }} />
        <Stack.Screen name="MyAssignments"     component={MyAssignmentsScreen}      options={{ animation: 'slide_from_right', headerShown: false }} />
        <Stack.Screen name="CampaignMaterials" component={CampaignMaterialsScreen}  options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="RunnerTracking"    component={RunnerTrackingScreen}     options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="GOTV"              component={GOTVScreen}               options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="QuickReports"      component={QuickReportsScreen}       options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="AIInsights"        component={AIInsightsScreen}         options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Schedule"          component={ScheduleScreen}           options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="QuickAddVoter"     component={QuickAddVoterScreen}      options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="ReportIssue"       component={ReportIssueScreen}        options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="ElectionNight"     component={ElectionNightScreen}      options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="RecruitVolunteer"  component={RecruitVolunteerScreen}   options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Logout"            component={LogoutScreen}             options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="SyncComplete"      component={SyncCompleteScreen}       options={{ animation: 'fade' }} />
        <Stack.Screen name="Help"              component={HelpScreen}               options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="SignInSuccess"     component={SignInSuccessScreen}      options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="TurfMap"           component={TurfMapScreen}            options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="VoterWalkList"     component={VoterWalkListScreen}      options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="Settings"          component={SettingsScreen}           options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="SpeechToText"      component={SpeechToTextScreen}       options={{ headerShown: false, animation: 'slide_from_right' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
