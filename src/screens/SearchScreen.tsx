import { gql, useQuery } from '@apollo/client';
import React, { createContext, useRef } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from '../../colors';
import Categories from '../components/Categories';
import AnotherTestDropDown from '../components/Dropdown/AnotherTestDropDown';
import Dropdown from '../components/Dropdown/Dropdown';
import TestDropdown from '../components/Dropdown/TestDropdown';
import EventList from '../components/EventList';
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow';
import { Search } from '../components/Icon';
import Input from '../components/Input';
import { useTheme } from '../hooks';
import useSelectedCategory from '../hooks/useCategory';
import useDay from '../hooks/useDay';
import { useSearch } from '../hooks/useSearch';
import { padding, responsiveHeight, responsiveWidth } from '../utils';
export const SearchContext = createContext<any>(null);


const GET_EVENT = gql`
query Events($arg: eventsQueryInput) {
  events(arg: $arg) {
    title
    _id
    thumbnail
  }
}
`

export function SearchScreen() {
    const { isDark } = useTheme();
    const userInput = useRef<string>('');
    const { category } = useSelectedCategory();
    const {
        today,
    } = useDay();

    const { to, country, city } = useSearch();
    let arg = { from: today, to, includes: "" };
    (country.label && !city.label) && (arg = Object.assign(arg, { countryid: country.id }));
    (country.label && city.label) && (arg = Object.assign(arg, { countryid: country.id, cityid: city.id }));
    (country.label && city.label) && (arg = Object.assign(arg, { countryid: country.id, cityid: city.id }));
    (country.label && city.label && category.id) && (arg = Object.assign(arg, { countryid: country.id, cityid: city.id, categoryid: category.id }));
    (userInput.current !== "") && (arg = Object.assign(arg, {includes: userInput.current}))
    const { data: userSelectedDayEvents, refetch } = useQuery(GET_EVENT, {
        //@ts-ignore
        variables: { arg },
        fetchPolicy: 'no-cache'
    });

    function onChangeText(text: string) {
        userInput.current = text
    }
    function onEndEditing() {
        refetch({
            //@ts-ignore
            arg: {
                includes: userInput?.current
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
        <SearchContext.Provider value={{}}>
            <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? colors.dark.primary : colors.white }}>
                <View style={styles.container}>
                    <HeaderWithBackArrow />
                    <Input
                        onChangeText={onChangeText}
                        onEndEditing={onEndEditing} icon={Search} placeholder='Хайх'
                    />
                    <View style={{ flexDirection: 'column', zIndex: 2, position: 'relative', gap: 12 }}>
                        <View style={{ flexDirection: 'row', gap: 12, zIndex: 2, position: 'relative',paddingTop: 24 }}>
                            <Dropdown />
                            <TestDropdown label='Монгол' />
                            {country && <AnotherTestDropDown label={country ? city.label : 'Улаанбаатар'} />}
                        </View>
                    <Categories />
                    </View>
                    <EventList
                        notFoundTitle={'Таны хайсан эвэнт олдсонгүй'}
                        events={userSelectedDayEvents?.events}
                        cartDirection='column'
                    />
                </View>
            </SafeAreaView>
        </SearchContext.Provider>

    )
}