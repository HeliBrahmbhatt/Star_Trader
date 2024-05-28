import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabBar from '../components/atoms/TabBar/TabBar';
import {AuthNavigatorParamsList} from './types';
import OnBoarding from '../screens/OnBoarding/OnBoarding';

const Auth = createNativeStackNavigator<AuthNavigatorParamsList>();
export default function AuthNavigator() {
  return (
    <Auth.Navigator
      // initialRouteName="OnBoarding"
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name={'TabBar'} component={TabBar} />
      <Auth.Screen name={'OnBoarding'} component={OnBoarding} />
    </Auth.Navigator>
  );
}
