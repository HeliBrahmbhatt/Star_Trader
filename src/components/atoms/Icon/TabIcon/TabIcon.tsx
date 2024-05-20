import {
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import IconStyleCreater from './styles';
import {defaultIcon} from '../../../../assets/icons';

interface TabIconProps {
  sizes?: {
    width: number;
    height: number;
  };
  source?: ImageSourcePropType | string;
  styles?: StyleProp<ViewStyle>;
}
const TabIcon: React.FC<TabIconProps> = ({styles, source, sizes}) => {
  const defaultStyles = styles ? styles : IconStyleCreater().iconStyle;
  const defaultSource = source ? source : defaultIcon.home;
  return <Image source={defaultSource} style={defaultStyles} />;
};

export default TabIcon;
