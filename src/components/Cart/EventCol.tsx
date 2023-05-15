import { View, Platform, Image } from 'react-native'
import React from 'react'
import { colors } from '../../../colors'
import { responsiveHeight, responsiveWidth } from '../../utils/width'
import { Event as EventType } from '../../../typing'
import Heading from '../Heading'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useFavorite from '../../hooks/useFavorite'
import FavoriteButton from '../FavoriteButton'
import { padding } from '../../utils'
import SaveButton from '../SaveButton'
interface EventProps {
    event: EventType
}

// import { StackNavigationProp } from '@react-navigation/stack';

// export type RootStackParamList = {
//     EventDetail: { eventid: string };
// };
 function EventCol({ event }: EventProps) {
    const navigation = useNavigation();
    function onEventPress() {
        navigation.navigate("EventDetail" as never, { eventid: event.id } as never)
    }
    return (
        <View
            style={{
                width: responsiveWidth(342),
                height: Platform.OS === 'ios' ? responsiveHeight(130) : responsiveHeight(130),
                borderRadius: 8,
                flexDirection: 'row',
                gap: responsiveWidth(16),
                position: 'relative',
            }}
        >
            {/* image */}
            <TouchableOpacity onPress={onEventPress}>
                <Image style={{ width: responsiveWidth(127), height: Platform.OS === 'ios' ? responsiveHeight(130) : responsiveHeight(130), borderRadius: 8 }} source={{ uri: event.thumbnail }} />
            </TouchableOpacity>
            <View>
                <Heading h3 title={event.title} />
                <Heading h5 style={{...padding(0,4,0,0)}} color="#C7C9CF" fontFamily='Inter-Medium' title={'Ulaanbaatar, Mongolia'} />
                <Heading h5 style={{...padding(0,6,0,0)}}  color={colors.secondary} fontFamily='Inter-Regular' title={'May 25, 2023 at 10:30PM'} />
                <View style={{flexDirection:'row',gap: responsiveWidth(2),...padding(0,6,0,0)}}>
                    <SaveButton eventid={event.id}/>
                    <FavoriteButton size='small' eventid={event.id}/>
                </View>
            </View>
        </View>
    )
}

export default React.memo(EventCol)