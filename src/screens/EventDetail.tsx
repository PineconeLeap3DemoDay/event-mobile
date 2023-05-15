import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Dimensions, FlatList, ImageBackground, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../colors';
import { Event } from '../../typing';
import { Avatar } from '../components/Avatar';
import Button from '../components/Button';
import SuggestedEvent from '../components/Cart/SuggestedEvent';
import FavoriteButton from '../components/FavoriteButton';
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow';
import Heading from '../components/Heading';
import { CalendarSm, Clock, Location, Ticket } from '../components/Icon';
import { GET_EVENT } from '../graphql';
import { useTheme } from '../hooks';
import { padding } from '../utils';
import { responsiveHeight, responsiveWidth } from '../utils/width';

export function EventDetail(prop: any) {
  const { eventid } = prop.route.params;
  const { data } = useQuery(GET_EVENT, {
    variables: { eventId: eventid }
  });
  const { isDark } = useTheme();
  const event: Event = data?.event;
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '60%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
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
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: isDark ? colors.dark.primary : 'white'
    },
    image: {
      flexGrow: 0.5,
    },
    mainBody: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: isDark ? colors.dark.primary : colors.white,
      position: 'absolute',
      paddingTop: responsiveHeight(46),
      height: responsiveHeight(500),
      paddingHorizontal: responsiveWidth(24),
    },
    bottomSection: {
      position: 'absolute',
      flexDirection: 'row',
      bottom: Platform.OS === 'android' ? responsiveHeight(5) : responsiveHeight(50),
      width: Dimensions.get('screen').width,
      justifyContent: 'space-between',
      paddingHorizontal: responsiveWidth(25),
    },
    scrollViewContainerStyle: {
      height: Dimensions.get('window').height,
    },
    btnArrowleft: {
      position: 'absolute',
      top: responsiveHeight(40),
      left: 0,
      zIndex: 12,
      backgroundColor: 'transparent'
    },
    btnSaveEvent: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: responsiveHeight(48),
      borderRadius: 50,
      right: 10,
      zIndex: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: event?.thumbnail }} resizeMode="cover" style={styles.image} />
      {/* Header */}
      <HeaderWithBackArrow style={{ position: 'absolute', ...padding(15, 12, 0, 0) }} />
      {/* main */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ScrollView style={styles.mainBody} contentContainerStyle={styles.scrollViewContainerStyle}>
          <View>
            <Heading h2 fontFamily='Inter-Medium' color='white' title={event?.title} />
            <Heading
              fontFamily='Roboto-Medium'
              fontWeight='bold'
              style={{ paddingTop: responsiveHeight(5) }}
              h5
              color={colors.light['text-secondary']}
              title={event?.location}
            />
            <View style={{ alignItems: 'flex-start', paddingTop: responsiveHeight(10) }}>
              {EventDetails.map((evnt) => (
                // @ts-ignore
                <View style={evnt.style}>
                  <Heading fontFamily='Roboto-Medium' icon={evnt.icon} numberOfLines={evnt.numberOfLines} title={evnt.title} h5 color={'#686873'} />
                </View>
              ))}
            </View>
            <View>
              <Heading style={{ marginTop: responsiveHeight(24) }} h2 fontWeight='bold' title="About this events: " />
              <Heading
                style={{ marginTop: responsiveHeight(15) }}
                fontFamily='Poppins-Medium'
                numberOfLines={6}
                h5
                color={'#686873'}
                title="We want to meet you! At the reception, we will have snacks and drinks, and we look forward to getting to know you better. We also have a small free gift bag for the first 50 attendees.
              Please join us for a relaxing evening of fun and fellowship and invite a friend.
              "
              />
            </View>
            {/* organizer */}
            <TouchableOpacity onPress={() => navigation.navigate('Company' as never, { companyId: event?.organizer?.id } as never)}
              style={{ gap: responsiveWidth(16), ...padding(0, 16, 0, 0) }}>
              <Heading h3 title='Зохион байгуулагч' />
              <View style={{ flexDirection: 'row', gap: responsiveWidth(16) }}>
                <Avatar />
                <View>
                  <Heading h3 title={event?.organizer?.name} />
                  <Heading
                    color='silver'
                    h4 title={`${event?.organizer.followers.length} дагагчтай`} />
                </View>
              </View>
            </TouchableOpacity>
            {/*  */}
            <View style={{ marginTop: responsiveHeight(24) }}>
              <Heading h3 title='Эвэнт зохиогдох өдрүүд' />
              <View style={{ marginTop: responsiveHeight(24), width: 111, height: 111, backgroundColor: isDark ? '12121F' : '#F7F7F7', justifyContent: 'center', alignItems: 'center' }}>
                <Heading h5 color={isDark ? 'white' : 'black'} fontFamily='Inter-SemiBold' title='Бямба' />
                <View style={{ borderRadius: 50, backgroundColor: '#074590', justifyContent: 'center', alignItems: 'center', width: responsiveWidth(34), height: responsiveHeight(34) }}>
                  <Heading color={isDark ? 'black' : 'white'} h5 title='23' />
                </View>
                <Heading color={isDark ? 'white' : 'black'} h5 title='5 сарын 23' />
                <Heading color={isDark ? 'white' : 'black'} p title='19:00-21:00 ' />
              </View>
            </View>
            {/*  */}
            <View style={{ marginTop: responsiveHeight(24) }}>
              <Heading color='black' h3 title='Санал болгох' />
              <FlatList
                data={new Array(10)}
                style={{ marginTop: 10 }}
                horizontal={true}
                renderItem={() => (
                  <SuggestedEvent event={event} />
                )}
              />
            </View>
          </View>

        </ScrollView>
      </BottomSheet>

      {/* Bottom */}
      <View style={styles.bottomSection}>
        <FavoriteButton eventid={eventid} size='big' />
        <Button
          selected
          style={{ borderRadius: 8, width: responsiveWidth(251), height: responsiveHeight(60) }}
        >
          <Heading color='white' h2 title='Тасалбар авах' />
        </Button>
      </View>
    </View>
  )
}
