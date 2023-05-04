import * as React from 'react';
import Svg, {Path,Circle,Ellipse} from 'react-native-svg';
export const User = ({ fill, width, height,stroke = 'silver', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Circle cx={15} cy={9} r={4} stroke={stroke} strokeWidth={1.5} />
    <Ellipse cx={15} cy={20} stroke={stroke} strokeWidth={1.5} rx={7} ry={4} />
  </Svg>
);

