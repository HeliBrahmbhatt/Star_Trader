import {ReactNode} from 'react';
import {TextStyle, ViewStyle, ColorValue} from 'react-native';
import {TIcon} from '../../../types';

interface ICommonInput {
  label?: string;
  placeholderTextColor?: ColorValue;
  leftIcon?: ReactNode;
  rightIcon?: TIcon | null | undefined;
  maxLength?: number;
  rightIconPress?: () => void;
  errorMsg?: string | null;
  countryCode?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  inputVariant?: 'single' | 'multiline';
  suffixIcon?: JSX.Element | null | undefined;
  isReferralValid?: boolean;
  multiline?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  clickable?: boolean;
  onSubmitEditing?: () => void;
  disabled?: boolean;
}

interface Props extends TextInputProps {
  label?: string;
  errorMessage?: string;
}

export type CommonInputProps = ICommonInput;
