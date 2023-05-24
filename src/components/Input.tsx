import React from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../../colors';
import {useTheme} from '../hooks';
import {responsiveHeight, responsiveWidth} from '../utils/width';
interface InputProps {
  icon?: any;
  placeholder: string;
  onPressIn?: any;
  onEndEditing?: any;
  value?: string;
  onChangeText?: any;
  style?: any;
  editable?: boolean;
  handleBlur?: any;
}
const styles = StyleSheet.create({
  container_in_light: {
    backgroundColor: colors.silver,
    marginTop: responsiveHeight(27),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsiveWidth(10),
    gap: responsiveWidth(10),
    borderRadius: 8,
    height: Platform.OS === 'android' ? 50 : 60,
  },
  container_in_dark: {
    backgroundColor: colors.dark.secondary,
    marginTop: responsiveHeight(27),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsiveWidth(10),
    gap: responsiveWidth(10),
    borderRadius: 8,
    height: Platform.OS === 'android' ? 50 : 60,
  },
});
export default function Input({
  icon: Icon,
  value,
  style,
  onChangeText,
  placeholder,
  onPressIn,
  onEndEditing,
  editable = true,
  handleBlur,
}: InputProps) {
  const {isDark} = useTheme();
  return (
    <View
      style={[
        isDark ? styles.container_in_dark : styles.container_in_light,
        {...style},
      ]}>
      {Icon && <Icon fill="silver" />}
      <TextInput
        editable={editable}
        value={value}
        onBlur={handleBlur && handleBlur}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        onPressIn={onPressIn}
        style={{
          height: 'auto',
          width: 200,
          color: isDark ? 'white' : '#686873',
        }}
        placeholderTextColor={
          isDark ? '#686873' : colors.light['text-secondary']
        }
        placeholder={placeholder}
      />
    </View>
  );
}
