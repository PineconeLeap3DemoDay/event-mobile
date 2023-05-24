import {View, Platform, ImageBackground} from 'react-native';
import React from 'react';
import {colors} from '../../../colors';
import {responsiveHeight, responsiveWidth} from '../../utils/width';
import {Event as EventType} from '../../../typing';
import Button from '../Button';
import Heading from '../Heading';
import Save from '../Icon/save';
import {padding} from '../../utils';
import useFavorite from '../../hooks/useFavorite';
interface EventProps {
  event: EventType;
}
export default function SuggestedEvent({event}: EventProps) {
  const {toggleFavorite, isThisUserFavoriteEvent} = useFavorite(event?.id);
  if (!event) {
    return <View />;
  }
  return (
    <View
      style={{
        width: responsiveWidth(215),
        height:
          Platform.OS === 'ios' ? responsiveHeight(215) : responsiveHeight(215),
        marginRight: 10,
      }}>
      <ImageBackground
        imageStyle={{
          borderRadius: 8,
          width: responsiveWidth(215),
          position: 'relative',
          height:
            Platform.OS === 'ios'
              ? responsiveHeight(215)
              : responsiveHeight(215),
        }}
        source={{uri: event?.thumbnail}}>
        <Button
          onPress={toggleFavorite}
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: 10,
            borderRadius: 50,
            right: 10,
            zIndex: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}>
          <Save
            fill={isThisUserFavoriteEvent ? colors.secondary : 'black'}
            width={15}
            height={15}
          />
        </Button>
        <View
          style={{position: 'absolute', bottom: 0, ...padding(24, 0, 24, 10)}}>
          <Heading
            h2
            fontFamily="Inter-Bold"
            color="black"
            title={event?.title}
          />
          <Heading
            h4
            numberOfLines={1}
            color="#C7C9CF"
            title={`${event.city.name} ${event.country.name}`}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
