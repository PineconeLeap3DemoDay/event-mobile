import React from 'react'
import { View } from 'react-native'
import { Icon } from './Icon/Icon'
import { responsiveWidth } from '../utils/width'
import { useTheme } from '../hooks';
import { colors } from '../../colors';

export function Badge() {
  const {isDark} = useTheme();

  return (
    <View style={{position: 'relative', marginRight: responsiveWidth(10)}}>
      <Icon name='Notification' fill={isDark ? colors.dark['text-primary'] : 'black'}/>
    </View>
  )
}
