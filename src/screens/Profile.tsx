import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header';
import { Avatar } from '../components/Avatar';
import { padding, responsiveHeight, responsiveWidth } from '../utils';
import Heading from '../components/Heading';
import Button from '../components/Button';
import { Plus } from '../components/Icon/Plus';
import { colors } from '../../colors';
import { useTheme } from '../hooks';
import HashTagsBottomTab from '../components/HashTags';
import { Shadow } from '../components/Shadow';
import useGraphql from '../hooks/useGraphql';

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
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { userData, loading } = useGraphql();

  function openHashTags() {
    setIsOpen(true)
  }
  function closeHashTags() {
    setIsOpen(false)
  }
  if (loading) return <View></View>
  const { firstName, lastName, email } = userData
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={{ color: isDark ? 'white' : 'black' }}>0</Text>
            <Heading color='#545353' h4 title='likes' />
          </View>
          <View style={styles.like_and_ticket_container}>
            <Text style={{ color: isDark ? 'white' : 'black' }}>0</Text>
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
          <Shadow>
            <HashTagsBottomTab setIsOpen={closeHashTags} />
          </Shadow>}
      </View>
    </SafeAreaView>
  )
}