import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../store/authStore';

import SplashScreen             from '../screens/SplashScreen';
import OnboardingScreen         from '../screens/OnboardingScreen';
import LoginScreen              from '../screens/LoginScreen';
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

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

const RED  = '#DC143C';
const DARK = '#0F172A';

const TAB_ICONS = {
  Home:    '🏠',
  Canvass: '🗺️',
  Polling: '🔔',
  Chat:    '💬',
  Profile: '👤',
};

function MainTabs({ route }) {
  const user = route?.params?.user;
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route: r }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: DARK,
            borderTopColor: 'rgba(255,255,255,0.08)',
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 10,
            paddingTop: 8,
          },
          tabBarActiveTintColor:   RED,
          tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{TAB_ICONS[r.name] || '●'}</Text>
          ),
        })}
      >
        <Tab.Screen name="Home"    component={HomeScreen}           initialParams={{ user }} />
        <Tab.Screen name="Canvass" component={CanvassingScreen}     />
        <Tab.Screen name="Polling" component={LivePollScreen}       />
        <Tab.Screen name="Chat"    component={TeamChatScreen}       />
        <Tab.Screen name="Profile" component={ProfileScreen}        />
      </Tab.Navigator>

      {/* Floating refresh/panic FAB */}
      <TouchableOpacity style={fab.btn} activeOpacity={0.85}>
        <Text style={fab.icon}>↺</Text>
      </TouchableOpacity>
    </View>
  );
}

const fab = StyleSheet.create({
  btn: {
    position: 'absolute', bottom: 85, right: 20,
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: RED,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: RED, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5, shadowRadius: 10, elevation: 10, zIndex: 999,
  },
  icon: { color: 'white', fontSize: 22, fontWeight: '900' },
});

export default function Navigation() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#080E1C', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#DC143C" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade' }}
        initialRouteName={token ? 'Main' : 'Splash'}
      >
        <Stack.Screen name="Splash"             component={SplashScreen} />
        <Stack.Screen name="Onboarding"         component={OnboardingScreen} />
        <Stack.Screen name="Login"              component={LoginScreen} />
        <Stack.Screen name="Main"               component={MainTabs} />
        <Stack.Screen name="VoterInteraction"   component={VoterInteractionScreen}   options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="CanvassingComplete" component={CanvassingCompleteScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="CanvassingHistory"  component={CanvassingHistoryScreen}  options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="VoterProfile"       component={VoterProfileScreen}       options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Panic"              component={PanicScreen}              options={{ animation: 'fade' }} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
