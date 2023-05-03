import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Home = (props) => {
  delete props.fill
  return(
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <Path
        stroke={props.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m.75 12 2.5-2.5m0 0L12 .75l8.75 8.75m-17.5 0V22c0 .69.56 1.25 1.25 1.25h3.75M20.75 9.5l2.5 2.5m-2.5-2.5V22c0 .69-.56 1.25-1.25 1.25h-3.75m-7.5 0c.69 0 1.25-.56 1.25-1.25v-5c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25v5c0 .69.56 1.25 1.25 1.25m-7.5 0h7.5"
      />
    </Svg>
  )
}