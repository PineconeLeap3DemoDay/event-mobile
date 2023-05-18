import { useQuery } from "@apollo/client";
import { useAuth } from "../context/AuthProvider";
import { GET_USER } from "../graphql";

export default function useCurrentUser() {
  const { token } = useAuth();
  const {data, loading} = useQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: token
      }
    }
  })
const res = data?.getUser;
return {currentUser:res, loading}
}