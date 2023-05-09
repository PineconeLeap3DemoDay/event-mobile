import { View, Platform, Image } from 'react-native'
import React, { useCallback } from 'react'
import { colors } from '../../../colors'
import { responsiveHeight, responsiveWidth } from '../../utils/width'
import { Event, Event as EventType } from '../../../typing'
import Button from '../Button'
import Heading from '../Heading'
import SmallFavorite from '../Icon/smallFavorite'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useGraphql from '../../hooks/useGraphql'
import { useQuery } from '@apollo/client'
import { GET_FAVORITES } from '../../graphql'
import { useAuth } from '../../context/AuthProvider'
import Save from '../Icon/save'
interface EventProps {
    event: EventType
}

// import { StackNavigationProp } from '@react-navigation/stack';

// export type RootStackParamList = {
//     EventDetail: { eventid: string };
// };
 function EventCol({ event }: EventProps) {
    const { token } = useAuth();
    const { addFavorite, deleteFavorite } = useGraphql();
    const { data: favorites } = useQuery(GET_FAVORITES, {
        context: {
            headers: { Authorization: token }
        }
    })
    const navigation = useNavigation();
    const isThisUserFavoriteEvent = favorites?.getUser?.favorites?.
        findIndex((favorite: Event) => favorite?.id === event.id) !== -1;

    const toggleSave = useCallback(() => {
        if (isThisUserFavoriteEvent) {
            deleteEventAsFavorite()
        } else {
            addEventAsFavorite();
        }
    }, [isThisUserFavoriteEvent,addEventAsFavorite,deleteEventAsFavorite])

    function onEventPress() {
        navigation.navigate("EventDetail" as never, { eventid: event.id } as never)
    }
    function addEventAsFavorite() {
        addFavorite({ variables: { eventId: event.id } })
    }
    function deleteEventAsFavorite() {
        deleteFavorite({ variables: { eventId: event.id } })
    }
    return (
        <View
            style={{
                width: responsiveWidth(342),
                height: Platform.OS === 'ios' ? responsiveHeight(112) : responsiveHeight(112),
                borderRadius: 8,
                flexDirection: 'row',
                gap: responsiveWidth(10),
                position: 'relative',
            }}
        >
            {/* image */}
            <TouchableOpacity onPress={onEventPress}>
                <Image style={{ width: responsiveWidth(127), height: Platform.OS === 'ios' ? responsiveHeight(112) : responsiveHeight(112), borderRadius: 8 }} source={{ uri: event.thumbnail }} />
            </TouchableOpacity>
            <View style={{ gap: 8 }}>
                <Heading h3 title={event.title} />
                <Heading h5 color="#C7C9CF" fontFamily='Inter-Medium' title={event.location} />
                <Heading h5 color={colors.secondary} fontFamily='Inter-Regular' title={'May 25, 2023 at 10:30PM'} />
                <View style={{ flexDirection: 'row' }}>
                    <Button style={{ backgroundColor: 'transparent' }}>
                        {/* {!isThisUserFavoriteEvent ?
                            <SmallFavorite fill="#303133" fillRule="evenodd" />
                            : */}
                            <SmallFavorite fill={colors.primary} fillRule="evenodd" />
                        {/* } */}
                    </Button>
                    <Button onPress={toggleSave} style={{ backgroundColor: 'transparent' }}>
                        {!isThisUserFavoriteEvent ?
                            <Save fill={colors.primary} />
                            :
                            <Save fill={colors.secondary} />
                        }
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default React.memo(EventCol)