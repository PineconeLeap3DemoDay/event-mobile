import React from 'react'
import Button from './Button'
import useFavorite from '../hooks/useFavorite'
import { colors } from '../../colors'
import SmallFavoriteFill from './Icon/smallFavoriteFill'
import SmallFavoriteWithoutFill from './Icon/SmallFavoriteWithoutFill'
import { responsiveHeight, responsiveWidth } from '../utils'
import { Favorite } from './Icon'
import FavoriteBgFill from './Icon/FavoriteBgFilled'
import { ViewStyle } from 'react-native'
import { useTheme } from '../hooks'
type Props = {
    eventid: string,
    size?: 'small' | 'big',
    style?:ViewStyle
}
export default function FavoriteButton({ eventid, size, style }: Props) {
    const { toggleFavorite, isThisUserFavoriteEvent } = useFavorite(eventid);
    const {isDark} =  useTheme();
    if(size==='big') {
        return (
            <Button
            onPress={toggleFavorite}
            style={{
              borderRadius: 50,
              width: responsiveWidth(60),
              heigth: responsiveHeight(60),
              ...style
            }}
          >
            {isThisUserFavoriteEvent ?
              <FavoriteBgFill
              /> :
              <Favorite
                fillRule={'even'}
                width={25}
                height={24}
                fill={isDark ?'#686873': 'black'}
              /> }
          </Button>
        )
    }
    return (
        <Button onPress={toggleFavorite} style={{ backgroundColor: 'transparent', width: 20, height: 20,...style }}>
            {isThisUserFavoriteEvent ?
                <SmallFavoriteFill fill={colors.secondary} />
                :
                <SmallFavoriteWithoutFill />
            }
        </Button>
    )
}