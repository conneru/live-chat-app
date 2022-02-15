const aws = require("aws-sdk");

const region = "us-west-2";
const bucketName = "discord-clone-chat";
const accessKeyId = "AKIATOCPJ6GS23F6HYWQ";
const secretAccessKey = "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";

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

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

module.exports = generateUploadURL;
