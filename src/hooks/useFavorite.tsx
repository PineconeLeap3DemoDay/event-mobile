import { useMutation, useQuery } from "@apollo/client";
import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES } from "../graphql";
import { useAuth } from "../context/AuthProvider";
import { useCallback } from "react";

export default function useFavorite(eventid: string) {
    const { token } = useAuth();
    const { data: favorites } = useQuery(GET_FAVORITES, {
        context: {
            headers: { Authorization: token }
        }
    })

    // add user favorite event
    const [addFavorite] = useMutation(ADD_FAVORITE, {
        refetchQueries: [GET_FAVORITES],
        context: {
            headers: { Authorization: token }
        }
    })
    //delete favorite
    const [deleteFavorite] = useMutation(DELETE_FAVORITE, {
        refetchQueries: [GET_FAVORITES],
        context: {
            headers: { Authorization: token }
        }
    })
    const isThisUserFavoriteEvent = favorites?.getUser?.favorites?.
        findIndex((favorite: any) => favorite?.id === eventid) !== -1;
    const toggleFavorite = useCallback(() => {
        if (isThisUserFavoriteEvent) {
            deleteEventAsFavorite()
        } else {
            addEventAsFavorite();
        }
    }, [isThisUserFavoriteEvent, addEventAsFavorite, deleteEventAsFavorite])


    function addEventAsFavorite() {
        addFavorite({ variables: { eventId: eventid } })
    }
    function deleteEventAsFavorite() {
        deleteFavorite({ variables: { eventId: eventid } })
    }
    return { toggleFavorite, isThisUserFavoriteEvent }
}