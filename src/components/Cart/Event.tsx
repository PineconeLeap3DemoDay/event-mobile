import React, { useState } from 'react'
import { View, Text, Image, Platform, TouchableOpacity } from 'react-native'
import {colors} from '../../../colors';
import { SvgFavorite } from '../Icon';
import { responsiveHeight, responsiveWidth } from '../../utils/width';
import { formatEventDate } from '../../utils';
export interface Event {
    title: string
    id: string
    about: string
    location: number
    thumbnail: string,
    startDate:  number
  }
interface IEventProps {
    event: Event
}
function Event({event}: IEventProps) {
    const [fillRule, setFillRule] = useState('evenodd')
    function onClick() {
        setFillRule((prev: string) => prev === 'evenodd' ? '' : 'evenodd')
    }
    const startDate = formatEventDate(event.startDate);
    return (
        <View 
            style={{
                backgroundColor: colors.silver, 
                width: responsiveWidth(365),
                height: Platform.OS === 'ios' ? responsiveHeight(150): responsiveHeight(120),
                borderRadius: 25,
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
                <Text style={{fontFamily: 'Roboto-Light',lineHeight: 12,fontStyle: 'normal', color: '#F54768', fontSize: 10}} numberOfLines={1}>{startDate}</Text>
                <Text style={{fontFamily: 'Roboto-Light',lineHeight: 14,fontStyle: 'normal', fontSize: 13}} numberOfLines={1} >
                FoodieLand Night Market - San Mateo | May 26-28,2023
                </Text>
                <Text style={{fontFamily: 'Roboto-Light',lineHeight: 12,fontStyle: 'normal', fontSize: 10}} numberOfLines={2} className='text-[#C7C9CF] text-[12px]'>
                Ulaanbaatar, Mongolia Mongol shiltgeen
                </Text>
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

export default Event