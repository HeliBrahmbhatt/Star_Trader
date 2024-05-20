import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthNavigatorParamsList} from './types';
import {SignUp, Login} from './root';

const Stack = createNativeStackNavigator<AuthNavigatorParamsList>();
export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'SignUp'} component={SignUp} />
      <Stack.Screen name={'Login'} component={Login} />
    </Stack.Navigator>
  );
}
