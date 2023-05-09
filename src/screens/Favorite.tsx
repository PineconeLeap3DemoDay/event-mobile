import { SafeAreaView, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Heading from '../components/Heading'
import { padding } from '../utils'
import EventList from '../components/EventList'
import { useQuery } from '@apollo/client'
import { useAuth } from '../context/AuthProvider'
import { GET_FAVORITES } from '../graphql'

export function Favorite() {
  const { token } = useAuth();
    const { data, loading } = useQuery(GET_FAVORITES, {
        context: {
            headers: { Authorization: token }
        }
    })
    const favorites = data?.getUser?.favorites;
    
    if(loading) return <View></View>
  return (
    <SafeAreaView>
      <Header />
      <Heading
        style={{ ...padding(0, 80, 0, 0) }}
        h1 fontFamily='Inter-SemiBold' title='Миний дуртай' />
        <EventList
        notFoundTitle='Таньд одоогоор сонирхсон эвэнт байхгүй байна'
        events={favorites}
        cartDirection='column'
        />
    </SafeAreaView>
  )
}