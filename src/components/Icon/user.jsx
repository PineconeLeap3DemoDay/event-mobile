import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const SvgUser = ({ fill, width, height, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}>
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M8.75.089a5.056 5.056 0 1 0 0 10.113 5.056 5.056 0 0 0 0-10.113ZM5.29 5.145a3.46 3.46 0 1 1 6.92 0 3.46 3.46 0 0 1-6.92 0ZM8.75 11.799c-2.17 0-4.176.5-5.665 1.352C1.618 13.989.5 15.269.5 16.855c0 1.586 1.118 2.866 2.585 3.704 1.49.851 3.494 1.352 5.665 1.352 2.17 0 4.175-.5 5.665-1.352C15.882 19.721 17 18.441 17 16.855c0-1.586-1.118-2.866-2.585-3.704-1.49-.851-3.494-1.352-5.665-1.352Zm-6.653 5.056c0-.766.55-1.615 1.78-2.318 1.207-.69 2.928-1.142 4.873-1.142 1.944 0 3.666.452 4.873 1.142 1.23.703 1.78 1.552 1.78 2.318s-.55 1.615-1.78 2.318c-1.207.69-2.928 1.142-4.873 1.142-1.945 0-3.666-.452-4.873-1.142-1.23-.703-1.78-1.552-1.78-2.318Z"
      clipRule="evenodd"
    />
  </Svg>
);

