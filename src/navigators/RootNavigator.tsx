import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootNavigatorParamsList} from './types';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootNavigatorParamsList>();
export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Tab'} component={TabNavigator} />
    </Stack.Navigator>
  );
}
