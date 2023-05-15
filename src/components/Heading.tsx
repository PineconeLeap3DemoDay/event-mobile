import React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '../hooks'
import { responsiveWidth } from '../utils/width'
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
  icon?: any,
  fontSize?:number
}
export default function Heading({
  h1, h2, h3, h4, h5, p, title, fontSize,color, numberOfLines = 1, fontFamily, fontWeight, style,icon: Icon
}: HeadingProps) {
  const {isDark} = useTheme()
  return (
    <View style={{flexDirection: 'row',gap: responsiveWidth(10)}}>
      {Icon && <Icon />}
      <Text
        numberOfLines={numberOfLines}
        style={[
          { color: color ? color : 'black' },
          h1 && { fontSize: 24, color: isDark ? 'white' : color ,fontFamily:'Poppins-SemiBold' },
          h2 && { fontSize: 18,color: isDark ? 'white' : color ,fontFamily: 'Inter-Regular'  },
          h3 && { fontSize: 16 ,fontWeight:600,color: isDark ? 'white': 'black',fontFamily:'Poppins-SemiBold'},
          h4 && { fontSize: 14 ,fontFamily:"Inter-Regular"},
          h5 && { fontSize: 12 ,fontWeight:400,fontFamily:'Poppins-SemiBold'},
          p && { fontSize: 10 ,fontFamily:"Inter-Regular"},
          fontFamily && { fontFamily: fontFamily },
          fontWeight && { fontWeight },
          fontSize && {fontSize},
          { ...style },
        ]}>
        {title}
      </Text>
    </View>
  )
}
