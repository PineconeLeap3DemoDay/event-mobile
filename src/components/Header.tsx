import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '../hooks'
import { responsiveHeight } from '../utils/width'
import { Badge } from './Badge'
import { Icon } from './Icon/Icon'
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