const typeDefs = `
type Query {
    getAllUsers: [User]
    getUser(email: String!) : User
    getMyProfile(user: ID) : Profile
    getAllRequests(category:String,page:Int,tags:[String],sort:Sort): AllRequest
    getMyRequests(author: ID!) : [Request]
    getMyBids(author: ID!) : [Bid]
    getBidsInRequest(request: ID) : [Bid]
    getMyRoom(request: ID,seller: ID) : Room
}

type Mutation {
    login(email: String!, pwd: String!) : LoginData!
    signUp(input: UserInput!) : Boolean!
    editMyProfile(input: ProfileInput) : Boolean!
    sendRequest(input: RequestInput) : Boolean!
    sendBid(input: BidInput) : String!
    sendNewMessage(input: MessageInput) : Message
    choiceOneBid(bid: ID, request: ID) : Boolean
    tradeComplete(bid: ID, request: ID) : Boolean
    tradeCancel(request: ID) : Boolean
    bidCancel(request: ID, author:ID):Boolean
    requestTimeOver(request:ID):Boolean
    expertRegister(user:UserInput,profile:ProfileInput) : Boolean
    postReview(input : ReviewInput) : Boolean
}

input Sort {
    deadLine : Int
    requestedAt : Int
}

type Subscription {
    newMessage(room : ID) : Message
}

type LoginData {
    _id: ID
    name: String
    email: String
    is_seller: Boolean
    result: String!
}

type User {
    _id: ID!
    name: String!
    email: String!
    pwd: String!
    is_seller: Boolean!
    profile: Profile
}

input UserInput {
    _id: ID
    name: String
    email: String
    pwd: String
    is_seller: Boolean
}

type Profile {
    _id: ID
    user: User
    phone: String
    profileImage: String
    exampleImages: [String]
    text: String
    reviews: [Review]
    avgRating: Float
}

input ProfileInput {
    user: ID
    phone: String
    profileImage: String
    exampleImages: [String]
    text: String
}

type Review {
    _id: ID
    name: String
    text: String
    rating: Float
}

input ReviewInput {
    seller : ID
    request_id : ID
    category: String
    name: String
    text: String
    rating: Float
}

type Request {
    _id: ID
    author: User
    detail: String
    category: String
    requestedAt: String
    deadLine: Float
    hopeDate: String
    state: String
    tags: [String]
}

type AllRequest {
    requests : [Request]
    count : Int
}

input RequestInput {
    author: ID
    detail: String
    category: String
    deadLine: Float
    hopeDate: String
    tags: [String]
}

type Bid {
    _id: ID
    request: Request
    author: User
    price: String
    state: String
}

input BidInput {
    request: ID
    author: ID
    name: String
    price: String
}

type Room {
    _id: ID
    request: Request
    seller: User
    messages: [Message]
}

type Message {
    room: Room
    name: String
    message: String
    createdAt: String
}

input MessageInput {
    room: ID
    name: String
    message: String
}
`

module.exports = typeDefs;
