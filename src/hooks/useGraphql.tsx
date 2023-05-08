import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../context/AuthProvider";
import { ADD_HASH_TAG, DELETE_HASH_TAG, GET_CATEGORIES, GET_USER, GET_USER_HASHTAG, SIGN_IN } from "../graphql";

export default function useGraphql() {
  const { token } = useAuth();

  const { data: userData, loading } = useQuery(GET_USER, {
    fetchPolicy: 'network-only',
    context: {
      headers: { Authorization: token }
    }
  });
  const [login, { data }] = useMutation(SIGN_IN);


  const { data: userHashTags } = useQuery(GET_USER_HASHTAG, {
    fetchPolicy: 'network-only',
    context: {
      headers: { Authorization: token }
    }
  });
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const [addHashtag] = useMutation(ADD_HASH_TAG, {
    refetchQueries: [{ query: GET_USER_HASHTAG }],
    context: {
      headers: { Authorization: token }
    }
  });
  const [deleteHashtag] = useMutation(DELETE_HASH_TAG, {
    refetchQueries: [{ query: GET_USER_HASHTAG }],
    context: {
      headers: { Authorization: token }
    }
  });
  return {
    userData: userData?.getUser,
    loading,
    login,
    addHashtag,
    deleteHashtag,
    userHashTags,
    categoriesData
  }
}