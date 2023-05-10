import { useQuery } from "@apollo/client";
import { GET_FAVORITES } from "../graphql";
import useGraphql from "./useGraphql";
import { useAuth } from "../context/AuthProvider";
import { useCallback } from "react";

export default function useFavorite(eventid: string) {
    const { token } = useAuth();
    const { data: favorites } = useQuery(GET_FAVORITES, {
        context: {
            headers: { Authorization: token }
        }
    })
    const { addFavorite, deleteFavorite } = useGraphql();

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