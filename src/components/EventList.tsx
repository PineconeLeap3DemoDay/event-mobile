import { View, FlatList } from 'react-native'
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
    cartDirection: 'column' | 'row',
    notFoundTitle: string
}

export default function EventList({ events, cartDirection, notFoundTitle }: EventListProps) {
    const {isDark} = useTheme()
    function renderItem({ item }: {item:EventType}) {
        return (
            <>
                {cartDirection === 'column' ? <EventCol event={item} /> : <EventRow event={item} />}
            </>
        )
    }
    function ListEmptyComponent() {
        return (
            <View style={{marginTop: responsiveHeight(40), flexDirection:'column', gap:2,justifyContent:'center',alignItems:'center'}}>
                <Heading color={isDark ? colors.dark['text-primary'] : 'black'} numberOfLines={2} h4 title={notFoundTitle}/>
            </View>
        )
    }
    
    return (
            <FlatList
            contentContainerStyle={{
                marginTop: responsiveHeight(24),
                gap: responsiveHeight(24),
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexGrow: 1,
            }}
            ListFooterComponent={() => {
                return(
                    <View style={{height: responsiveHeight(100)}}>
                    </View>
                )
            }}
            ListEmptyComponent={ListEmptyComponent}
            data={events}
            renderItem={renderItem}
        />
        
    )
}