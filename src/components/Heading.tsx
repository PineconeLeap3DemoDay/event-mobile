import React from 'react'
import { Text } from 'react-native'
interface HeadingProps {
  h1?: any,
  h2?: any,
  h3?: any,
  h4?: any,
  h5?: any,
  h6?: any,
  p?: any,
  title: string,
  color?: string,
  numberOfLines?: number,
  fontFamily?: 'Roboto' | '',
  fontWeight?: string
}
export default function Heading({
  h1, h2, h3, h4, h5,h6, p, title, color, numberOfLines = 1, fontFamily, fontWeight
}: HeadingProps) {
  return (
    <Text 
    numberOfLines={numberOfLines}
    style={[
      h1 && { fontSize: 24 },
      h2 && { fontSize: 18 },
      h3 && { fontSize: 16 },
      h4 && { fontSize: 14 },
      h5 && { fontSize: 12 },
      p && { fontSize: 10},
      fontFamily === 'Roboto' && {fontFamily: 'Roboto-Light'},
      fontWeight && {fontWeight},
      {color: color ? color: 'black'}
    ]}>{title}</Text>
  )
}
