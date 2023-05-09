import React from 'react'
import Layout from '../components/Layout/Layout'
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow'
import { useMutation, useQuery } from '@apollo/client';
import { FOLLOW_COMPANY, GET_COMPANY, UNFOLLOW_COMPANY } from '../graphql';
import { Avatar } from '../components/Avatar';
import { View } from 'react-native';
import { padding, responsiveHeight } from '../utils';
import Heading from '../components/Heading';
import Button from '../components/Button';
import { useAuth } from '../context/AuthProvider';
import { User } from '../../typing';
import EventList from '../components/EventList';

export default function Company(props: any) {
  const companyId = props?.route.params.companyId;
  const { userid } = useAuth();
  const { data, loading } = useQuery(GET_COMPANY, {
    variables: { companyId }
  });
  const { token } = useAuth();
  const [followCompany] = useMutation(FOLLOW_COMPANY, {
    refetchQueries: [GET_COMPANY],
    context: {
      headers: { Authorization: token }
    }
  })
  const [unfollowCompany] = useMutation(UNFOLLOW_COMPANY, {
    refetchQueries: [GET_COMPANY],
    context: {
      headers: { Authorization: token }
    }
  })
  if (loading) return <View></View>
  const company = data.company;
  const DoesUserFollowThisCompany = company.followers.findIndex((follower: User) => follower._id === userid) !== -1;

  function onPress () {
    if(DoesUserFollowThisCompany) {
      unfollowCompany({
        variables: {companyid: companyId}
      })
    }
    followCompany({
      variables: {companyid: companyId}
    })
  }
 
  return (
    <Layout>
      <HeaderWithBackArrow />
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...padding(115, 50, 115, 0),
        gap: responsiveHeight(15)
      }}>
        <Avatar />
        <Heading h2 fontFamily='Inter-SemiBold' title={company.name} />
        <Heading h5 color='silver' fontFamily='Inter-Regular'
          title={`${company?.followers?.length} дагагчтай`} />
        <Button onPress={onPress} style={{ backgroundColor: DoesUserFollowThisCompany ? "#FCEFF8" : "#D22366" }}>
          <Heading p color={
            DoesUserFollowThisCompany ? "#D22366" : "white"
          } title={DoesUserFollowThisCompany ? "Дагасан" : "Дагах"} />
        </Button>
      </View>
      <View style={{ ...padding(0, 48, 0, 0) }}>
        <Heading h4 fontFamily='Inter-SemiBold' title='Бидний тухай' />
        <Heading style={{ marginTop: responsiveHeight(20) }} h4 numberOfLines={5} title='Манай компани нь 2006 оноос хойш үйл ажиллагаагаа тасралтгүй явуулж байгаа юм. Та хүссэн улсруугаа хямд зардлаар явах боломжийг олгоно. ' />
      </View>
      <View>
        <Heading style={{ ...padding(0, 24, 0, 0) }} h4 fontFamily='Inter-SemiBold' title='Зохион байгуулсан эвэнтүүд' />
        <EventList
          cartDirection='column'
          events={company?.events}
          notFoundTitle='Энэхүү компанид зохион байгуулагдсан эвэнт байхгүй байна'
        />
      </View>
    </Layout>
  )
}