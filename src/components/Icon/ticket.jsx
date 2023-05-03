import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
export const Ticket = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
  >
    <Path
      stroke="#D22366"
      strokeWidth={1.5}
      d="M3.865 13.752c-1.34-1.34-2.01-2.01-2.259-2.878-.249-.87-.036-1.792.39-3.638l.246-1.064c.358-1.553.537-2.33 1.069-2.861.532-.532 1.308-.711 2.86-1.07l1.065-.245c1.846-.426 2.769-.639 3.638-.39.869.25 1.538.92 2.878 2.259l1.586 1.585c2.33 2.33 3.495 3.496 3.495 4.944s-1.165 2.613-3.495 4.944c-2.33 2.33-3.496 3.495-4.944 3.495s-2.613-1.165-4.944-3.495l-1.585-1.586Z"
    />
    <Circle
      cx={7.226}
      cy={7.461}
      r={1.733}
      stroke="#D22366"
      strokeWidth={1.5}
      transform="rotate(-45 7.226 7.461)"
    />
    <Path
      stroke="#D22366"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m9.77 15.8 6.048-6.049"
    />
  </Svg>
)
