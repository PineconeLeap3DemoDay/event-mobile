import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ErrorRed = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F01A1A"
      strokeLinecap="round"
      d="m8.663 1.333-7.33 7.33m0-7.33 7.33 7.33"
    />
  </Svg>
)
export default ErrorRed
