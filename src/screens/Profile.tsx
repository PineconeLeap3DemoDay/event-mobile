import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import { useAuth } from '../context/AuthProvider';
import Header from '../components/Header';
import { Avatar } from '../components/Avatar';
import { padding, responsiveHeight, responsiveWidth } from '../utils';
import Heading from '../components/Heading';
import Button from '../components/Button';
import { Plus } from '../components/Icon/Plus';
import { colors } from '../../colors';
import { useTheme } from '../hooks';
import HashTags from '../components/HashTags';
const GET_USER = gql`
query GetUser {
  getUser {
    lastName
    firstName
    email
  }
}
`
const styles = StyleSheet.create({
  avatar: {
    ...padding(155, 164, 155, 20)
  },
  heading: {
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: responsiveHeight(3)
  },
  likes_and_tickets_container: {
    flexDirection: 'row', 
    marginTop: responsiveHeight(43), 
    gap: responsiveWidth(55)
  },
  like_and_ticket_container: {
    flexDirection: 'row', 
    gap: responsiveWidth(8)
  },
  btn: {
    width: responsiveWidth(141), 
    height: responsiveHeight(40), 
    marginTop: responsiveHeight(27)
  }
})
export function Profile() {
  const { token } = useAuth();
  const {isDark} = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const {width: screenwidth, height: screenheight} = useWindowDimensions();
  const { data, loading } = useQuery(GET_USER, {
    context: {
      headers: { Authorization: token }
    }
  });
  function openHashTags() {
    setIsOpen(!isOpen)
  }
  function closeHashTags() {
    setIsOpen(false)
  }
  if (loading) return <View></View>
  const { firstName, lastName, email } = data?.getUser
  return (
    <SafeAreaView style={{flex:1}}>
      <Header />
      <View>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Avatar />
        </View>
        {/*  Heading1*/}
        <View style={styles.heading}>
          <Heading h1 title={`${firstName} ${lastName}`} />
          <Heading fontFamily='Inter-ExtraLight' h3 title={email} />
        </View>
        {/* Heading2 */}
        <View style={styles.likes_and_tickets_container}>
          <View style={styles.like_and_ticket_container}>
            <Text style={{color: isDark ? 'white': 'black'}}>0</Text>
            <Heading color='#545353' h4 title='likes' />
          </View>
          <View style={styles.like_and_ticket_container}>
            <Text style={{color: isDark ? 'white': 'black'}}>0</Text>
            <Heading color='#545353' h4 title='tickets' />
          </View>
        </View>
        {/*Add hashtag  */}
        <Button onPress={openHashTags} style={styles.btn}>
          <Plus width={22}
            height={22}
            stroke={colors.silver}
            fill={colors.silver}
            strokeWidth={0.01} />
          <Heading h4 color='#545353' title='Add HashTag' />
        </Button>
        {/*  */}
        {/* Hashtag */}
        {isOpen &&
        <View style={{flexGrow:1,width:screenwidth - responsiveWidth(48),height:screenheight, backgroundColor:'rgba(52, 52, 52, 0.3)',position:'absolute', top:0, left:0}}>
        <HashTags setIsOpen={closeHashTags}/>
        </View>}
      </View>
    </SafeAreaView>
  )
}