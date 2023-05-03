import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import { responsiveHeight, responsiveWidth } from '../utils/width'
import { useTheme } from '../hooks'
interface InputProps {
  icon?: any,
  placeholder: string
}
const styles = StyleSheet.create({
    container_in_light: {
      backgroundColor: colors.silver,
      marginTop: responsiveHeight(27),
      flexDirection: 'row',
      paddingTop: responsiveHeight(10),
      paddingLeft: responsiveWidth(10),
      paddingBottom: responsiveHeight(12),
      gap: responsiveWidth(10),
      borderRadius: 50,
    },
    container_in_dark: {
      backgroundColor: colors.dark.secondary,
      marginTop: responsiveHeight(27),
      flexDirection: 'row',
      paddingTop: responsiveHeight(10),
      paddingLeft: responsiveWidth(10),
      paddingBottom: responsiveHeight(12),
      gap: responsiveWidth(10),
      borderRadius: 50,
    }
});
export default function Input({icon: Icon, placeholder}:InputProps) {
  const {isDark} = useTheme();
  return (
    <View style={isDark ? styles.container_in_dark : styles.container_in_light}>
        <Icon/>
      <TextInput style={{height: 'auto'}} placeholderTextColor={isDark ? '#686873' : colors.light['text-secondary']} placeholder={placeholder} />
    </View>
  )
}