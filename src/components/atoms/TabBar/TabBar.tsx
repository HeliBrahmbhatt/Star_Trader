import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Login, SignUp} from '@src/navigators/root';

import makeStyle from './styles';

const TabBar = () => {
  const theme = useTheme();
  const styles = makeStyle(theme);
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  const tableHead = [
    'Exchange',
    'Ticker',
    'Qty.',
    'Price',
    'Value',
    'Unrealized Gain/Loss',
  ];
  const tableData = [
    ['NFL', 'PMAH', '3', '300.10', '900.30', '200.33'],
    ['NFL', 'PMAH', '3', '300.10', '900.30', '200.33'],
    ['NFL', 'PMAH', '3', '300.10', '900.30', '200.33'],
    ['NFL', 'PMAH', '3', '300.10', '900.30', '200.33'],
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        // initialRouteName="Log In"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIndicatorStyle: {backgroundColor: theme.colors.primary},
          tabBarLabelStyle: {fontSize: 14},
        }}>
        <Tab.Screen
          name={'Sign Up'}
          component={SignUp}
          options={{tabBarLabel: 'Sign Up'}}
        />
        <Tab.Screen
          name={'Log In'}
          component={Login}
          options={{tabBarLabel: 'Log In'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabBar;
