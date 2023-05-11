import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Key = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
  >
    <Path
      stroke={props.stroke ? props.stroke : "#CCC"}
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.68 17.587c3.49 0 6.32-2.818 6.32-6.294C25 7.818 22.17 5 18.68 5s-6.319 2.818-6.319 6.293c0 1.61.735 2.781.735 2.781l-7.642 7.61c-.342.342-.823 1.23 0 2.05l.882.878c.343.293 1.205.703 1.91 0l1.03-1.024c1.028 1.024 2.204.439 2.645-.147.734-1.024-.147-2.049-.147-2.049l.294-.293c1.41 1.405 2.645.586 3.086 0 .735-1.024 0-2.049 0-2.049-.294-.585-.882-.585-.147-1.317l.882-.878c.705.585 2.155.732 2.792.732Z"
    />
    <Path
      stroke={props.stroke ? props.stroke : "#CCC"}
      strokeWidth={1.5}
      d="M20.885 11.293a2.2 2.2 0 0 1-2.204 2.196 2.2 2.2 0 0 1-2.205-2.196 2.2 2.2 0 0 1 2.205-2.195 2.2 2.2 0 0 1 2.204 2.195Z"
    />
  </Svg>
)
