import { gql, useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from '../../colors';
import Categories from '../components/Categories';
import EventList from '../components/EventList';
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow';
import { Search } from '../components/Icon';
import Input from '../components/Input';
import { useTheme } from '../hooks';
import useSelectedCategory from '../hooks/useCategory';
import useDay, { getnextday } from '../hooks/useDay';
import { padding, responsiveHeight, responsiveWidth } from '../utils';

const GET_EVENT = gql`
query Events($arg:eventsQueryInput) {
  events(arg: $arg) {
    title
    id
    startDate
    about
    location
    thumbnail
  }
}
`
export function SearchScreen() {
    const { isDark } = useTheme();
    const userInput = useRef<string>('');
    const [open, setOpen] = useState(false);
    const {
        tomorrow,
        today,
        lastDayOfThisWeek,
        lastDayOfThisMonth,
    } = useDay();
    const {category} = useSelectedCategory();
    const [value, setValue] = useState("Өнөөдөр");
    const [items, setItems] = useState([
        { label: 'Өнөөдөр', value: getnextday(new Date(today)).toISOString().slice(0, 10) },
        { label: 'Маргааш', value: getnextday(new Date(tomorrow)).toISOString().slice(0, 10) },
        { label: 'Энэ долоо хоногт', value: getnextday(new Date(lastDayOfThisWeek)).toISOString().slice(0, 10) },
        { label: 'Энэ сард', value: getnextday(new Date(lastDayOfThisMonth)).toISOString().slice(0, 10) },
    ]);

    const { data: userSelectedDayEvents, refetch } = useQuery(GET_EVENT, {
        variables: { arg: { from: today, to: value, categoryid: category.id } },
        fetchPolicy: 'network-only'
    });
    
    function onChangeText(text: string) {
        userInput.current = text
    }
    function onEndEditing() {
        refetch({
            arg: {
                //@ts-ignore
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
        <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? colors.dark.primary : colors.white }}>
            <View style={styles.container}>
                <HeaderWithBackArrow />
                <Input
                    onChangeText={onChangeText}
                    onEndEditing={onEndEditing} icon={Search} placeholder='Хайх'
                />
                <View style={{flexDirection: 'row', gap: 12, position: 'relative',paddingTop: 24}}>
                    <DropDownPicker
                        showArrowIcon
                        placeholder={value}
                        style={{
                            backgroundColor: colors.secondary,
                            width: 150,
                            borderColor: 'transparent',
                            height: 20,
                        }}
                        dropDownContainerStyle={{
                            borderColor: 'transparent',
                        }}
                        textStyle={{
                            color:'white',
                            fontSize:12
                        }}
                        listItemLabelStyle={{
                            color:'black'
                        }}
                        ArrowDownIconComponent={() => <View></View>}
                        ArrowUpIconComponent={() => <View></View>}
                        containerStyle={{
                            width: 150,
                            height: open ? 200 : 'auto',
                        }}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                    <Categories />
                </View>
                <EventList 
                notFoundTitle={'Таны хайсан эвэнт олдсонгүй'}
                 events={userSelectedDayEvents?.events} 
                 cartDirection='column' 
                 />
            </View>
        </SafeAreaView>
    )
}