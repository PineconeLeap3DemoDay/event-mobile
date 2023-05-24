export interface User {
  email: string
  lastName: string
  password: string
  firstName: string
  _id: string
}
export interface Event {
  title: string
  _id: string
  id: string
  about: string
  location: string
  thumbnail: string,
  startDate: number,
  organizer: {
    id: string
    name: string,
    followers: [User]
  }
  city: {
    name
  },
  country: {
    name
  }
}
export interface Category {
  id: string
  name: string
  Icon?: any
}
export interface Company {
  name: string
  registrationnumber: string
  rating: string
  id: string
  followers: [User]
}