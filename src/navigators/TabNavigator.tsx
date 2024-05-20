import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Home, Wallet, Trades, Research, Profile} from './root';
import {TabNavigatorParamsList} from './types';
import {defaultIcon} from '../assets/icons';
import styles from './styles';
import TabIcon from '../components/atoms/Icon/TabIcon/TabIcon';
import {Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';

const Tab = createBottomTabNavigator<TabNavigatorParamsList>();
export default function TabNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'white',
          // borderTopWidth: 1,
          // borderTopColor: theme.colors.gray,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          elevation: 10, // for Android shadow
          shadowColor: theme.colors.gray,
          shadowOffset: {width: 0, height: -5}, // for iOS shadow
          shadowOpacity: 0.25, // for iOS shadow
          shadowRadius: 10, // for iOS shadow
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
              source={focused ? defaultIcon.activeHome : defaultIcon.home}
              styles={[styles.iconStyle]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
              source={focused ? defaultIcon.activeWallet : defaultIcon.wallet}
              styles={[styles.iconStyle]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Trades}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
              source={defaultIcon.starTrade}
              styles={[
                styles.iconStyle,
                {
                  position: 'absolute',
                  width: Dimensions.get('window').width / 5,
                  height: Dimensions.get('window').width / 5,
                  bottom: Dimensions.get('window').width / 200,
                },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Research"
        component={Research}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
              source={
                focused ? defaultIcon.activeResearch : defaultIcon.research
              }
              styles={[styles.iconStyle]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon
              source={focused ? defaultIcon.activeProfile : defaultIcon.profile}
              styles={[styles.iconStyle]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
