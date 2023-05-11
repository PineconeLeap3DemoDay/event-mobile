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
import { padding } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthProvider';
import { GET_USER_HASHTAG_EVENTS } from '../graphql';
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
    ...padding(0,27,0,0)
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
  const {isDark} = useTheme();
  const {token} = useAuth();
  
  const {data: categoryEvents} = useQuery(GET_CATEGORY_EVENTS,{
    skip: category.name === 'Миний дуртай',
    variables: {categoryid: category.id},
    refetchWritePolicy: 'merge',
  });

  const {data} = useQuery(GET_USER_HASHTAG_EVENTS, {
    context: {
      headers: { Authorization: token }
  }
  });
  const navigation = useNavigation();
  const isUserSelectedMyFeed = category.name === 'Миний дуртай';
  
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* Header */}
        <Header />
        {/* Search */}
        <Input style={{borderRadius: 8}} onPressIn={() => {
          navigation.navigate('SearchScreen' as never)
        }} icon={Search} placeholder='Хайх' />
        {/* upcoming events */}
        <View style={styles.upComingTitleContainer}>
          <Heading color={isDark ? 'white': colors.light['text-primary']} title='Эвэнтүүд' h5/>
          <Button label='Бүх эвэнтүүд' style={{backgroundColor: 'transparent'}} />
        </View>
        {/* Navlinks */}
        <View style={{flexDirection:'row'}}>
          <Categories 
            showMyFeed={true}
          />
        </View>
        <EventList
          showCompanyList
          notFoundTitle='Одоогоор энэхүү категорид эвэнт байхгүй байна' 
          cartDirection='column' 
          events={
            isUserSelectedMyFeed ? data?.myHashtagEvents : categoryEvents?.category?.events
          }
        />
      </View>
    </SafeAreaView>
  )
}
