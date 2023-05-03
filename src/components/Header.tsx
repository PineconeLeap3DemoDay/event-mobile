import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from './Icon/Icon'
import { Badge } from './Badge'
import { responsiveHeight } from '../utils/width'
import { useTheme } from '../hooks'
import { colors } from '../../colors'
const styles = StyleSheet.create({
    header: {
        display: 'flex',
        height: responsiveHeight(31),
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    }
})
function Header() {
    const {isDark} = useTheme();
    return (
        <View style={styles.header}>
            <Icon name='Hamburgermenu' fill={isDark ? '#686873' : 'black'}/>
            <Badge />
        </View>
    )
}

export default Header