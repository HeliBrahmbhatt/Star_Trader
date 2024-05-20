import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import RootNavigator from './src/navigators/RootNavigator';
import {PaperProvider} from 'react-native-paper';
import {DarkTheme, LightTheme} from './src/theme';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar
          translucent
          backgroundColor={isDarkTheme ? 'black' : 'transparent'}
          barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        />
        <AuthNavigator />
        {/* <RootNavigator /> */}
      </NavigationContainer>
    </PaperProvider>
  );
}
