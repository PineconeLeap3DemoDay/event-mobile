import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
export const Sun = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
  >
    <Circle cx={15} cy={15} r={6} stroke="#686873" strokeWidth={1.5} />
    <Path
      stroke="#686873"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M15 5v1M15 24v1M25 15h-1M6 15H5M22.07 7.93l-.392.392M8.322 21.678l-.393.393M22.07 22.07l-.392-.392M8.322 8.322l-.393-.393"
    />
  </Svg>
)
