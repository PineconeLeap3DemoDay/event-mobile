import { View, SafeAreaView, Image, StyleSheet } from 'react-native'
import React from 'react'
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow'
import { padding, responsiveHeight } from '../utils'
import Heading from '../components/Heading'
import { colors } from '../../colors'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
const styles = StyleSheet.create({
    headerSection: {
        gap: 24,
        marginTop: responsiveHeight(57)
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        ...padding(115, 115, 115, 80),
    }
})
export function Auth() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <HeaderWithBackArrow />
            <View style={styles.headerSection}>
                <Heading h1 title='Та нэвтэрнэ үү' />
                <Heading fontWeight='400' fontFamily='Poppins-Regular' numberOfLines={2} color={colors.light['text-secondary']} h2 title='Log into the same account you used to buy your tickets.' />
            </View>
            <View style={styles.image}>
                <Image source={require('../asset/images/auth.png')} />
            </View>
            <View style={{ gap: responsiveHeight(16) }}>
                <Button 
                onPress={() => navigation.navigate('Signin' as never)}
                selected style={{ ...padding(0, 15, 0, 15), borderRadius: 5 }}>
                    <Heading
                        h2
                        color='white'
                        fontWeight='500'
                        title='Нэвтрэх'
                    />
                </Button>
                <Button
                    onPress={() => navigation.navigate('Signup' as never)}
                    style={{ ...padding(0, 15, 0, 15), borderRadius: 5, backgroundColor: '#FCEFF8' }}>
                    <Heading
                        h2
                        color={colors.secondary}
                        fontWeight='500'
                        title='Бүртгүүлэх'
                    />
                </Button>
            </View>
        </SafeAreaView>
    )
}