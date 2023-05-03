import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import { responsiveHeight, responsiveWidth } from '../utils/width'
interface ButtonProps {
    icon?: any,
    children?: React.ReactNode,
    selected?: boolean,
    onPress?: () => void,
    style?: any
}
export default function Button({ style,icon: Icon, children, selected, onPress }: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: selected ? colors.secondary : colors.silver,
                borderRadius: 25,
                flexDirection: 'row',
                paddingVertical: responsiveHeight(10),
                paddingHorizontal: responsiveHeight(10),
                gap: responsiveWidth(6),
                justifyContent: 'center',
                alignItems: 'center',
                ...style
            }}
            >
            {Icon && <Icon 
                        width={22} 
                        height={22} 
                        stroke={selected ? 'white' : colors['text-silver']} 
                        fill={selected ? 'white' : colors['text-silver']} 
                        strokeWidth={0.01}
                        />
            }
            {children}
        </TouchableOpacity>
    )
}