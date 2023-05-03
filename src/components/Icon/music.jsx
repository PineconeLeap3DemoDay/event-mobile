import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
export const Music = ({ fill, width, height, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}>
    <Rect width={40} height={40} fill={fill} rx={20} />
    <Path
      stroke="#444"
      d="M17.7 25.367a2.3 2.3 0 1 1-4.6 0 2.3 2.3 0 0 1 4.6 0ZM26.9 23.833a2.3 2.3 0 1 1-4.6 0 2.3 2.3 0 0 1 4.6 0ZM17.7 25.366v-8.433M26.9 23.833V15.4"
    />
    <Path
      stroke="#444"
      strokeLinecap="round"
      d="M22.863 13.679 19.797 14.7c-1.012.337-1.518.506-1.808.907-.289.402-.289.936-.289 2.002V20l9.2-3.067v-.345c0-1.942 0-2.912-.637-3.371-.637-.46-1.558-.152-3.4.462Z"
    />
  </Svg>
);

