import { View, Text, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../colors'
import { responsiveHeight, responsiveWidth } from '../../utils/width'
import { Event as EventType } from '../../../typing'
import SvgSmallCalendar from '../Icon/smallCalendar'
import Button from '../Button'
import Heading from '../Heading'
import SmallFavorite from '../Icon/smallFavorite'
interface EventProps {
    event: EventType
}
export default function EventCol({ event }: EventProps) {
    const [fillRule, setFillRule] = useState('evenodd');
    function addToFavorite() {
        setFillRule((prev: string) => prev === 'evenodd' ? '' : 'evenodd')
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
            <View className='absolute top-0 left-0 w-full h-full'>
                <Image className='w-full h-full rounded-[20px]' source={{ uri: event.thumbnail }} />
            </View>
            {/* heading */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(12), marginTop: responsiveHeight(12) }}>
                {/* event date */}
                <Button style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", color: 'white' }} icon={SvgSmallCalendar}>
                    <Heading color='white' p title='March 17' />
                </Button>
                {/* favorite button */}
                <Button
                    onPress={addToFavorite}
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                    <SmallFavorite fillRule={fillRule} />
                </Button>
            </View>
            {/* titles */}
            <View style={{bottom: responsiveHeight(24),marginLeft: responsiveWidth(24), position: 'absolute'}}>
                <Heading title={event.title} h6 color='white'/>
                <Heading title={event.location} p color={colors['text-silver']} />
            </View>
        </View>
    )
}