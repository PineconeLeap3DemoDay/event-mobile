import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { useAuth } from "../context/AuthProvider";
import { FOLLOW_COMPANY, UNFOLLOW_COMPANY } from "../graphql";
import { useUser } from "./useUser";
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
function useFollow(companyId: string) {
    const {isUser} = useAuth();
    const { data, loading } = useQuery(GET_COMPANY, {
        variables: { companyId: companyId }
    });
    const {token, userid} = useAuth();
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
    let DoesUserFollowThisCompany = isUser ?
        company?.followers.
            findIndex((follower: any) => follower._id === userid) !== -1
        : false;

    const toggleFollow = useCallback(() => {
        if(!isUser) {
            return;
        }
        if (DoesUserFollowThisCompany) {
            unfollowCompany();
        } else {
            followCompany();
        }
    }, [DoesUserFollowThisCompany,unfollowCompany,followCompany]);
    return {
        DoesUserFollowThisCompany, toggleFollow, company, loading
    }
}
export default useFollow