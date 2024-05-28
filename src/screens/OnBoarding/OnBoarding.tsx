import React, {useState, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  View,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';

import {Text, useTheme} from 'react-native-paper';
import makeStyle from './styles';
import {defaultIcon} from '../../assets/icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';
import makeGlobalStyleSheet from '../../utils/globalStyle';
import {PrimaryButton} from '../../components/atoms/PrimaryButton/PrimaryButton';

const ANIMATION_DURATION = 1000; // Adjust duration as needed (in milliseconds)

const OnBoarding = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = makeStyle(theme);
  const globalStyle = makeGlobalStyleSheet(theme);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const {width, height} = Dimensions.get('window');
  const isSmallDevice = height < 668;

  const [textOpacity] = useState(new Animated.Value(0));
  const [imageTranslateY] = useState(new Animated.Value(300));
  const [imageScale] = useState(new Animated.Value(2)); // Add scale animated value
  const [show, setShow] = useState(false);

  const data = [
    {
      title: t('onBoardingTitle1'),
      text: t('onBoardingDes1'),
      image: defaultIcon.onBoarding1,
    },
    {
      title: t('onBoardingTitle2'),
      text: t('onBoardingDes2'),
      image: defaultIcon.onBoarding1,
    },
    {
      title: t('onBoardingTitle3'),
      text: t('onBoardingDes3'),
      image: defaultIcon.onBoarding1,
    },
    {
      title: t('onBoardingTitle4'),
      text: t('onBoardingDes4'),
      image: defaultIcon.onBoarding1,
    },
  ];

  type Item = (typeof data)[0];
  let slider = useRef();

  useEffect(() => {
    const animateText = Animated.timing(textOpacity, {
      toValue: 1,
      duration: ANIMATION_DURATION / 2,
      useNativeDriver: true, // Improve performance if possible
    });

    const animateImage = Animated.parallel([
      Animated.timing(imageTranslateY, {
        toValue: 0,
        duration: ANIMATION_DURATION / 2,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: ANIMATION_DURATION / 2,
        useNativeDriver: true,
      }),
    ]);

    setTimeout(() => {
      Animated.sequence([animateText, animateImage]).start();
    }, 100);

    setShow(true);
  }, []);

  const renderItem = ({item, index}: {item: Item; index: number}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            height: !isSmallDevice
              ? Dimensions.get('window').height / 12
              : Dimensions.get('window').height / 10,
          }}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={{flex: 2.2, marginTop: 25}}>
          <Image source={item.image} style={styles.onBoardingImage} />
        </View>
        <View
          style={{
            flex: 1,
            bottom: !isSmallDevice
              ? Platform.OS === 'ios'
                ? Dimensions.get('window').width / 4.5
                : Dimensions.get('window').width / 7.5
              : Dimensions.get('window').width / 20,
          }}>
          {renderPagination(index)}
        </View>
        <View
          style={{
            flex: 1,
            bottom:
              Platform.OS === 'ios'
                ? !isSmallDevice
                  ? Dimensions.get('window').width / 3.5
                  : Dimensions.get('window').width / 20
                : Dimensions.get('window').width / 7.5,
          }}>
          <Text style={styles.textDes}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item: Item) => item.title;

  const renderPagination = (activeIndex: number) => {
    return (
      <View
        style={[
          styles.paginationContainer,
          {
            // bottom:
            //   Platform.OS === 'ios'
            //     ? Dimensions.get('window').width / 9
            //     : Dimensions.get('window').width / 29,
            // top: isSmallDevice ? 5 : null,
          },
        ]}>
        {data.length > 1 &&
          data.map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.dot,
                i === activeIndex
                  ? {
                      backgroundColor: theme.colors.white,
                    }
                  : {
                      backgroundColor: theme.colors.whiteOpacity40,
                      width: 5,
                      height: 5,
                      borderRadius: 5 / 2,
                      marginHorizontal: 2,
                    },
              ]}
              onPress={() => slider?.goToSlide(i, true)}
            />
          ))}
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground style={{flex: 1}} source={defaultIcon.backImage}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.container}>
              <Animated.Image
                source={defaultIcon.appLogoT} // Replace with your image source
                style={[
                  styles.image,
                  {
                    marginTop: statusBarHeight,
                    transform: [
                      {translateY: imageTranslateY},
                      {scale: imageScale},
                    ],
                  },
                ]}
              />
              <Animated.Text style={[styles.text, {opacity: textOpacity}]}>
                {/* {t('starTrader')} */}
              </Animated.Text>
            </View>
            {show && (
              <View
                style={{
                  flex: 1,
                  marginTop: Dimensions.get('window').height / 6,
                }}>
                <AppIntroSlider
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}
                  renderPagination={() => {
                    null;
                  }}
                  showNextButton={false}
                  showDoneButton={false}
                  data={data}
                  ref={ref => (slider = ref!)}
                />
                <PrimaryButton
                  style={[
                    globalStyle.button,
                    {
                      bottom: Dimensions.get('window').width / 9,
                      marginHorizontal: 18,
                      borderRadius: 8,
                    },
                  ]}
                  title={t('getStarted')}
                  onPress={() => {
                    navigation.navigate('TabBar');
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default OnBoarding;
