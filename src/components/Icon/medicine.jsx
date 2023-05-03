import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
export const Medicine = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke={props?.stroke}
        d="M9.2 13.714v2.12a3.833 3.833 0 0 0 3.833 3.833h.677a3.158 3.158 0 0 0 3.039-2.3"
      />
      <Path
        stroke={props?.stroke}
        strokeLinecap="round"
        d="M6.462 5.1h-.07c-.24 0-.36 0-.461.009a2.3 2.3 0 0 0-2.089 2.088c-.009.102-.009.222-.009.461v.69A5.367 5.367 0 0 0 9.2 13.713a5.148 5.148 0 0 0 5.148-5.148v-.908c0-.24 0-.36-.01-.46a2.3 2.3 0 0 0-2.088-2.089c-.1-.009-.22-.009-.46-.009h-.07"
      />
      <Circle cx={16.867} cy={15.067} r={2.3} 
        stroke={props?.stroke}
      />
      <Path
        stroke={props?.stroke}
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M11.5 4.333v1.534M6.9 4.333v1.534"
      />
    </Svg>
  )
}

