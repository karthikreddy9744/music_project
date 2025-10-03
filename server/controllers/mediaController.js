// music-project/server/controllers/mediaController.js
const multer = require('multer');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

// Configure AWS S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Configure multer to use S3 for storage
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Determine folder based on mime type
            const folder = file.mimetype.startsWith('image/') ? 'images' : 'audio';
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${folder}/` + file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    })
});

// Middleware to be used in the route
exports.uploadMiddleware = upload.single('file');

// Controller function to handle the upload
exports.handleUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Please upload a file.' });
    }
    const mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'audio';
    // Respond with information about the uploaded file
    res.status(201).json({
        mediaType: mediaType,
        url: req.file.location, // The public URL from S3
        description: req.file.originalname
    });
};