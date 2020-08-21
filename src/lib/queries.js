import { gql } from '@apollo/client';

//######################### Query #########################

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

export const GET_MY_REQUESTS = gql`
query GetMyRequests($author:ID!){
  getMyRequests(author:$author){
    _id
    author{
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

export const GET_BIDS_IN_REQUEST = gql`
query GetBidsInRequest($request:ID){
  getBidsInRequest(request:$request){
    _id
    author{
      _id
      name
      profile{
        phone
      }
    }
    price
    state
  }
}
`

export const GET_MY_ROOM = gql`
query GetMyRoom($request:ID,$seller:ID){
  getMyRoom(request:$request,seller:$seller){
    _id
    messages{
      name
      message
      createdAt
    }
  }
}
`

export const GET_MY_PROFILE = gql`
query GetMyProfile($user:ID){
  getMyProfile(user:$user){
    user{
      name
      email
    }
    phone
    profileImage
    exampleImages
    text
    reviews{
      name
      text
      rating
    }
  }
}
`

export const GET_MY_PROFILE_IMAGE = gql`
query GetMyProfile($user:ID){
  getMyProfile(user:$user){
    profileImage
  }
}
`

 // ######################### Mutation #########################

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

export const CHOICE_ONE_BID = gql`
mutation ChoiceOneBid($bid:ID,$request:ID){
  choiceOneBid(bid:$bid,request:$request)
}
`

export const TRADE_COMPLETE = gql`
mutation TradeComplete($bid:ID,$request:ID){
  tradeComplete(bid:$bid,request:$request)
}
`

export const TRADE_CANCLE = gql`
mutation TradeCancle($request:ID){
  tradeCancle(request:$request)
}
`

export const BID_CANCLE = gql`
mutation BidCancle($request:ID,$author:ID){
  bidCancle(request:$request,author:$author)
}
`

export const REQUEST_TIME_OVER = gql`
mutation RequestTimeOver($request:ID){
  requestTimeOver(request:$request)
}
`

export const EDIT_MY_PROFILE = gql`
mutation EditMyProfile($input:ProfileInput){
  editMyProfile(input:$input)
}
`

//######################### Subscription #########################

export const START_CHAT = gql`
subscription NewMessage($room:ID){
  newMessage(room:$room){
    name
    message
    createdAt
  }
}
`

