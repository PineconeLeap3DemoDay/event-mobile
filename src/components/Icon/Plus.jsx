import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Plus = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
            <Path
                fill="#545353"
                d="M5.346 1.464a.75.75 0 1 0-1.5 0V4.25H1.061a.75.75 0 1 0 0 1.5h2.785v2.786a.75.75 0 0 0 1.5 0V5.75h2.786a.75.75 0 0 0 0-1.5H5.346V1.464Z"
            />
        </Svg>
    )
}
