import { View, Platform, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../colors'
import { responsiveHeight, responsiveWidth } from '../../utils/width'
import { Event as EventType } from '../../../typing'
import SvgSmallCalendar from '../Icon/smallCalendar'
import Button from '../Button'
import Heading from '../Heading'
import SmallFavorite from '../Icon/smallFavorite'
import { useNavigation } from '@react-navigation/native'
interface EventProps {
    event: EventType
}
// import { StackNavigationProp } from '@react-navigation/stack';

// export type RootStackParamList = {
//     EventDetail: { eventid: string };
// };
export default function EventCol({ event }: EventProps) {
    const [fillRule, setFillRule] = useState('evenodd');
    const navigation = useNavigation();
    const {height: windowHeight} = useWindowDimensions();
    function addToFavorite() {
        setFillRule((prev: string) => prev === 'evenodd' ? '' : 'evenodd')
    }
    function onEventPress(){
        navigation.navigate("EventDetail" as never, {eventid: event.id} as never)
    }    
    
    return (
        <View
            style={{
                backgroundColor: colors.silver,
                width: responsiveWidth(342),
                height: Platform.OS === 'ios' ? responsiveHeight(240) : responsiveHeight(240),
                borderRadius: 25,
                flexDirection: 'column',
                gap: responsiveWidth(10),
                position: 'relative',
            }}
        >
            {/* image */}
            <View style={{position:'absolute', top:0, left:0}}>
                <Image style={{width:responsiveWidth(342), height:Platform.OS === 'ios' ? responsiveHeight(240) : responsiveHeight(240), borderRadius: 20}} source={{ uri: event.thumbnail }} />
            </View>
            {/* heading */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(12), marginTop: responsiveHeight(12) }}>
                {/* event date */}
                <Button label='March 17' labelColor='white' onPress={onEventPress} style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", color: 'white' }} icon={SvgSmallCalendar} />
                {/* favorite button */}
                <Button
                    onPress={addToFavorite}
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                    <SmallFavorite fillRule={fillRule} />
                </Button>
            </View>
            {/* titles */}
            <View style={{bottom: responsiveHeight(24),marginLeft: responsiveWidth(24), position: 'absolute'}}>
                <Heading title={event.title} h3 color='white'/>
                <Heading title={event.location} h5 color={'#C7C9CF'} />
            </View>
        </View>
    )
}