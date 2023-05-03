import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Close = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke="#686873"
      strokeLinecap="round"
      strokeWidth={2}
      d="M13 1 1 13M1 1l12 12"
    />
  </Svg>
)
