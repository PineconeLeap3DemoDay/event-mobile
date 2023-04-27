import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
export const SvgGaming = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}>
    <Rect width={40} height={40} fill="#F7F7F7" rx={20} />
    <Path
      stroke="#444"
      strokeLinecap="round"
      d="m18.593 14.464.385.272a1.77 1.77 0 0 0 2.044 0l.385-.272a3.251 3.251 0 0 1 1.878-.597h.47c.31 0 .623.02.915.123 1.826.648 3.083 3.016 2.992 8.389-.018 1.082-.271 2.278-1.248 2.746a2.453 2.453 0 0 1-1.068.242 2.1 2.1 0 0 1-1.174-.335c-.7-.46-1.214-1.226-1.957-1.612a3.148 3.148 0 0 0-1.45-.353h-1.53c-.505 0-1.002.12-1.45.353-.743.386-1.257 1.153-1.957 1.612a2.1 2.1 0 0 1-1.174.335c-.406 0-.763-.097-1.068-.242-.976-.468-1.23-1.664-1.248-2.746-.09-5.373 1.166-7.741 2.992-8.39.292-.103.605-.122.915-.122h.47c.673 0 1.329.208 1.878.597ZM16.55 17.7V20m-1.15-1.15h2.3"
    />
    <Path
      fill="#444"
      d="M25.367 18.658a.575.575 0 1 1-1.15 0 .575.575 0 0 1 1.15 0ZM23.067 18.658a.575.575 0 1 1-1.15 0 .575.575 0 0 1 1.15 0ZM23.642 16.933a.575.575 0 1 1 0 1.15.575.575 0 0 1 0-1.15ZM23.642 19.233a.575.575 0 1 1 0 1.15.575.575 0 0 1 0-1.15Z"
    />
  </Svg>
);
