const { GraphQLServer, PubSub } = require('graphql-yoga');
const pubsub = new PubSub();
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const { upload, upload2 } = require('./imageUpload');
const cors = require('cors');
const Profile = require('./models/profile');
const express = require('express');


mongoose.connect("mongodb+srv://testDB:1234567890@cluster0-3zzdx.mongodb.net/graph?retryWrites=true&w=majority",
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
    typeDefs: './server/schema.graphql',
    resolvers,
    context: { pubsub },
})

server.express.use(cors());
server.express.use('/start',express.static('build'));

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

// server.express.post('/image', upload2.fields([{ name: 'profileImage' }, { name: 'exampleImages' }]), (req, res, next) => {
//     let profileImage = '';
//     let exampleImages = [];
//     if(req.files.profileImage){
//         profileImage = req.files.profileImage[0].location;
//     }
//     if(req.files.exampleImages){
//         req.files.exampleImages.map((obj)=>{
//             exampleImages.push(obj.location);
//         })
//     }
//     let exPreview = req.body.exPreview;
//     console.log('body!!!!!!!!!!',exPreview);
//     console.log(profileImage);
//     console.log(exampleImages);
// })

server.start(() => console.log('http://localhost:4000'))