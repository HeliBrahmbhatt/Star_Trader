import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import TabBar from '@src/components/atoms/TabBar/TabBar';

import {AuthNavigatorParamsList} from './types';

const Auth = createNativeStackNavigator<AuthNavigatorParamsList>();
export default function AuthNavigator() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name={'TabBar'} component={TabBar} />
    </Auth.Navigator>
  );
}
