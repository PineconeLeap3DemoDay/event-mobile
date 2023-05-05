import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';


export default function HashTags({setIsOpen}: any) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    // variables
    const snapPoints = useMemo(() => ['30%', '70%'], []);
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        if(index === 0) {
            setIsOpen()
        }
    }, []);
    return (
            <BottomSheet
            backgroundStyle={{
                backgroundColor:'#FFFFFF'
            }}
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    }
});