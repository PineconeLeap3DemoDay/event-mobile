import { ScrollView, View, ImageBackground, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { useQuery } from '@apollo/client';
import { Event } from '../../typing';
import { ArrowLeft } from '../components/Icon/arrowLeft';
import { responsiveHeight, responsiveWidth } from '../utils/width';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import Heading from '../components/Heading';
import { colors } from '../../colors';
import { CalendarSm, Clock, Favorite, Location, Ticket } from '../components/Icon';
import { useTheme } from '../hooks';
import { Avatar } from '../components/Avatar';
import { padding } from '../utils';
import { GET_EVENT, GET_FAVORITES } from '../graphql';
import { useAuth } from '../context/AuthProvider';
import useGraphql from '../hooks/useGraphql';
import Save from '../components/Icon/save';
import SuggestedEvent from '../components/Cart/SuggestedEvent';

export function EventDetail(prop: any) {
  const { token } = useAuth();
  const { eventid } = (prop.route.params);
  const { data } = useQuery(GET_EVENT, {
    variables: { eventId: eventid }
  });
  const { isDark } = useTheme();
  const event: Event = data?.event;
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
  const { data: favorites } = useQuery(GET_FAVORITES, {
    context: {
      headers: { Authorization: token }
    }
  })
  const { addFavorite, deleteFavorite } = useGraphql();

  const navigation = useNavigation();
  const isThisUserFavoriteEvent = favorites?.getUser?.favorites?.
    findIndex((favorite: Event) => favorite?.id === eventid) !== -1;
  const toggleSave = useCallback(() => {
    if (isThisUserFavoriteEvent) {
      deleteEventAsFavorite()
    } else {
      addEventAsFavorite();
    }
  }, [isThisUserFavoriteEvent, addEventAsFavorite, deleteEventAsFavorite])


  function addEventAsFavorite() {
    addFavorite({ variables: { eventId: eventid } })
  }
  function deleteEventAsFavorite() {
    deleteFavorite({ variables: { eventId: eventid } })
  }
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
      top: responsiveHeight(400),
      paddingTop: responsiveHeight(46),
      height: responsiveHeight(385),
      paddingHorizontal: responsiveWidth(24),
    },
    bottomSection: {
      position: 'absolute',
      flexDirection: 'row',
      bottom: responsiveHeight(50),
      width: Dimensions.get('screen').width,
      justifyContent: 'space-between',
      paddingHorizontal: responsiveWidth(25)
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
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: event?.thumbnail }} resizeMode="cover" style={styles.image} />
      {/* Header */}
      <Button
        onPress={() => navigation.goBack()}
        icon={ArrowLeft}
        style={styles.btnArrowleft} />
      <Button
        onPress={toggleSave}
        style={styles.btnSaveEvent} >
        <Save
          fill={
            isThisUserFavoriteEvent ? colors.secondary : 'black'
          }
          width={15}
          height={15}
        />
      </Button>
      {/* main */}
      <ScrollView style={styles.mainBody} contentContainerStyle={styles.scrollViewContainerStyle}>
        <View>
          <Heading h1 title={event?.title} />
          <Heading
            fontFamily='Inter-Regular'
            style={{ paddingTop: responsiveHeight(5) }}
            h3
            color={colors.light['text-secondary']}
            title={event?.location}
          />
          <View style={{ alignItems: 'flex-start', paddingTop: responsiveHeight(10) }}>
            {EventDetails.map((evnt) => (
              // @ts-ignore
              <View style={evnt.style}>
                <Heading icon={evnt.icon} numberOfLines={evnt.numberOfLines} title={evnt.title} h5 color={'#686873'} />
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
      {/* Bottom */}
      <View style={styles.bottomSection}>
        <Button
          onPress={toggleSave}
          style={{
            borderRadius: 50,
            width: responsiveWidth(60),
            heigth: responsiveHeight(60)
          }}
        >
          {isThisUserFavoriteEvent ?
            <Favorite
              fillRule={'even'}
              width={25}
              height={24}
              fill={colors.secondary}
            /> :
            <Favorite
              fillRule={'evenodd'}
              width={25}
              height={24}
              fill={colors.secondary}
            />}
        </Button>
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
