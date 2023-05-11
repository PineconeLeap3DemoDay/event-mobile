import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
export const UserRounded = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width={26} height={26}>
    <Circle cx={15} cy={12} r={3} stroke="#686873" strokeWidth={1.5} />
    <Circle cx={15} cy={15} r={10} stroke="#686873" strokeWidth={1.5} />
    <Path
      stroke="#686873"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M20.97 23c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"
    />
  </Svg>
)
