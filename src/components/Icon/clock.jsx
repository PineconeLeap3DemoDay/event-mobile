import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Clock = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#D22366"
      fillRule="evenodd"
      d="M9.75 1.29a7.96 7.96 0 1 0 0 15.92 7.96 7.96 0 0 0 0-15.92ZM.5 9.25a9.25 9.25 0 1 1 18.5 0 9.25 9.25 0 0 1-18.5 0Zm9.25-4.087c.356 0 .645.289.645.645v3.175l1.963 1.962a.645.645 0 0 1-.913.912l-2.151-2.15a.645.645 0 0 1-.19-.457V5.808c0-.356.29-.645.646-.645Z"
      clipRule="evenodd"
    />
  </Svg>
)
