const { GraphQLServer, PubSub } = require('graphql-yoga');
const pubsub = new PubSub();
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const mongoose = require('mongoose');
const { upload, upload2 } = require('./imageUpload');
const Profile = require('./models/profile');
const express = require('express');
const path = require('path');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

mongoose.connection.on('open', () => {
    console.log('DB Connected');
})

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: { pubsub },
})

server.express.use(express.static('build'));

server.express.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'build' });
});

server.express.post('/image', upload.fields([{ name: 'profileImage' }, { name: 'exampleImages' }]), (req, res, next) => {
    let profileImage = '';
    let exampleImages = new Array;
    let exPreview = new Array;

    if(req.files.profileImage){
        profileImage = req.files.profileImage[0].location;
    } else {
        profileImage = req.body.profilePreview;
    }

    if(req.files.exampleImages){
        req.files.exampleImages.map((obj)=>{
            exampleImages.push(obj.location);
        })
    } else {
        exampleImages = [];
    }

    if(req.body.exPreview){
        exPreview = exPreview.concat(req.body.exPreview);
    } else {
        exPreview = [];
    }

    let exam = exPreview.concat(exampleImages);

    Profile.updateOne({ user: req.body.user }, { $set: {profileImage:profileImage,exampleImages: exam } })
        .then(() => {
            console.log('Profile Image Update!!!!!!!!');
        })
        .catch((err) => {
            console.log(err);
        })
})

server.start(() => console.log('http://localhost:4000'))