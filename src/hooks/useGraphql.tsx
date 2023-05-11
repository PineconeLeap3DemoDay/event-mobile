import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql";

export default function useGraphql() {
  const [login] = useMutation(SIGN_IN);
  
  return {
    login,
  }
}