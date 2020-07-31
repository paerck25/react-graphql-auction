import { gql } from '@apollo/client';

//Query

export const GET_ALL_USERS = gql`
query GetAllUsers{
  getAllUsers{
    _id
    name
    email
  }
}
`

export const GET_USER = gql`
query GetOneUser($email:String!) {
  getUser(email:$email){
    _id
    name
    email
  }
}
`

export const GET_ALL_REQUESTS = gql`
query GetAllRequests{
  getAllRequests{
    _id
    author {
      _id
      name
    }
    detail
    category
    requestedAt
    deadLine
    hopeDate
    state
    tags
  }
}
`

export const GET_MY_BIDS = gql`
query GetMyBids($author:ID!){
  getMyBids(author:$author){
    request{
      _id
      author{
        _id
        name
        email
      }
      detail
      category
      deadLine
      hopeDate
      tags
      requestedAt
      state
    }
    state
  }
}
`

export const GET_MY_ROOM_LIST_FOR_SELLER = gql`
query GetMyRoomListForSeller($seller:ID){
  getMyRoomListForSeller(seller:$seller){
    _id
    request{
      author{
        _id
        name
      }
      category
    }
    seller{
      _id
      name
    }
    messages{
      name
      message
      createdAt
    }
  }
}
`

//Mutation

export const SEND_REQUEST = gql`
mutation SendRequest($input:RequestInput){
  sendRequest(input:$input)
}
`



export const SEND_BID = gql`
mutation SendBid($input:BidInput){
  sendBid(
    input:$input
  )
}
`

export const CHOICE_ONE_BID = gql`
mutation ChoiceOneBid($bid:ID,$request:ID){
  choiceOneBid(bid:$bid,request:$request)
}
`



export const LOGIN = gql`
mutation Login($email:String!,$pwd:String!){
  login(email:$email,pwd:$pwd){
    _id
    name
    is_seller
    result
  }
}
`

export const SIGNUP = gql`
mutation SignUp($input:UserInput!){
  signUp(input:$input)
}
`

export const SEND_NEW_MESSAGE = gql`
mutation SendNewMessage($input:MessageInput){
  sendNewMessage(input:$input){
    name
    message
    createdAt
  }
}
`

//Subscription

export const START_CHAT = gql`
subscription NewMessage($room:ID){
  newMessage(room:$room){
    name
    message
    createdAt
  }
}
`

