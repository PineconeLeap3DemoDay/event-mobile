import * as React from 'react';
import Svg, {Rect, Path, Circle} from 'react-native-svg';
export const SvgMedicine = ({ fill, width, height, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}>
    <Rect width={40} height={40} fill={fill} rx={20} />
    <Path
      stroke="#444"
      d="M17.7 21.714v2.12a3.833 3.833 0 0 0 3.833 3.833h.677a3.158 3.158 0 0 0 3.039-2.3"
    />
    <Path
      stroke="#444"
      strokeLinecap="round"
      d="M14.962 13.1h-.07c-.24 0-.36 0-.461.009a2.3 2.3 0 0 0-2.089 2.088c-.009.102-.009.222-.009.461v.69a5.367 5.367 0 0 0 5.367 5.366 5.148 5.148 0 0 0 5.148-5.148v-.908c0-.24 0-.36-.01-.46a2.3 2.3 0 0 0-2.088-2.089c-.1-.009-.22-.009-.46-.009h-.07"
    />
    <Circle cx={25.367} cy={23.067} r={2.3} stroke="#444" />
    <Path
      stroke="#444"
      strokeLinecap="round"
      d="M20 12.334v1.533M15.4 12.334v1.533"
    />
  </Svg>
);

