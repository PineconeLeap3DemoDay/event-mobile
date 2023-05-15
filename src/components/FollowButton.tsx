import { View, Text } from 'react-native'
import React from 'react'
import useFollow from '../hooks/useFollow'
import Button from './Button'
import Heading from './Heading'
type Props = {
    companyId: string
}
export default function FollowButton({ companyId }: Props) {
    const {
        DoesUserFollowThisCompany,
        toggleFollow
    } = useFollow(companyId);
    return (
        <View>
            <Button onPress={toggleFollow} style={{ backgroundColor: DoesUserFollowThisCompany ? "#FCEFF8" : "#D22366" }}>
                <Heading p color={
                    DoesUserFollowThisCompany ? "#D22366" : "white"
                } title={DoesUserFollowThisCompany ? "Дагасан" : "Дагах"} />
            </Button>
        </View>
    )
}