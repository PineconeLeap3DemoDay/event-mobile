import React from 'react'
import Layout from '../components/Layout/Layout'
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow'
import Heading from '../components/Heading'
import { padding } from '../utils';
import { gql, useQuery } from '@apollo/client';
import { useAuth } from '../context/AuthProvider';
import EventList from '../components/EventList';
const GET_TICKETS = gql`
 query Query {
  getUser {
    tickets {
      id
      title
      startDate
      about
      location
      thumbnail
    }
  }
}
`
export function TicketScreen() {
  const {token} = useAuth()
  const {data, loading} = useQuery(GET_TICKETS, {
    fetchPolicy:'no-cache',
    context: {
      headers: {
        Authorization: token
      }
    }
  });
  return (
    <Layout>
      <HeaderWithBackArrow />
      <Heading style={{ ...padding(0, 20, 0, 0) }} h2 title='Миний тасалбар' />
      <EventList cartDirection='row' notFoundTitle='Таньд одоогоор тасалбар байхгүй байна' events={data?.getUser?.tickets}/>
    </Layout>
  )
}