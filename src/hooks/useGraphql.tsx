import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../context/AuthProvider";
import { ADD_FAVORITE, ADD_HASH_TAG, DELETE_FAVORITE, DELETE_HASH_TAG, GET_CATEGORIES, GET_USER, GET_USER_HASHTAG, SIGN_IN } from "../graphql";

export default function useGraphql() {
  const { token } = useAuth();
// get user data
  const { data: userData, loading } = useQuery(GET_USER, {
    fetchPolicy: 'network-only',
    context: {
      headers: { Authorization: token }
    }
  });
// login
  const [login, { data }] = useMutation(SIGN_IN);

// getUserHashtag
  const { data: userHashTags } = useQuery(GET_USER_HASHTAG, {
    fetchPolicy: 'network-only',
    context: {
      headers: { Authorization: token }
    }
  });
// getCategories
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
// add user hashtag

  const [addHashtag] = useMutation(ADD_HASH_TAG, {
    refetchQueries: [{ query: GET_USER_HASHTAG }],
    context: {
      headers: { Authorization: token }
    }
  });
// delete user hashtag

  const [deleteHashtag] = useMutation(DELETE_HASH_TAG, {
    refetchQueries: [{ query: GET_USER_HASHTAG }],
    context: {
      headers: { Authorization: token }
    }
  });
  // add user favorite event
  const [addFavorite] = useMutation(ADD_FAVORITE, {
    context: {
      headers: { Authorization: token }
    }
  })
  const [deleteFavorite] = useMutation(DELETE_FAVORITE, {
    context: {
      headers: { Authorization: token }
    }
  })
  return {
    userData: userData?.getUser,
    loading,
    login,
    addHashtag,
    deleteHashtag,
    userHashTags,
    categoriesData,
    addFavorite,
    deleteFavorite
  }
}