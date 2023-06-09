import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const Movie = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={24}
      fill="none"
    >
      <Path
        stroke={props.stroke}
        d="M5.367 11.233h9.2c1.445 0 2.168 0 2.617.45.45.449.45 1.171.45 2.617v.767c0 2.168 0 3.252-.674 3.926-.674.674-1.758.674-3.927.674H9.967c-2.169 0-3.253 0-3.927-.674-.673-.674-.673-1.758-.673-3.926v-3.834ZM5.368 11.233C4.997 9.85 4.81 9.157 4.97 8.562a2.3 2.3 0 0 1 .595-1.031c.436-.436 1.128-.622 2.512-.993l5.37-1.438c.515-.139.774-.208 1-.222a2.3 2.3 0 0 1 2.213 1.277c.1.203.17.462.307.978.047.172.07.258.075.333.02.31-.148.6-.426.738-.068.033-.154.056-.326.102L5.368 11.233Z"
      />
      <Path
        stroke={props.stroke}
        strokeLinecap="round"
        d="m13.57 5.055-.489 4.1M8.757 6.345l-.49 4.1M13.033 15.45c0-.324-.304-.542-.913-.979-.618-.442-.926-.664-1.156-.501-.23.162-.23.602-.23 1.48s0 1.318.23 1.48c.23.163.538-.059 1.156-.501.609-.437.913-.655.913-.979Z"
      />
    </Svg>
  )
};
