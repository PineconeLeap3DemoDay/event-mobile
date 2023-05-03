import React from 'react'
import { Text, View } from 'react-native'
import { responsiveWidth } from '../utils/width'
import { useTheme } from '../hooks'
import { colors } from '../../colors'
interface HeadingProps {
  h1?: any,
  h2?: any,
  h3?: any,
  h4?: any,
  h5?: any,
  p?: any,
  title: string,
  color?: string,
  numberOfLines?: number,
  fontFamily?: string
  fontWeight?: string,
  style?: any,
  icon?: any
}
export default function Heading({
  h1, h2, h3, h4, h5, p, title, color, numberOfLines = 1, fontFamily, fontWeight, style,icon: Icon
}: HeadingProps) {
  return (
    <View style={{flexDirection: 'row',gap: responsiveWidth(10)}}>
      {Icon && <Icon />}
      <Text
        numberOfLines={numberOfLines}
        style={[
          h1 && { fontSize: 24 },
          h2 && { fontSize: 18 },
          h3 && { fontSize: 16 },
          h4 && { fontSize: 14 },
          h5 && { fontSize: 12 },
          p && { fontSize: 10 },
          fontFamily && { fontFamily: fontFamily },
          fontWeight && { fontWeight },
          { color: color ? color : 'black' },
          { ...style },
        ]}>
        {title}
      </Text>
    </View>
  )
}
