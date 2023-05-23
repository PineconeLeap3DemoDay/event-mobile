import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {View, FlatList} from 'react-native';
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow';
import Heading from '../components/Heading';
import Layout from '../components/Layout/Layout';
import Notification from '../components/Notification';
import {useAuth} from '../context/AuthProvider';
import {padding} from '../utils';
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
  return (
    <Layout>
      <HeaderWithBackArrow />
      <Heading style={{...padding(0, 24, 0, 0)}} h2 title="Мэдэгдэлүүд" />
      <FlatList
        data={notifications}
        style={{...padding(0, 24, 0, 0), marginTop: 10}}
        renderItem={({item}) => {
          return <Notification data={item} key={item.id} />;
        }}
      />
    </Layout>
  );
}
