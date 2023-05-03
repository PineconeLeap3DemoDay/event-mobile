import { Image, SafeAreaView, ScrollView, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Event } from '../../typing';
import { ArrowLeft } from '../components/Icon/arrowLeft';
import { responsiveHeight, responsiveWidth } from '../utils/width';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import Heading from '../components/Heading';
import { colors } from '../../colors';
import { CalendarSm, Clock, Location, Ticket } from '../components/Icon';
const GET_EVENT = gql`
  query Event($eventId: ID!) {
    event(id: $eventId) {
      title
      thumbnail
      location
      price
      organizer {
        name
      }
    }
}
`
export default function EventDetail(prop: any) {
  const { eventid } = (prop.route.params);
  const {width: windowWidth, height: windowHeight} = useWindowDimensions()
  const { data } = useQuery(GET_EVENT, {
    variables: { eventId: eventid }
  });
  const event: Event = data?.event;
  const navigation = useNavigation();
  const EventDetails = [
    {
      icon: CalendarSm,
      title: '17, March , 2023, Wednesday',
      numberOfLines: 1,
      style: { flexDirection: 'row', gap: responsiveWidth(10), marginTop: responsiveHeight(10), justifyContent: 'space-between', alignItems: 'center' }
    }
    , {
      icon: Clock,
      title: '18:00 PM - 23:00PM',
      numberOfLines: 1,
      style: { flexDirection: 'row', gap: responsiveWidth(10), marginTop: responsiveHeight(12), justifyContent: 'space-between', alignItems: 'center' }
    },
    {
      icon: Ticket,
      title: '35.000T',
      numberOfLines: 1,
      style: { flexDirection: 'row', gap: responsiveWidth(10), marginTop: responsiveHeight(12), justifyContent: 'space-between', alignItems: 'center' }
    },
    {
      icon: Location,
      title: 'Please join us for a relaxing evening of fun and fellowship and invite a friend.',
      numberOfLines: 2,
      style: { flexDirection: 'row', gap: responsiveWidth(10), marginTop: responsiveHeight(12), justifyContent: 'space-between', alignItems: 'center', width: responsiveWidth(280) }
    }
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexGrow: 1, position: 'relative' }}>
        <Button
          onPress={() => navigation.goBack()}
          icon={ArrowLeft}
          style={{ position: 'absolute', zIndex: 12, backgroundColor: 'transparent' }} />
        <Image
          style={{height:responsiveHeight(392),width:windowWidth,position:'absolute', top:0, left:0}}
          source={{ uri: event?.thumbnail }}
        />
        <ScrollView contentContainerStyle={{ height:windowHeight-responsiveHeight(392), position: 'absolute', bottom: 0}}>
          <View style={{ flexGrow: 1, borderTopLeftRadius: 25, borderTopRightRadius: 25, backgroundColor: colors.white, paddingTop: responsiveHeight(46), paddingHorizontal: responsiveWidth(24) }}>
            <View>
              <Heading h2 title={event?.title} fontFamily='Inter-SemiBold' />
              <Heading style={{ marginTop: responsiveHeight(5) }} h5 color={colors['text-silver']} title={event?.location} fontFamily='Inter-SemiBold' />
            </View>
            {/* event details like cal clock price location */}
            <View style={{ alignItems: 'flex-start', paddingTop: responsiveHeight(10) }}>
              {EventDetails.map((evnt) => (
                // @ts-ignore
                <View style={evnt.style}>
                  <Heading icon={evnt.icon} numberOfLines={evnt.numberOfLines} title={evnt.title} fontFamily='Poppins-SemiBold' p color={'#686873'} />
                </View>
              ))}
            </View>
            <View>
              <Heading style={{ marginTop: responsiveHeight(24) }} h3 fontWeight='bold' title="About this events: " />
              <Heading
                style={{ marginTop: responsiveHeight(15) }}
                fontFamily='Poppins-Medium'
                numberOfLines={6}
                p
                color={'#686873'}
                title="We want to meet you! At the reception, we will have snacks and drinks, and we look forward to getting to know you better. We also have a small free gift bag for the first 50 attendees.
              Please join us for a relaxing evening of fun and fellowship and invite a friend.
              "
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
