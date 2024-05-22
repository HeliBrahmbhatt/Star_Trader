import {StatusBar} from 'react-native';
import React, {useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {DarkTheme, LightTheme} from './src/theme';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import {I18nextProvider} from 'react-i18next';
import {i18n} from './src/localization/i18n';
import {DatabaseProvider} from './src/services/DatabaseContext';
import RootNavigator from './src/navigators/RootNavigator';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? DarkTheme : LightTheme;

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
            {/* <AuthNavigator /> */}
            <RootNavigator />
          </NavigationContainer>
        </DatabaseProvider>
      </PaperProvider>
    </I18nextProvider>
  );
}
