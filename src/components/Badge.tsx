import React from 'react'
import { SvgNotification } from './Icon'
import { View,Text } from 'react-native'
import { colors } from '../../colors'

export function Badge() {
  return (
    <View style={{position: 'relative'}}>
        <SvgNotification width={24} height={24} fill="black" />
    </View>
  )
}
