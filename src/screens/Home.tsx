import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import { SvgHamburgermenu, SvgSearch } from '../components/Icon';
import { responsiveHeight } from '../utils/width';
import { Badge } from '../components';
import Input from '../components/Input';
import Categories from '../components/Categories';
import EventList from '../components/EventList';
import useCategory from '../hooks/useCategory';
import { gql, useQuery } from '@apollo/client';
import { colors } from '../../colors';
import Heading from '../components/Heading';
import Button from '../components/Button';
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    height: responsiveHeight(31),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
const GET_EVENTS = gql`
  query Events {
    events {
      title
      id
      startDate
      thumbnail
      location
    }
 }
`
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
export function Home() {
  const {category} = useCategory();
  
  const {data: categoryEvents} = useQuery(GET_CATEGORY_EVENTS,{
    variables: {categoryid: category.id},
    refetchWritePolicy: 'merge',
  });
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ paddingTop: responsiveHeight(27) }}>
        {/* Header */}
        <View style={styles.header}>
          <SvgHamburgermenu width={28} height={24} fill="black" />
          <Badge />
        </View>
        {/* Search */}
        <Input icon={SvgSearch} placeholder='Хайх' />
        {/* upcoming events */}
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: responsiveHeight(27),
        }}>
          <Heading title='Эвэнтүүд' p={true}/>
          <Button style={{backgroundColor: 'white'}}>
              <Heading color={colors['text-silver']} p title='Бүх эвэнтүүд'/>
          </Button>
        </View>
        {/* Navlinks */}
        <Categories />
        <EventList cartDirection='column' events={categoryEvents?.category?.events}/>
      </View>
    </SafeAreaView>
  )
}
