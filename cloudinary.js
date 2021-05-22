var cloudinary = require('cloudinary').v2;
var uploader = ('.test');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_Key: process.env.cloudkey,
  api_secret: process.env.cloudsecret,
});

function upload(file, options, callback);
