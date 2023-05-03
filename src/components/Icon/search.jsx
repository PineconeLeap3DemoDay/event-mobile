import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Search = (props) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill="#C7C9CF"
      fillRule="evenodd"
      d="M10.25 1.5a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5ZM0 10.25C0 4.59 4.59 0 10.25 0S20.5 4.59 20.5 10.25c0 2.56-.939 4.902-2.491 6.698l3.271 3.272a.75.75 0 1 1-1.06 1.06l-3.272-3.271A10.21 10.21 0 0 1 10.25 20.5C4.59 20.5 0 15.91 0 10.25Z"
      clipRule="evenodd"
    />
  </Svg>
)
