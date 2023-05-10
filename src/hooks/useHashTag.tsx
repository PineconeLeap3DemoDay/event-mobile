import { useMutation, useQuery } from "@apollo/client";
import { ADD_HASH_TAG, DELETE_HASH_TAG, GET_USER_HASHTAG, GET_USER_HASHTAG_EVENTS } from "../graphql";
import { useAuth } from "../context/AuthProvider";

export default function useHashTag() {
    const { token } = useAuth();
    const [addHashtag] = useMutation(ADD_HASH_TAG, {
        refetchQueries: [GET_USER_HASHTAG, GET_USER_HASHTAG_EVENTS],
        context: {
            headers: { Authorization: token }
        }
    });
    const [deleteHashtag] = useMutation(DELETE_HASH_TAG, {
        refetchQueries: [GET_USER_HASHTAG, GET_USER_HASHTAG_EVENTS],
        context: {
            headers: { Authorization: token }
        }
    });
    const { data: userHashTags } = useQuery(GET_USER_HASHTAG, {
        context: {
            headers: { Authorization: token }
        }
    });
    return {addHashtag, deleteHashtag, userHashTags: userHashTags?.getUser?.hashtags}
}