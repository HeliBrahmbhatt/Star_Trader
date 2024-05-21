import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import makeStyle from './styles';
import makeGlobalStyleSheet from '../../../utils/globalStyle';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  ...rest
}) => {
  const theme = useTheme();
  const styles = makeStyle(theme);
  const globalStyle = makeGlobalStyleSheet(theme);
  return (
    <TouchableOpacity
      style={[globalStyle.button, buttonStyle]}
      onPress={onPress}
      {...rest}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
