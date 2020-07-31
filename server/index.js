const { GraphQLServer,PubSub } = require('graphql-yoga');
const pubsub = new PubSub();
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://testDB:1234567890@cluster0-3zzdx.mongodb.net/graph?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

mongoose.connection.on('open',()=>{
    console.log('DB Connected');
})

const server = new GraphQLServer({
    typeDefs : './server/schema.graphql',
    resolvers,
    context : {pubsub},
})

server.start(() => console.log('http://localhost:4000'))