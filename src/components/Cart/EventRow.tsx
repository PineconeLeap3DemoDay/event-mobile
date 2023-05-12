import React, { useState } from 'react'
import { View, Image, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../../../colors';
import { Favorite } from '../Icon';
import { responsiveHeight, responsiveWidth } from '../../utils/width';
import { formatEventDate } from '../../utils';
import { Event as Eventype } from '../../../typing';
import Heading from '../Heading';
import { useTheme } from '../../hooks';
import { useNavigation } from '@react-navigation/native';
import useFavorite from '../../hooks/useFavorite';
import Button from '../Button';
import Save from '../Icon/save';

interface IEventProps {
    event: Eventype
}
function EventRow({ event }: IEventProps) {
    const [fillRule, setFillRule] = useState('evenodd');
    const { isDark } = useTheme();
    const navigation = useNavigation();
    const { isThisUserFavoriteEvent, toggleFavorite } = useFavorite(event?.id);
    function onClick() {
        setFillRule((prev: string) => prev === 'evenodd' ? '' : 'evenodd')
    }
    const startDate = formatEventDate(event.startDate);
    const styles = StyleSheet.create({
        container: {
            backgroundColor: isDark ? colors.dark.secondary : colors.silver,
            width: responsiveWidth(365),
            height: Platform.OS === 'ios' ? responsiveHeight(120) : responsiveHeight(120),
            borderRadius: 8,
            flexDirection: 'row',
            padding: responsiveWidth(12),
            gap: responsiveWidth(10),
            position: 'relative'
        },
        thumbnail: {
            height: Platform.OS === 'ios' ? responsiveHeight(100) : responsiveHeight(120),
            width: responsiveWidth(120),
            borderRadius: 8
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
        navigation.navigate('EventDetail' as never, { eventid: event.id } as never)
    }
    return (
        <View style={styles.container}>
            {/* image */}
            <TouchableOpacity onPress={navigateToDetail}>
                <Image style={styles.thumbnail} source={{ uri: event.thumbnail }} />
            </TouchableOpacity>
            {/* description */}
            <View style={styles.descripContainer}>
                <Heading color='#F54768' p title={startDate} />
                <Heading color={isDark ? colors.dark['text-secondary'] : colors.light['text-primary']} numberOfLines={2} title='FoodieLand Night Market - San Mateo | May 26-28,2023' />
                <Heading color={isDark ? colors.dark['text-primary'] : colors.light['text-secondary']} numberOfLines={2} h5 title="Ulaanbaatar, Mongolia Mongol shiltgeen" />
            </View>
            {/* love icon */}
            <Button onPress={toggleFavorite} style={{ 
                backgroundColor: 'transparent',
                bottom: -60,
                left: -20
                }}>
                {!isThisUserFavoriteEvent ?
                    <Save fill={colors.primary} />
                    :
                    <Save fill={colors.secondary} />
                }
            </Button>
        </View>
    )
}

export default EventRow