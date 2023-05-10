import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import { responsiveHeight, responsiveWidth } from '../utils/width'
import Heading from './Heading'
import { useTheme } from '../hooks'
interface CategoryBoxProps {
    iconname?: any,
    label: string,
    selected?: boolean,
    onPress?: () => void,
    style?: any
}
export default function CategoryBox({ style, label, selected, onPress }: CategoryBoxProps) {
    const {isDark} = useTheme()
    
    const styles = StyleSheet.create({
        container_in_light: {
            backgroundColor: selected ? colors.secondary : colors.silver,
            borderRadius: 8,
            flexDirection: 'row',
            minWidth: responsiveWidth(108),
            paddingVertical: responsiveHeight(10),
            paddingHorizontal: responsiveHeight(10),
            height:responsiveHeight(43),
            gap: responsiveWidth(6),
            justifyContent: 'center',
            alignItems: 'center',
            ...style
        },
        container_in_dark: {
            backgroundColor: selected ? colors.secondary : colors.dark.primary,
            borderRadius: 8,
            flexDirection: 'row',
            minWidth: responsiveWidth(108),
            paddingVertical: responsiveHeight(10),
            paddingHorizontal: responsiveHeight(10),
            minHeight:responsiveHeight(43),
            gap: responsiveWidth(6),
            justifyContent: 'center',
            alignItems: 'center',
            ...style
        },
    })
    return (
        <TouchableOpacity
            onPress={onPress}
            style={isDark ? styles.container_in_dark : styles.container_in_light}
            >
            <Heading color={isDark ? (selected ? 'white' : '#686873') : (selected ? 'white' : '#C7C9CF')} p title={label}/>
        </TouchableOpacity>
    )
}