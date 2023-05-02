import React, { useState } from 'react'
import { View, Image, Platform, TouchableOpacity } from 'react-native'
import {colors} from '../../../colors';
import { SvgFavorite } from '../Icon';
import { responsiveHeight, responsiveWidth } from '../../utils/width';
import { formatEventDate } from '../../utils';
import { Event as Eventype } from '../../../typing';
import Heading from '../Heading';

interface IEventProps {
    event: Eventype
}
function EventRow({event}: IEventProps) {
    const [fillRule, setFillRule] = useState('evenodd');
    function onClick() {
        setFillRule((prev: string) => prev === 'evenodd' ? '' : 'evenodd')
    }
    const startDate = formatEventDate(event.startDate);
    return (
        <View 
            style={{
                backgroundColor: colors.silver, 
                width: responsiveWidth(365),
                height: Platform.OS === 'ios' ? responsiveHeight(120): responsiveHeight(120),
                borderRadius: 50,
                flexDirection: 'row',
                padding: responsiveWidth(10),
                gap: responsiveWidth(10),
                position: 'relative'
            }}
        >
            {/* image */}
            <View className='w-auto h-full'>
                <Image className='w-[120px] h-full rounded-[20px]' source={{uri: event.thumbnail}}/>
            </View>
            {/* description */}
             <View style={{width: responsiveWidth(180), gap: responsiveWidth(4)}}>
                <Heading color='#F54768' p title={startDate}/>
                <Heading fontFamily="Roboto" h6 title={event.title}/>
                <Heading fontFamily='Roboto' color={colors['text-silver']} numberOfLines={2} p title={event.location}/>
            </View>
            {/* love icon */}
            <TouchableOpacity
                onPress={onClick}
                style={{position: 'absolute', bottom: 20, right: 20}}
            >
            <SvgFavorite 
                fillRule={fillRule}
                width={25} 
                height={24} 
                fill={colors.secondary}
            />
            </TouchableOpacity>
        </View>
    )
}

export default EventRow