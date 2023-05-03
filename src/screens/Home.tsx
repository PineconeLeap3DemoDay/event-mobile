import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Search } from '../components/Icon';
import { responsiveHeight } from '../utils/width';
import Input from '../components/Input';
import Categories from '../components/Categories';
import EventList from '../components/EventList';
import useCategory from '../hooks/useCategory';
import { gql, useQuery } from '@apollo/client';
import { colors } from '../../colors';
import Heading from '../components/Heading';
import Button from '../components/Button';
import Header from '../components/Header';
import { useTheme } from '../hooks';
const GET_CATEGORY_EVENTS = gql`
 query Category($categoryid: ID) {
  category(categoryid: $categoryid) {
    name
    events {
      title
      id
      startDate
      thumbnail
      location
    }
  }
}
`
const styles = StyleSheet.create({
  container: {
    paddingTop: responsiveHeight(27),
  },
  upComingTitleContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(27),
  }
})
export function Home() {
  const {category} = useCategory();
  const {isDark} = useTheme()
  const {data: categoryEvents} = useQuery(GET_CATEGORY_EVENTS,{
    variables: {categoryid: category.id},
    refetchWritePolicy: 'merge',
  });
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* Header */}
        <Header />
        {/* Search */}
        <Input icon={Search} placeholder='Хайх' />
        {/* upcoming events */}
        <View style={styles.upComingTitleContainer}>
          <Heading color={isDark ? 'white': colors.light['text-primary']} fontFamily='Inter-SemiBold' title='Эвэнтүүд' h5/>
          <Button style={{backgroundColor: 'transparent'}}>
              <Heading color={isDark ?'white': colors.light['text-secondary']} fontFamily='Inter-SemiBold' p title='Бүх эвэнтүүд'/>
          </Button>
        </View>
        {/* Navlinks */}
        <Categories />
        <EventList cartDirection='column' events={categoryEvents?.category?.events}/>
      </View>
    </SafeAreaView>
  )
}
