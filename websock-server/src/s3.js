const aws = require("aws-sdk");

const region = "us-west-2";
const bucketName = "discord-clone-chat";
const accessKeyId = process.env.S3_BUCKET_KEY;
const secretAccessKey = process.env.S3_BUCKET_SECRET;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
  sslEnabled: true,
});

async function generateUploadURL() {
  let key = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");

  const params = {
    Bucket: bucketName,
    Key: `${key}`,
    Expires: 60,
  };
  console.log("in upload");
  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

module.exports = generateUploadURL;
