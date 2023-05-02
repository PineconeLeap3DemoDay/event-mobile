import { TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import { responsiveHeight, responsiveWidth } from '../utils/width'
import Heading from './Heading'
interface CategoryBoxProps {
    icon?: any,
    label: string,
    selected?: boolean,
    onPress?: () => void,
    style?: any
}
export default function CategoryBox({ style,icon: Icon, label, selected, onPress }: CategoryBoxProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: selected ? colors.secondary : colors.silver,
                borderRadius: 25,
                flexDirection: 'row',
                minWidth: responsiveWidth(108),
                paddingVertical: responsiveHeight(10),
                paddingHorizontal: responsiveHeight(10),
                minHeight:responsiveHeight(50),
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
            />}
            <Heading color={selected ? 'white' : 'black'} h5 title={label}/>
        </TouchableOpacity>
    )
}