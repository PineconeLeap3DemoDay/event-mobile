import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {View} from 'react-native';
import { Avatar } from '../components/Avatar';
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow';
import Heading from '../components/Heading';
import Layout from '../components/Layout/Layout';
import {useAuth} from '../context/AuthProvider';
import { responsiveHeight, responsiveWidth } from '../utils';
const USER_NOTIFICATIONS = gql`
  query GetUser {
    getUser {
      _id
      notifications {
        title
        id
        thumbnail
      }
    }
  }
`;
export function NotificationScreen() {
  const {token} = useAuth();
  const {data, loading} = useQuery(USER_NOTIFICATIONS, {
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
  if (loading) {
    return <View />;
  }
  const notifications = data?.getUser?.notifications;
  function Notification({data}: {data: any}) {
    return (
      <View style={{backgroundColor: 'red', justifyContent: 'space-between'}}>
        <View>
          <Avatar style={{width: responsiveWidth(50), height: responsiveHeight(50)}}/>
        </View>
        <View />
        <View />
      </View>
    );
  }
  return (
    <Layout>
      <HeaderWithBackArrow />
      {notifications.map((notification: any) => (
        <Notification data={notification} key={notification.id} />
      ))}
    </Layout>
  );
}
