import { DrawerContentScrollView} from '@react-navigation/drawer';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '../../../colors';
import { useTheme } from '../../hooks';
import { responsiveHeight, responsiveWidth } from '../../utils/width';
import Button from '../Button';
import { Close } from '../Icon';
import FirstDrawer from './FirstDrawerItem';
import SecondDrawer from './SecondDrawer';
import ThirdDrawer from './ThirdDrawer';
function CustomDrawer(props: any) {
    const [step, setStep] = useState(1);
    const { isDark, setTheme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            padding: responsiveWidth(24),
            position: 'relative',
        },
        drawerContainer: {
            padding: responsiveWidth(16),
            backgroundColor: isDark ? colors.dark.secondary : 'white',
            borderRadius: 8,
            width: responsiveWidth(342),
            minHeight: 'auto',
            gap: responsiveHeight(5)
        }
    });
    function forwardStep() {
        if (step === 1) {
            setStep(2)
        } else if (step === 2) {
            setStep(3)
        }
    }
    function backwardStep() {
        if (step === 3) {
            setStep(2)
        } else if (step === 2) {
            setStep(1)
        }
    }
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
                {step === 1 && <FirstDrawer />}
                {step === 2 && <SecondDrawer />}
                {step === 3 && <ThirdDrawer />}
            </DrawerContentScrollView>
        </SafeAreaView>
    )
}
