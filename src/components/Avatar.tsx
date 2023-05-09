import { Image } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from '../utils'
interface Props {
    style?: any
}
export function Avatar({style}:Props) {
    return (
        <Image
            style={{ 
                width: responsiveWidth(80), 
                height: responsiveHeight(80), 
                borderRadius: 50,
                ...style
            }}
            source={{ uri: 'https://s3-alpha-sig.figma.com/img/41f6/e400/edf723a59cf9d8776fdb217071f3bb98?Expires=1684108800&Signature=g7Itl2pe59QcHoNZCtd-KQQ3sdNtc0K4t4iUgaYv46wolsImzgaa1rGXwEhUWyS5RbVB0mf5olPl7ldDA90VgyFOuC1GaABc7zPfWs1plg~N~U6om6B687WOMrvuaQ94E7Kw1pZBPrxDmXmTIAF7vWB8EKTdUVXo~tjdLO4~CJkgAtXa7HZbf5mcGpyj6IE~G7yb71DaKsC19yhC9R-~bRCGktCtGd4bW~DAzWhiI27zQZJ4Fp8rP5Jb~NjnJ340ZbuaHCgXwWveC7LCyOE1skEY5HFgDOZUPG3Caqp2eIU4oTI4khVkHMUo90xMC84P110c1pe1StTLu40BmYV-aw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' }} />
    )
}