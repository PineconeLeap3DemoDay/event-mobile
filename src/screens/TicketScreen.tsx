import React from 'react'
import Layout from '../components/Layout/Layout'
import HeaderWithBackArrow from '../components/Header/HeaderWithBackArrow'
import Heading from '../components/Heading'
import { padding } from '../utils';
import { gql } from '@apollo/client';
const GET_TICKET = gql`

`
export function TicketScreen() {
  return (
    <Layout>
      <HeaderWithBackArrow />
      <Heading style={{...padding(0,20,0,0)}} h2 title='Миний тасалбар'/>
    </Layout>
  )
}