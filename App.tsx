import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {I18nextProvider} from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';

import RootNavigator from '@src/navigators/RootNavigator';
import AuthNavigator from '@src/navigators/AuthNavigator';
import {DatabaseProvider} from '@src/services/Database/DatabaseContext';
import {DarkTheme, LightTheme} from '@src/theme';
import {i18n} from '@src/localization/i18n';
import Splash from '@src/screens/Splash/Splash';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? DarkTheme : LightTheme;
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Hide the native splash screen
    SplashScreen.hide();

    // Set a timeout to hide the custom splash screen after a certain duration
    const splashTimeout = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(splashTimeout);
  }, []);

  if (isSplashVisible) {
    return <Splash />;
  }
  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <PaperProvider theme={theme}>
        <DatabaseProvider>
          <NavigationContainer theme={theme}>
            <StatusBar
              translucent
              backgroundColor={isDarkTheme ? 'black' : 'transparent'}
              barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
            />
            <RootNavigator />
            {/* <AuthNavigator /> */}
          </NavigationContainer>
        </DatabaseProvider>
      </PaperProvider>
    </I18nextProvider>
  );
}
