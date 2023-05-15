import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { create } from 'zustand';
import { colors } from '../../../colors';
import { useTheme } from '../../hooks';
import { responsiveHeight, responsiveWidth } from '../../utils/width';
import Button from '../Button';
import Heading from '../Heading';
import { Close } from '../Icon';
import { ArrowRight } from '../Icon/ArrowRight';
import { Icon } from '../Icon/Icon';
import ChangePassword from './ChangePassword';
import DrawerItem from './DrawerItem';
import FirstDrawer from './FirstDrawerItem';
import SecondDrawer from './SecondDrawer';
import ThirdDrawer from './ThirdDrawer';
import { useNavigation } from '@react-navigation/native';
type IUseStep = {
    step: number,
    setStep: (arg: number) => void
}
export const useStep = create<IUseStep>((set) => ({
    step: 1,
    setStep: (arg: number) => {
        set({ step: arg })
    }
}))
function CustomDrawer(props: any) {
    const { step } = useStep();
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
                {step === 1 && <FirstDrawer goBack={goBack}/>}
                {step === 2 && <SecondDrawer />}
                {step === 3 && <ThirdDrawer />}
                {step === 4 && <ChangePassword />}
                <DrawerItem style={{
                    backgroundColor: isDark ? colors.dark.secondary : 'white',
                    paddingHorizontal: 20,
                    width: responsiveWidth(340),
                    marginTop: responsiveHeight(380),
                    borderRadius: 8
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='Exit' fill='none' />
                        <Heading color={isDark ? colors.silver : 'black'} title='Гарах' />
                    </View>
                    <Button style={{ backgroundColor: 'transparent' }} icon={ArrowRight} />
                </DrawerItem>
            </DrawerContentScrollView>
        </SafeAreaView>
    )
}


export default CustomDrawer