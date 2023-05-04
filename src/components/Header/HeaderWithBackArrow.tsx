import { View } from 'react-native'
import React from 'react'
import Button from '../Button'
import { ArrowLeft } from '../Icon'
import { useNavigation } from '@react-navigation/native';

export default function HeaderWithBackArrow() {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'flex-start' }}>
            <Button
                onPress={() => navigation.goBack()}
                icon={ArrowLeft}
                style={{ zIndex: 12, paddingLeft:0.01,backgroundColor:'transparent'}} />
        </View>
    )
}