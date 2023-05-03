import { View, FlatList, useWindowDimensions } from 'react-native'
import React from 'react'
import { responsiveHeight } from '../utils/width'
import { Event as EventType } from '../../typing'
import EventCol from './Cart/EventCol'
import EventRow from './Cart/EventRow'
import Heading from './Heading'
import { colors } from '../../colors'
import { useTheme } from '../hooks'


interface EventListProps {
    events: EventType[],
    cartDirection: 'column' | 'row'
}

export default function EventList({ events, cartDirection }: EventListProps) {
    const {height} = useWindowDimensions();
    const {isDark} = useTheme()
    function renderItem({ item }: any) {
        return (
            <>
                {cartDirection === 'column' ? <EventCol event={item} /> : <EventRow event={item} />}
            </>
        )
    }
    function ListEmptyComponent() {
        return (
            <View style={{marginTop: responsiveHeight(40)}} className="flex flex-col gap-2 justify-center items-center">
                <Heading color={isDark ? colors.dark['text-primary'] : 'black'} numberOfLines={2} h4 title='Одоогоор энэхүү категорид эвэнт байхгүй байна'/>
            </View>
        )
    }
    return (
        <FlatList
            style={{
                flexGrow: 0.8
            }}
            contentContainerStyle={{
                marginTop: responsiveHeight(24),
                gap: responsiveHeight(24),
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: height - 300
            }}
            ListEmptyComponent={ListEmptyComponent}
            data={events}
            renderItem={renderItem}
        />
    )
}