import {defaultIcon} from '@src/assets/icons';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';

import makeStyle from './styles';
import {useTheme} from 'react-native-paper';

const ANIMATION_DURATION = 500; // Adjust duration as needed (in milliseconds)

const Splash = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = makeStyle(theme);

  const [textOpacity] = useState(new Animated.Value(-10));
  const [imageTranslateY] = useState(new Animated.Value(50));
  const [show, setShow] = useState(false);

  useEffect(() => {
    const animateText = Animated.timing(textOpacity, {
      toValue: 1,
      duration: ANIMATION_DURATION / 2,
      useNativeDriver: true, // Improve performance if possible
    });

    const animateImage = Animated.timing(imageTranslateY, {
      toValue: 0,
      duration: ANIMATION_DURATION / 2,
      delay: ANIMATION_DURATION / 2, // Delay image animation
      useNativeDriver: true,
    });

    setTimeout(() => {
      Animated.sequence([animateText, animateImage]).start();
      setShow(true);
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground style={{flex: 1}} source={defaultIcon.backImage}>
        <View style={styles.container}>
          {show && (
            <Animated.Image
              source={defaultIcon.appLogo} // Replace with your image source
              style={[
                styles.image,
                {transform: [{translateY: imageTranslateY}]},
              ]}
            />
          )}

          <Animated.Text style={[styles.text, {opacity: textOpacity}]}>
            {t('starTrader')}
          </Animated.Text>
        </View>
      </ImageBackground>
    </>
  );
};

export default Splash;
