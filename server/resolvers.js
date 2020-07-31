const User = require('./models/user');
const Profile = require('./models/profile');
const Request = require('./models/request');
const Bid = require('./models/bid');
const Room = require('./models/room');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        getAllUsers: () => {
            const result = User.find();
            return result
        },

        getUser: (root, args) => {
            const result = User.findOne({ email: args.email })
            return result;
        },

        getProfile: (root, args) => {
            const result = Profile.findOne({ user: args.user }).populate('user')
            return result;
        },

        getAllRequests: () => {
            const result = Request.find().populate('author', '_id name');
            return result;
        },

        getMyRequests: (root, args) => {
            const result = Request.find({ author: args.author }).populate('author')
            return result;
        },

        getMyBids: (root, args) => {
            const result = Bid.find({ author: args.author }).populate({
                path: 'request',
                populate: { path: 'author', select: '_id name email' }
            });
            return result;
        },

        getBidsInRequest: (root, args) => {
            const result = Bid.find({ request: args.request }).populate('author').populate('request')
            return result;
        },

        getMyRoomList: (root, args) => {
            const result = Room.find({ request: args.request }).populate('seller').populate('request')
            return result;
        },

        getMyRoomListForSeller: (root, args) => {
            const result = Room.find({ seller: args.seller })
                .populate({
                    path: 'request',
                    select: '_id author category',
                    populate: { path: 'author', select: '_id name' }
                })
                .populate('seller', '_id name');
            return result;
        },
    },

    Mutation: {
        login: (root, args) => {
            const result = User.findOne({ email: args.email })
                .then(async user => {
                    const str = bcrypt.compare(args.pwd, user.pwd)
                        .then((is_true) => {
                            if (is_true) {
                                return {
                                    _id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    is_seller: user.is_seller,
                                    result: '로그인 성공',
                                }
                            } else {
                                return { result: '비밀번호가 다릅니다.' }
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    return str;
                })
                .catch(err => {
                    console.log(err);
                    return { result: '존재하지 않는 아이디입니다.' }
                })
            return result;
        },

        signUp: async (root, args) => {
            let pwd;
            await bcrypt.hash(args.input.pwd, 10)
                .then(hash => {
                    pwd = hash;
                })
                .catch(err => {
                    console.log(err);
                })
            const result = await User.create({ ...args.input, pwd })
                .then(() => {
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                })
            return result;
        },

        saveProfile: (root, args) => {
            const result = Profile.create(args.input)
                .then(() => {
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                })
            return result;
        },

        sendRequest: (root, args) => {
            const req = {
                ...args.input,
                requestedAt: new Date().toLocaleDateString(),
                state: '경매 진행중',
            }
            const result = Request.create(req)
                .then(() => {
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                })
            return result;
        },

        sendBid: (root, args) => {
            const result = Bid.findOne({ request: args.input.request, author: args.input.author })
                .then(data => {
                    if (data === null) {
                        const str = Bid.create(args.input)
                            .then((data) => {
                                const now = new Date().toTimeString().substr(0, 8);
                                const req = {
                                    request: args.input.request,
                                    seller: args.input.author,
                                    messages: [{
                                        room: data._id,
                                        name: 'system',
                                        message: `고객님의 요청에 대한 전문가의 제시 금액 : ${args.input.price}원 입니다. 전문가와 상담하실 수 있습니다!`,
                                        createdAt: now,
                                    }]
                                }
                                Room.create(req);
                                return '입찰완료'
                            })
                            .catch((err) => {
                                console.log(err);
                                return '에러'
                            })
                        return str
                    } else {
                        return '이미 입찰하였습니다.'
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            return result;
        },

        choiceOneBid: (root, args) => {
            Bid.updateOne({ _id: args.input.bid }, { $set: { state: true } })
                .then(() => {
                    console.log('Bid update');
                })
                .catch((err) => {
                    console.log(err);
                })
            Request.updateOne({ _id: args.input.request }, { $set: { state: '거래 진행중' } })
                .then(() => {
                    console.log('Request update');
                })
                .catch((err) => {
                    console.log(err);
                })
            return true;
        },

        sendNewMessage: async (root, args, { pubsub }) => {
            const now = new Date().toTimeString().substr(0, 8);
            const chat = await {
                room: args.input.room,
                name: args.input.name,
                message: args.input.message,
                createdAt: now,
            }
            Room.updateOne({ _id: args.input.room }, { $push: { messages: chat } })
                .then(() => {
                    pubsub.publish(`${args.input.room}`, chat)
                })
                .catch(err => {
                    console.log(err);
                })
            return chat;
        }
    },

    Subscription: {
        newMessage: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(`${args.room}`)
            },
            resolve: (payload) => {
                return payload;
            }
        }
    }
}

module.exports = resolvers;