import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Exit = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg"
  width={40} height={30}
  fill="none" {...props}>
    <Path
      stroke="#686873"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M11 19.5c0 2.828 0 4.243.879 5.121.878.879 2.293.879 5.121.879h1c2.828 0 4.243 0 5.121-.879C24 23.743 24 22.328 24 19.5v-8c0-2.828 0-4.243-.879-5.121C22.243 5.5 20.828 5.5 18 5.5h-1c-2.828 0-4.243 0-5.121.879C11 7.257 11 8.672 11 11.5"
    />
    <Path
      stroke="#686873"
      strokeWidth={1.5}
      d="M11 23c-2.357 0-3.536 0-4.268-.732C6 21.535 6 20.357 6 18v-5c0-2.357 0-3.536.732-4.268C7.464 8 8.643 8 11 8"
    />
    <Path
      stroke="#686873"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 15.5h9m0 0L15.5 18m2.5-2.5L15.5 13"
    />
  </Svg>
)
