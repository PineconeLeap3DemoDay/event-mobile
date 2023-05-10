import { gql, useQuery } from "@apollo/client";

const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
 }
`
export default function useCategories() {
    const {data, loading} = useQuery(GET_CATEGORIES);
    return {categories: data?.categories, loading}
}