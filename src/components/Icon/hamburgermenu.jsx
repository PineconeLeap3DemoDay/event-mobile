import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const Hamburgermenu = ({ fill, width, height, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}>
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M25.333 10.667a.8.8 0 0 1-.8.8H7.467a.8.8 0 0 1 0-1.6h17.066a.8.8 0 0 1 .8.8ZM25.333 16a.8.8 0 0 1-.8.8H7.467a.8.8 0 0 1 0-1.6h17.066a.8.8 0 0 1 .8.8ZM25.333 21.334a.8.8 0 0 1-.8.8H7.467a.8.8 0 0 1 0-1.6h17.066a.8.8 0 0 1 .8.8Z"
      clipRule="evenodd"
    />
  </Svg>
);

