import { View, Platform, ImageBackground } from 'react-native'
import React, { useCallback } from 'react'
import { colors } from '../../../colors'
import { responsiveHeight, responsiveWidth } from '../../utils/width'
import { Event, Event as EventType } from '../../../typing'
import Button from '../Button'
import Heading from '../Heading'
import useGraphql from '../../hooks/useGraphql'
import { useQuery } from '@apollo/client'
import { GET_FAVORITES } from '../../graphql'
import { useAuth } from '../../context/AuthProvider'
import Save from '../Icon/save'
import { padding } from '../../utils'
interface EventProps {
    event: EventType
}
export default function SuggestedEvent({ event }: EventProps) {
    const { token } = useAuth();
    const { addFavorite, deleteFavorite } = useGraphql();
    const { data: favorites } = useQuery(GET_FAVORITES, {
        context: {
            headers: { Authorization: token }
        }
    })
    const isThisUserFavoriteEvent = favorites?.getUser?.favorites?.
        findIndex((favorite: Event) => favorite?.id === event.id) !== -1;

    const toggleSave = useCallback(() => {
        if (isThisUserFavoriteEvent) {
            deleteEventAsFavorite()
        } else {
            addEventAsFavorite();
        }
    }, [isThisUserFavoriteEvent, addEventAsFavorite, deleteEventAsFavorite])
   
    function addEventAsFavorite() {
        addFavorite({ variables: { eventId: event.id } })
    }
    function deleteEventAsFavorite() {
        deleteFavorite({ variables: { eventId: event.id } })
    }
    if (!event) return <View></View>
    return (
        <View style={{
            width: responsiveWidth(215),
            height: Platform.OS === 'ios' ? responsiveHeight(215) : responsiveHeight(215),
            marginRight: 10,
        }}>
            <ImageBackground
                imageStyle={{
                    borderRadius: 8, width: responsiveWidth(215),
                    position: 'relative',
                    height: Platform.OS === 'ios' ? responsiveHeight(215) : responsiveHeight(215),
                }}
                source={{ uri: event?.thumbnail }}>
                <Button
                    onPress={toggleSave}
                    style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 10, borderRadius: 50, right: 10, zIndex: 12, backgroundColor: 'rgba(255, 255, 255, 0.5)' }} >
                    <Save
                        fill={
                            isThisUserFavoriteEvent ? colors.secondary : 'black'
                        } width={15} height={15} />
                </Button>
                <View style={{ position: 'absolute', bottom: 0, ...padding(24, 0, 24, 10) }}>
                    <Heading h2 fontFamily='Inter-Bold' color='white' title={event?.title} />
                    <Heading h4 numberOfLines={1} color='#C7C9CF' title={event?.location} />
                </View>
            </ImageBackground>
        </View>
    )
}