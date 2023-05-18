import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { useAuth } from "../context/AuthProvider";
import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES } from "../graphql";

export default function useFavorite(eventid: string) {
    const { token, isUser } = useAuth();
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
    const isThisUserFavoriteEvent = isUser ? favorites?.getUser?.favorites?.
        findIndex((favorite: any) => favorite?._id === eventid) !== -1
    : false;
    const toggleFavorite = useCallback(() => {
        if(!isUser) {
            return;
        }
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