import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
 }
`
export const GET_USER_HASHTAG = gql`
 query getUser {
  getUser {
    _id
    lastName
    firstName
    email
    hashtags {
      id
      name
    }
  }
}
`
export const ADD_HASH_TAG = gql`
mutation Mutation($categoryId: ID!) {
  addHashtag(categoryId: $categoryId)
}
`
export const DELETE_HASH_TAG = gql`
mutation Mutation($categoryId: ID!) {
  deleteHashtag(categoryId: $categoryId)
}
`
export const GET_USER = gql`
query GetUser {
  getUser {
    _id
    lastName
    firstName
    email
  }
}
`
export const SIGN_IN = gql`
mutation Signin($email: String!, $password: String!) {
  signin(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`