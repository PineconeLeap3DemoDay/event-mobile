import { View, SafeAreaView } from 'react-native'
import React from 'react'
import { padding } from '../../utils'
interface LayoutProps {
    children: React.ReactNode,
    style?: any
}
export default function Layout({children,style}: LayoutProps) {
  return (
    <SafeAreaView style={{flex: 1,...style}}>
        <View style={{...padding(24,24,24,24)}}>
            {children}
        </View>
    </SafeAreaView>
  )
}