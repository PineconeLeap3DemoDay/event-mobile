import { responsiveWidth } from "./width"

export function padding(
    left: number,
    top: number,
    right: number,
    bottom: number
) {
    return {
        paddingLeft: responsiveWidth(left),
        paddingTop: responsiveWidth(top),
        paddingRight: responsiveWidth(right),
        paddingBottom: responsiveWidth(bottom),
    }
}