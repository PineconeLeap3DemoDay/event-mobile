import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import { responsiveHeight, responsiveWidth } from '../utils/width'
import Heading from './Heading'
interface ButtonProps {
    icon?: any,
    children?: React.ReactNode,
    selected?: boolean,
    onPress?: () => void,
    style?: any,
    label?: string,
    labelColor?: string,
    disabled?: boolean
}
export default function Button({ style,icon: Icon,disabled, labelColor,children, selected, onPress,label }: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[{
                backgroundColor: selected ? colors.secondary : colors.silver,
                borderRadius: 25,
                flexDirection: 'row',
                paddingVertical: responsiveHeight(10),
                paddingHorizontal: responsiveHeight(10),
                gap: responsiveWidth(6),
                justifyContent: 'center',
                alignItems: 'center',
                ...style
            },disabled && {backgroundColor:'#cccccc'}]}
            disabled={disabled}
            >
            {Icon && <Icon 
                        width={22} 
                        height={22} 
                        stroke={selected ? 'white' : colors.silver} 
                        fill={selected ? 'white' : colors.silver} 
                        strokeWidth={0.01}
                        />
            }
            {children && children}
            {label && <Heading p color={labelColor ? labelColor : 'silver'} title={label as string}/>}
        </TouchableOpacity>
    )
}