import React, { forwardRef } from 'react'
import { View, Text } from 'react-native'
interface HeadingProps {
  style?: any,
  children: React.ReactNode,
}
const Heading = forwardRef(function Heading({
  style, children, ...props
}: HeadingProps, ref: any) {
  return (
    <View ref={ref} >
      <Text style={style}>{children}</Text>
    </View>
  )
}
)
export const H1 = ({style, ...props}: HeadingProps) => <Heading style={{color:'black', fontWeight: '500', fontSize: 20}} {...props}/>
export const H2 = ({style, ...props}: HeadingProps) => <Heading style={{color:'black', fontWeight: '500', fontSize: 18}} {...props}/>
export const H3 = ({style, ...props}: HeadingProps) => <Heading style={{color:'black', fontWeight: '500', fontSize: 16}} {...props}/>
