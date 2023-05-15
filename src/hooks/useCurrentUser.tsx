import { useQuery } from "@apollo/client";
import { useAuth } from "../context/AuthProvider";
import { GET_USER } from "../graphql";

export default function useCurrentUser() {
  const { token } = useAuth();
  console.log(token,'tojen')
  const {data, loading} = useQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: token
      }
    }
  })
  console.log(data,'asgfhdfgb ')
const res = data?.getUser;
return {currentUser:res, loading}
}