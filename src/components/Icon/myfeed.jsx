import { View, Text } from 'react-native'
import React from 'react'
import { Circle, Path, Svg } from 'react-native-svg'

export function MyFeed(props) {
  return (
    <Svg width={24} height={24}  xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Circle cx={9.967} cy={7.4} r={3.067} stroke="#fff" />
    <Path
      stroke="#fff"
      d="M16.1 16.217c0 1.905 0 3.45-6.133 3.45-6.134 0-6.134-1.545-6.134-3.45 0-1.906 2.746-3.45 6.134-3.45 3.387 0 6.133 1.544 6.133 3.45Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      d="M18.4 10.467h-1.533m0 0h-1.534m1.534 0V8.933m0 1.534V12"
    />
  </Svg>
)
}