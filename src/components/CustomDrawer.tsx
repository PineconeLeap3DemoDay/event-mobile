import { DrawerContentScrollView } from '@react-navigation/drawer'
import React from 'react'
import { SafeAreaView, View, Switch, StyleSheet } from 'react-native';
import Button from './Button';
import { Close } from './Icon';
import { responsiveHeight, responsiveWidth } from '../utils/width';
import { Icon } from './Icon/Icon';
import Heading from './Heading';
import { colors } from '../../colors';
import { useTheme } from '../hooks';
function CustomDrawer(props: any) {
    const {isDark, setTheme} = useTheme();
    const styles = StyleSheet.create({
        container: {
            padding:responsiveWidth(24),
            position: 'relative',
        }
    });
    function toggleTheme() {
        setTheme(!isDark)
    }
    function goBack() {
        props.navigation.closeDrawer()
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView style={styles.container} {...props}>
                <Button onPress={goBack} style={{ backgroundColor: 'transparent', position: 'absolute', top: 0, left: 0 }} icon={Close} />
                <View style={{padding: responsiveWidth(16), width: responsiveWidth(342), height: responsiveHeight(192)}}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', height:responsiveHeight(48)}}>
                        <Icon name='Sun' fill='none'/>
                        <Heading color={isDark ?colors.silver: 'black'} title='DarkMode'/>
                        <Switch 
                        thumbColor={colors.silver} 
                        trackColor={{false: 'red', true: colors.secondary} } 
                        onChange={toggleTheme}
                        value={isDark}/>
                    </View>
                </View>
            </DrawerContentScrollView>
        </SafeAreaView>
    )
}

export default CustomDrawer