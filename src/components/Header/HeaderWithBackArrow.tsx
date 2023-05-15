import { View, ViewStyle } from 'react-native'
import React from 'react'
import Button from '../Button'
import { ArrowLeft } from '../Icon'
import { useNavigation } from '@react-navigation/native';
type Props = {
    style?: ViewStyle
}
export default function HeaderWithBackArrow({style}: Props) {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'flex-start',...style }}>
            <Button
                onPress={() => navigation.goBack()}
                icon={ArrowLeft}
                style={{ zIndex: 12, paddingLeft:0.01,backgroundColor:'transparent'}} />
        </View>
    )
}