import { Text, SafeAreaView, Animated as RnAnimated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'

import { colors } from '../../colors';
import { responsiveWidth } from '../utils/width';
const SIZE = responsiveWidth(50.0);

export default function Splash({setLoading}: any) {
    let leftItem = useRef(new RnAnimated.ValueXY({x: 60, y:140})).current;
    let textItem = useRef(new RnAnimated.Value(-200)).current;
    let rightItem = useRef(new RnAnimated.ValueXY({x: 250, y:100})).current;
    let topItem = useRef(new RnAnimated.ValueXY({x: 160, y:40})).current;
    
    useEffect(() => {
        RnAnimated.timing(
            topItem, {
            toValue: {x: 120, y: 170},
            useNativeDriver: true,
            delay: 1500,
            easing: Easing.linear
        }
        ).start();
        RnAnimated.timing(
            rightItem, {
            toValue: {x: 135, y: 100},
            useNativeDriver: true,
            delay: 1500,
            easing: Easing.linear
        }
        ).start();
        RnAnimated.timing(
            leftItem, {
            toValue: {x: 100, y: 150},
            useNativeDriver: true,
            delay: 1500,
            easing: Easing.linear
        }
        ).start();
        RnAnimated.spring(
            textItem, {
            toValue: 65,
            friction: 5,
            useNativeDriver: true,
            delay: 2000
        }
        ).start();
        setTimeout(() => {
            setLoading(false)
        },4000);
    }, []);

    return (
        <SafeAreaView >
            <RnAnimated.View
                style={[
                    { height: SIZE, width: SIZE, backgroundColor: colors.secondary, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
                    {transform: [{
                        translateX: topItem.x,
                    }, {translateY: topItem.y}]}
                ]}
            />
            <RnAnimated.View
                style={[
                    { height: SIZE, width: SIZE, backgroundColor: '#FBEB5A', borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
                    {transform: [{
                        translateX: leftItem.x,
                    }, {translateY: leftItem.y}]}
                ]}
            />
            <RnAnimated.View
                style={[
                    { height: SIZE, width: SIZE, backgroundColor: '#FCEFF8', borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
                    {transform: [{
                        translateX: rightItem.x,
                    }, {translateY: rightItem.y}]}
                ]}
            />
            <RnAnimated.View style={{
                transform: [
                    { translateY: textItem }, { translateX: 150 }
                ]
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>UB Events</Text>
            </RnAnimated.View>
        </SafeAreaView>
    );
}