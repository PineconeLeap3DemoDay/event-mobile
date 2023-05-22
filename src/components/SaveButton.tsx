import React from 'react';
import {colors} from '../../colors';
import useFavorite from '../hooks/useFavorite';
import Button from './Button';
import Save from './Icon/save';
import {useTheme} from '../hooks';
import {ViewStyle} from 'react-native';
type Props = {
  eventid: string;
  style?: ViewStyle;
};
export default function SaveButton({eventid, style}: Props) {
  const {toggleFavorite, isThisUserFavoriteEvent} = useFavorite(eventid);
  const {isDark} = useTheme();
  return (
    <Button
      onPress={toggleFavorite}
      style={{
        width: 23,
        height: 23,
        backgroundColor: 'transparent',
        ...style,
      }}>
      {!isThisUserFavoriteEvent ? (
        <Save fill={isDark ? '#686873' : 'black'} />
      ) : (
        <Save fill={colors.secondary} />
      )}
    </Button>
  );
}
