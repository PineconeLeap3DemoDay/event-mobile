import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
type Props = {
    children: React.ReactNode
}
export function Shadow({children}: Props) {
    const { width, height } = useWindowDimensions();
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.3)',
            position: 'absolute',
            zIndex: 10,
            width,
            height,
            top: -120,
            left: -31,
        }
    })
    return (
        <SafeAreaView style={styles.container}>
                {children}
        </SafeAreaView>
    )
}
