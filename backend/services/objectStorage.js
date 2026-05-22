const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { env } = require('../config/env');

const localUploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(localUploadDir)) {
  fs.mkdirSync(localUploadDir, { recursive: true });
}

let s3Client;

const getS3Client = () => {
  if (!s3Client) {
    const endpoint = env.r2Endpoint || `https://${env.r2AccountId}.r2.cloudflarestorage.com`;
    s3Client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId: env.r2AccessKeyId,
        secretAccessKey: env.r2SecretAccessKey,
      },
    });
  }

  return s3Client;
};

const sanitizeBaseName = (filename) => (
  String(filename || 'upload')
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'upload'
);

const createStorageKey = (filename) => {
  const safeName = sanitizeBaseName(filename);
  return [env.r2KeyPrefix, new Date().toISOString().slice(0, 10), `${randomUUID()}-${safeName}`]
    .filter(Boolean)
    .join('/');
};

const uploadToLocal = async ({ file, baseUrl }) => {
  const fileName = `${Date.now()}-${randomUUID()}${path.extname(file.originalname || '')}`;
  const filePath = path.join(localUploadDir, fileName);
  await fs.promises.writeFile(filePath, file.buffer);

  return {
    provider: 'local',
    storageKey: fileName,
    url: `${baseUrl}/uploads/${fileName}`,
  };
};

const uploadToR2 = async ({ file }) => {
  const key = createStorageKey(file.originalname);
  await getS3Client().send(new PutObjectCommand({
    Bucket: env.r2BucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));

  const baseUrl = String(env.r2PublicBaseUrl || '').replace(/\/+$/, '');

  return {
    provider: 'r2',
    storageKey: key,
    url: `${baseUrl}/${key}`,
  };
};

const uploadMediaObject = async ({ file, baseUrl }) => {
  if (env.storageProvider === 'r2') {
    return uploadToR2({ file });
  }

  return uploadToLocal({ file, baseUrl });
};

const deleteLocalObject = async (storageKey) => {
  const filePath = path.join(localUploadDir, path.basename(storageKey));
  await fs.promises.rm(filePath, { force: true });
};

const deleteR2Object = async (storageKey) => {
  await getS3Client().send(new DeleteObjectCommand({
    Bucket: env.r2BucketName,
    Key: storageKey,
  }));
};

const deleteMediaObject = async (storageKey, provider) => {
  if (provider === 'r2') {
    await deleteR2Object(storageKey);
    return;
  }

  await deleteLocalObject(storageKey);
};

module.exports = {
  uploadMediaObject,
  deleteMediaObject,
};
