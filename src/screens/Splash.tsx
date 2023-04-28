import { Text, SafeAreaView, Animated as RnAnimated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { colors } from '../../colors';
const SIZE = 50.0;

export default function Splash({setLoading}: any) {
    const x1 = useSharedValue(160);
    const y1 = useSharedValue(40);
    const x2 = useSharedValue(0);
    const y2 = useSharedValue(150);
    const x3 = useSharedValue(250);
    const y3 = useSharedValue(150);
    const x4 = useSharedValue(150);
    const y4 = useSharedValue(-140);
    let opacity = useRef(new RnAnimated.Value(-200)).current;

    const topItem = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: x1.value },
                { translateY: y1.value },
            ],
        };
    }, []);
    const leftItem = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: x2.value },
                { translateY: y2.value },
            ],
        };
    }, []);
    const rightItem = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: x3.value },
                { translateY: y3.value },
            ],
        };
    }, []);

    useEffect(() => {
        x1.value = withTiming(120, { duration: 1000 });
        y1.value = withTiming(170, { duration: 2000 });
        x2.value = withTiming(100, { duration: 1000 });
        y2.value = withTiming(150, { duration: 3000 });
        x3.value = withTiming(145, { duration: 1000 });
        y3.value = withTiming(90, { duration: 3000 });
        x4.value = withTiming(145, { duration: 2000 });
        y4.value = withTiming(70, { duration: 2000 });
        RnAnimated.spring(
            opacity, {
            toValue: 50,
            friction: 5,
            useNativeDriver: true,
            delay: 2000
        }
        ).start();
        setTimeout(() => {
            setLoading(false);
        },3000)
    }, []);

    return (
        <SafeAreaView >
            <Animated.View
                style={[
                    { height: SIZE, width: SIZE, backgroundColor: colors.secondary, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
                    topItem,
                ]}
            />
            <Animated.View
                style={[
                    { height: SIZE, width: SIZE, backgroundColor: '#FBEB5A', borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
                    leftItem,
                ]}
            />
            <Animated.View
                style={[
                    { height: SIZE, width: SIZE, backgroundColor: '#FCEFF8', borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
                    rightItem,
                ]}
            />
            <RnAnimated.View style={{
                transform: [
                    { translateY: opacity }, { translateX: 150 }
                ]
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>UB Events</Text>
            </RnAnimated.View>
        </SafeAreaView>
    );
}