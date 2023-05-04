import { View, TextInput, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React, { useRef } from 'react'
import { useTheme } from '../hooks';
import { colors } from '../../colors';
import { padding, responsiveHeight, responsiveWidth } from '../utils';
import { Icon } from '../components/Icon/Icon';
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow';
import Input from '../components/Input';
import { Search } from '../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';
import EventList from '../components/EventList';
const GET_EVENTS = gql`
  query Events($arg: eventsQueryInput) {
  events(arg: $arg) {
    title
    id
    startDate
    thumbnail
    location
  }
}
`
export default function SearchScreen() {
    const { isDark } = useTheme();
    const userInput = useRef<string>('')
    const { data, refetch } = useQuery(GET_EVENTS, {
        variables: {
            arg: {
                "includes": "first"
            }
        }
    });
    console.log(data)
    function onChangeText(text: string) {
        userInput.current = text
    }
    function onEndEditing() {
        refetch({
            arg: {
                "includes": userInput?.current
            }
        })
    }
    const styles = StyleSheet.create({
        container: {
            ...padding(24, 10, 24, 24),
            height: Dimensions.get('screen').height,
        },
        input_container_in_light: {
            backgroundColor: colors.silver,
            marginTop: responsiveHeight(27),
            flexDirection: 'row',
            paddingTop: responsiveHeight(10),
            paddingLeft: responsiveWidth(10),
            paddingBottom: responsiveHeight(12),
            gap: responsiveWidth(10),
            borderRadius: 50,
        },
        input_container_in_dark: {
            backgroundColor: colors.dark.secondary,
            marginTop: responsiveHeight(27),
            flexDirection: 'row',
            paddingTop: responsiveHeight(10),
            paddingLeft: responsiveWidth(10),
            paddingBottom: responsiveHeight(12),
            gap: responsiveWidth(10),
            borderRadius: 50,
        },
        textInputStyle: {
            height: 'auto',
            color: isDark ? 'white' : '#686873'
        },
    });
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? colors.dark.primary : colors.white }}>
            <View style={styles.container}>
                <HeaderWithBackArrow />
                <Input
                    onChangeText={onChangeText}
                    onEndEditing={onEndEditing} icon={Search} placeholder='Хайх' 
                />
                <EventList notFoundTitle={'Таны хайсан эвэнт олдсонгүй'} events={data?.events} cartDirection='column'/>
            </View>
        </SafeAreaView>
    )
}