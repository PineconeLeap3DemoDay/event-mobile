import React, { useState } from 'react'
import { View, Image, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import {colors} from '../../../colors';
import { Favorite } from '../Icon';
import { responsiveHeight, responsiveWidth } from '../../utils/width';
import { formatEventDate } from '../../utils';
import { Event as Eventype } from '../../../typing';
import Heading from '../Heading';
import { useTheme } from '../../hooks';
import { useNavigation } from '@react-navigation/native';

interface IEventProps {
    event: Eventype
}
function EventRow({event}: IEventProps) {
    const [fillRule, setFillRule] = useState('evenodd');
    const {isDark} = useTheme();
    const navigation = useNavigation();
    function onClick() {
        setFillRule((prev: string) => prev === 'evenodd' ? '' : 'evenodd')
    }
    const startDate = formatEventDate(event.startDate);
    const styles = StyleSheet.create({
        container: {
            backgroundColor: isDark ? colors.dark.secondary: colors.silver, 
                width: responsiveWidth(365),
                height: Platform.OS === 'ios' ? responsiveHeight(120): responsiveHeight(120),
                borderRadius: 40,
                flexDirection: 'row',
                padding: responsiveWidth(12),
                gap: responsiveWidth(10),
                position: 'relative'
        },
        thumbnail: {
            height: Platform.OS === 'ios' ? responsiveHeight(100): responsiveHeight(120),
            width:responsiveWidth(120), 
            borderRadius: 20
        },
        descripContainer: {
            width: responsiveWidth(180), 
            gap: responsiveWidth(4)
        },
        favBtn: {
            position: 'absolute', 
            bottom: 20, 
            right: 20 
        }
    })
    function navigateToDetail() {
        navigation.navigate('EventDetail' as never, {eventid: event.id} as never)
    }
    return (
        <View style={styles.container}>
            {/* image */}
            <TouchableOpacity onPress={navigateToDetail}>
                <Image style={styles.thumbnail} source={{uri: event.thumbnail}}/>
            </TouchableOpacity>
            {/* description */}
             <View style={styles.descripContainer}>
                <Heading color='#F54768' fontFamily="Inter-Regular" p title={startDate}/>
                <Heading color={isDark ? colors.dark['text-secondary'] : colors.light['text-primary']} numberOfLines={2} fontFamily="Inter-Regular" h4 title='FoodieLand Night Market - San Mateo | May 26-28,2023'/>
                <Heading fontFamily='Inter-Regular' color={isDark ? colors.dark['text-primary'] : colors.light['text-secondary']} numberOfLines={2} h5 title="Ulaanbaatar, Mongolia Mongol shiltgeen"/>
            </View>
            {/* love icon */}
            <TouchableOpacity
                onPress={onClick}
                style={styles.favBtn}
            >
            <Favorite 
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