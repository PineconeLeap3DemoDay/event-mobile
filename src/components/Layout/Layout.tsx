import { View, SafeAreaView } from 'react-native'
import React from 'react'
import { padding } from '../../utils'
import { useTheme } from '../../hooks'
import { colors } from '../../../colors'
interface LayoutProps {
    children: React.ReactNode,
    style?: any
}
export default function Layout({children,style}: LayoutProps) {
  const {isDark} = useTheme();
  return (
    <SafeAreaView style={{flex: 1,
    backgroundColor: isDark ? colors.dark.primary : 'white'  
    ,
    ...style}}>
        <View style={{...padding(30,24,30,24)}}>
            {children}
        </View>
    </SafeAreaView>
  )
}