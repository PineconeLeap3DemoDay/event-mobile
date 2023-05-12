import { View, Platform, Image } from 'react-native'
import React from 'react'
import { colors } from '../../../colors'
import { responsiveHeight, responsiveWidth } from '../../utils/width'
import { Event as EventType } from '../../../typing'
import Button from '../Button'
import Heading from '../Heading'
import SmallFavorite from '../Icon/smallFavorite'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Save from '../Icon/save'
import useFavorite from '../../hooks/useFavorite'
interface EventProps {
    event: EventType
}

// import { StackNavigationProp } from '@react-navigation/stack';

// export type RootStackParamList = {
//     EventDetail: { eventid: string };
// };
 function EventCol({ event }: EventProps) {
    const {isThisUserFavoriteEvent, toggleFavorite} = useFavorite(event?.id);
    
    const navigation = useNavigation();
    function onEventPress() {
        console.log(isThisUserFavoriteEvent)
        // navigation.navigate("EventDetail" as never, { eventid: event.id } as never)
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
                            <SmallFavorite fill={'silver'} fillRule="evenodd" />
                    </Button>
                    <Button onPress={toggleFavorite} style={{ backgroundColor: 'transparent' }}>
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