const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require("aws-sdk");

const s3 = new AWS.S3({ 
    accessKeyId: 'AKIA27RRYWPWGAOI54R5', 
    secretAccessKey: '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', 
    region: 'ap-northeast-2', 
});

const storage = multerS3({ 
    s3: s3,
    bucket: 'project-portfolio-upload',
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname }) 
    },
    key: function (req, file, cb) { 
        cb(null, `uploads/${Date.now()}_${file.originalname}`)
    },
})


exports.upload = multer({ storage: storage });
exports.upload2 = multer({dest : './public/img'});


