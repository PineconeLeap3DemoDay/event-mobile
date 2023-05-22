import {useMutation, useQuery} from '@apollo/client';
import {useCallback} from 'react';
import {useAuth} from '../context/AuthProvider';
import {ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES} from '../graphql';

export default function useFavorite(eventid: string) {
  const {token, isUser} = useAuth();
  const {data: favorites} = useQuery(GET_FAVORITES, {
    context: {
      headers: {Authorization: token},
    },
  });
  // add user favorite event
  const [addFavorite] = useMutation(ADD_FAVORITE, {
    refetchQueries: [GET_FAVORITES],
    context: {
      headers: {Authorization: token},
    },
  });
  //delete favorite
  const [deleteFavorite] = useMutation(DELETE_FAVORITE, {
    refetchQueries: [GET_FAVORITES],
    context: {
      headers: {Authorization: token},
    },
  });
  const isThisUserFavoriteEvent = isUser
    ? favorites?.getUser?.favorites?.findIndex(
        (favorite: any) => favorite?._id === eventid,
      ) !== -1
    : false;
  const toggleFavorite = useCallback(() => {
    function addEventAsFavorite() {
      addFavorite({variables: {eventId: eventid}});
    }
    function deleteEventAsFavorite() {
      deleteFavorite({variables: {eventId: eventid}});
    }
    if (!isUser) {
      return;
    }
    if (isThisUserFavoriteEvent) {
      deleteEventAsFavorite();
    } else {
      addEventAsFavorite();
    }
  }, [isThisUserFavoriteEvent, addFavorite, deleteFavorite, eventid, isUser]);

  return {toggleFavorite, isThisUserFavoriteEvent};
}
