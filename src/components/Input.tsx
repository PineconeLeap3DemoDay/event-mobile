import { View, TextInput } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import { responsiveHeight, responsiveWidth } from '../utils/width'
interface InputProps {
  icon?: any,
  placeholder: string
}
export default function Input({icon: Icon, placeholder}:InputProps) {
  return (
    <View style={{
        backgroundColor: colors.silver,
        marginTop: responsiveHeight(27),
        flexDirection: 'row',
        paddingTop: responsiveHeight(10),
        paddingLeft: responsiveWidth(10),
        paddingBottom: responsiveHeight(12),
        gap: responsiveWidth(10),
        borderRadius: 50,
      }}>
        <Icon/>
      <TextInput style={{height: 'auto'}} placeholder={placeholder} />
    </View>
  )
}