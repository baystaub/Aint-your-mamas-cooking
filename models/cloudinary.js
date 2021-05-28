const util = require('util');
const Formidable = require('formidable');
const cloudinary = require('cloudinary');
const submit = (`.submit`);
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const post = () => {
  const form = new Formidable();

  form.parse(req, (err, fields, files) => {
    cloudinary.uploader.upload(files.upload.path, (result) => {
      console.log(result);
      if (result.public_id) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write('received upload:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
      }
    });
  });
  return;
};

const search = () => {
  cloudinary.v2.search
    .expression(
      `resource_type:image AND tags=${submit} AND uploade_at>1d AND bytes>1m`
    )
    .sort_by(`public_id`, `desc`)
    .max_results(1)
    .execute()
    .then((result) => console.log(result));
};

module.exports = cloudinary;
