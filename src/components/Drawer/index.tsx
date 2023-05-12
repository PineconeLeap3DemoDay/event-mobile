import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '../../../colors';
import { useTheme } from '../../hooks';
import { responsiveHeight, responsiveWidth } from '../../utils/width';
import Button from '../Button';
import { Close } from '../Icon';
import ThirdDrawer from './ThirdDrawer';
import { create } from 'zustand';
import FirstDrawer from './FirstDrawerItem';
import SecondDrawer from './SecondDrawer';
import ChangePassword from './ChangePassword';
type IUseStep = {
    step: number,
    setStep: (arg: number) => void
}
export const useStep = create<IUseStep>((set) => ({
    step: 1,
    setStep: (arg: number) => {
        console.log(arg);
        set({step: arg})
    }
}))
function CustomDrawer(props: any) {
    const {step} = useStep();
    const { isDark } = useTheme();
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
                {step === 4 && <ChangePassword />}
            </DrawerContentScrollView>
        </SafeAreaView>
    )
}


export default CustomDrawer