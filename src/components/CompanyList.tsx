import { View } from 'react-native'
import React, { useCallback } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Company, User } from '../../typing';
import { FlatList } from 'react-native';
import { Avatar } from './Avatar';
import { responsiveHeight, responsiveWidth } from '../utils';
import Heading from './Heading';
import Button from './Button';
import { useTheme } from '../hooks';
import { colors } from '../../colors';
import { useAuth } from '../context/AuthProvider';
import { FOLLOW_COMPANY, UNFOLLOW_COMPANY } from '../graphql';
const GET_COMPANIES = gql`
    query Companies {
  companies {
    id
  }
}
`
const GET_COMPANY = gql`
query($companyId: ID!) {
  company(id: $companyId) {
    id
    name
    followers {
      _id
    }
  }
}
`
export default function CompanyList() {
    const { data, loading } = useQuery(GET_COMPANIES);
    const { isDark } = useTheme();

    if (loading) return <View></View>;
    const companies = data?.companies;
    return (
        <View style={{ gap: responsiveHeight(24) }}>
            <Heading h4 fontFamily='Inter-SemiBold' color={isDark ? 'white' : 'black'} title='Эвэнт зохион байгуулагчид' />
            <FlatList
                style={{
                    width: responsiveWidth(126),
                    height: responsiveHeight(157),
                    gap: 10
                }}
                data={companies}
                renderItem={({ item: company }: { item: Company }) => (
                    <CompanyBox
                        key={company.id}
                        companyId={company.id}
                    />
                )}
            />
        </View>
    )
}
function CompanyBox({ companyId }: { companyId: string }) {
    const { isDark } = useTheme();
    const { token, userid } = useAuth();
    const { data, loading } = useQuery(GET_COMPANY, {
        variables: { companyId: companyId }
    })
    const [followCompany] = useMutation(FOLLOW_COMPANY, {
        refetchQueries: [GET_COMPANY],
        context: {
            headers: { Authorization: token }
        },
        variables: { companyid: companyId }
    })
    const [unfollowCompany] = useMutation(UNFOLLOW_COMPANY, {
        refetchQueries: [GET_COMPANY],
        context: {
            headers: { Authorization: token }
        },
        variables: { companyid: companyId }
    });
    const company = data?.company;
    const DoesUserFollowThisCompany = company?.followers.findIndex((follower: User) => follower._id === userid) !== -1;

    
    const onPress = useCallback(() => {
        if (DoesUserFollowThisCompany) {
            unfollowCompany();
        } else {
            followCompany();
        }
    }, [])
    if(loading) return <View></View>
    return (
        <View style={{
            width: responsiveWidth(126),
            height: responsiveHeight(157),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            gap: responsiveHeight(8),
            backgroundColor: isDark ? colors.dark.secondary : "#F7F7F7"
        }}>
            <Avatar style={{ width: responsiveWidth(50), height: responsiveHeight(50) }} />
            <Heading color={isDark ? 'white' : 'black'} h2 fontFamily='Inter-SemiBold' title={company.name} />
            <Heading h5 color='silver' fontFamily='Inter-Regular'
                title={`${company?.followers?.length} дагагчтай`} />
            <Button onPress={() => onPress()} style={{ backgroundColor: DoesUserFollowThisCompany ? "#FCEFF8" : "#D22366" }}>
                <Heading p color={
                    DoesUserFollowThisCompany ? "#D22366" : "white"
                } title={DoesUserFollowThisCompany ? "Дагасан" : "Дагах"} />
            </Button>
        </View>
    )
}