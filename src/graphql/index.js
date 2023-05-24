import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;
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
`;
export const ADD_HASH_TAG = gql`
  mutation Mutation($categoryId: ID!) {
    addHashtag(categoryId: $categoryId)
  }
`;
export const DELETE_HASH_TAG = gql`
  mutation Mutation($categoryId: ID!) {
    deleteHashtag(categoryId: $categoryId)
  }
`;
export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      lastName
      firstName
      email
    }
  }
`;
export const SIGN_IN = gql`
  mutation Mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;
export const GET_FAVORITES = gql`
  query GetUser {
    getUser {
      _id
      favorites {
        _id
        thumbnail
        title
        location
      }
    }
  }
`;
export const GET_USER_HASHTAG_EVENTS = gql`
  query Query {
    myHashtagEvents {
      _id
      title
      startDate
      thumbnail
      location
    }
  }
`;
export const GET_EVENT = gql`
  query Event($eventId: ID!) {
    event(id: $eventId) {
      title
      id
      thumbnail
      location
      price
      city {
        name
      }
      country {
        name
      }
      organizer {
        name
        id
        followers {
          _id
        }
      }
    }
  }
`;

export const GET_COMPANY = gql`
  query ($companyId: ID!) {
    company(id: $companyId) {
      id
      name
      events {
        title
        id
        thumbnail
        location
        price
      }
      followers {
        _id
      }
    }
  }
`;

export const GET_COMPANIES = gql`
  query Companies {
    companies {
      name
      id
      followers {
        _id
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation AddFavorite($eventId: ID!) {
    addFavorite(eventId: $eventId)
  }
`;
export const DELETE_FAVORITE = gql`
  mutation DeleteFavorite($eventId: ID!) {
    deleteFavorite(eventId: $eventId)
  }
`;

// follow company
export const FOLLOW_COMPANY = gql`
  mutation FollowCompany($companyid: ID!) {
    followCompany(companyid: $companyid)
  }
`;
// unfollow company
export const UNFOLLOW_COMPANY = gql`
  mutation UnfollowCompany($companyid: ID!) {
    unfollowCompany(companyid: $companyid)
  }
`;
export const BUY_TICKET = gql`
  mutation Mutation($eventid: String) {
    buyTicket(eventid: $eventid)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation Mutation($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const SIGN_UP = gql`
  mutation Mutation($user: addUserInput!) {
    signup(user: $user) {
      token
      user {
        firstName
        lastName
        email
        _id
      }
    }
  }
`;
