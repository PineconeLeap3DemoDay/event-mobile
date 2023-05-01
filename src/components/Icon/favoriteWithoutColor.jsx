import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const SvgFavorite = ({fill, width, height, fillRule,...props}) => {
  return(
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={22}
      className='text-[12px]'
      >
      <Path
        fill={fill}
        fillRule={fillRule}
        d="M5.485 2.49c-1.89.864-3.275 2.92-3.276 5.37 0 2.505 1.025 4.435 2.494 6.089 1.21 1.363 2.676 2.493 4.105 3.595.34.261.677.522 1.009.783.6.472 1.134.887 1.65 1.188.515.302.93.44 1.283.44.353 0 .768-.138 1.284-.44.515-.3 1.05-.716 1.65-1.188.33-.261.668-.522 1.008-.783 1.429-1.102 2.894-2.232 4.105-3.595 1.469-1.654 2.494-3.584 2.494-6.088 0-2.451-1.385-4.507-3.276-5.37-1.836-.84-4.304-.618-6.65 1.818a.855.855 0 0 1-1.23 0C9.788 1.873 7.32 1.651 5.484 2.49Zm7.265.04C10.115.172 7.165-.157 4.774.935 2.25 2.09.5 4.77.5 7.861c0 3.037 1.265 5.354 2.925 7.223 1.329 1.496 2.955 2.748 4.392 3.855.325.25.641.494.942.73.583.46 1.21.951 1.845 1.322.635.371 1.36.673 2.146.673.787 0 1.511-.302 2.146-.673.635-.37 1.262-.861 1.845-1.322.3-.236.617-.48.942-.73 1.437-1.107 3.063-2.359 4.392-3.855C23.735 13.215 25 10.898 25 7.86c0-3.09-1.749-5.771-4.274-6.926C18.335-.157 15.385.172 12.75 2.53Z"
      />
    </Svg>
  );
}

