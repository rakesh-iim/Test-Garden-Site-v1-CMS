const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const Content = require('../models/Content');
const Media = require('../models/Media');
const { env } = require('../config/env');

const memoryState = {
  users: [],
  content: new Map(),
  media: new Map(),
  initialized: false,
};

const createMemoryUserRecord = async ({ name, email, password, role }) => ({
  _id: new mongoose.Types.ObjectId().toString(),
  name,
  email: email.toLowerCase(),
  passwordHash: await bcrypt.hash(password, 10),
  role,
});

const toMemoryUserResponse = (user, includePassword = false) => ({
  _id: user._id,
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  ...(includePassword
    ? {
        password: user.passwordHash,
        comparePassword: async (candidatePassword) => bcrypt.compare(candidatePassword, user.passwordHash),
      }
    : {}),
});

const initializeMemoryStore = async () => {
  if (memoryState.initialized) return;

  const adminName = process.env.DEV_ADMIN_NAME || process.env.ADMIN_NAME || 'Admin';
  const adminEmail = (process.env.DEV_ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const adminPassword = process.env.DEV_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'change-this-password';

  memoryState.users.push(await createMemoryUserRecord({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
  }));

  memoryState.initialized = true;
  console.log(`Initialized in-memory admin user: ${adminEmail}`);
};

const initializeStore = async () => {
  if (env.useInMemoryDb) {
    await initializeMemoryStore();
    return;
  }

  await mongoose.connect(env.mongoUri);
};

const closeStore = async () => {
  if (!env.useInMemoryDb) {
    await mongoose.connection.close();
  }
};

const findUserByEmail = async (email, options = {}) => {
  const normalizedEmail = String(email).toLowerCase();

  if (env.useInMemoryDb) {
    const user = memoryState.users.find((entry) => entry.email === normalizedEmail);
    return user ? toMemoryUserResponse(user, options.includePassword) : null;
  }

  let query = User.findOne({ email: normalizedEmail });
  if (options.includePassword) {
    query = query.select('+password');
  }
  return query;
};

const findUserById = async (id, options = {}) => {
  if (env.useInMemoryDb) {
    const user = memoryState.users.find((entry) => entry._id === String(id));
    return user ? toMemoryUserResponse(user, options.includePassword) : null;
  }

  let query = User.findById(id);
  if (options.includePassword) {
    query = query.select('+password');
  }
  return query;
};

const createUser = async ({ name, email, password, role }) => {
  if (env.useInMemoryDb) {
    const user = await createMemoryUserRecord({ name, email, password, role });
    memoryState.users.push(user);
    return toMemoryUserResponse(user, false);
  }

  return User.create({ name, email, password, role });
};

const findContentByPageId = async (pageId) => {
  const normalizedPageId = String(pageId).toLowerCase();

  if (env.useInMemoryDb) {
    return memoryState.content.get(normalizedPageId) || null;
  }

  return Content.findOne({ pageId: normalizedPageId });
};

const upsertContentByPageId = async (pageId, data) => {
  const normalizedPageId = String(pageId).toLowerCase();

  if (env.useInMemoryDb) {
    const content = { pageId: normalizedPageId, data };
    memoryState.content.set(normalizedPageId, content);
    return content;
  }

  return Content.findOneAndUpdate(
    { pageId: normalizedPageId },
    { $set: { data } },
    { new: true, upsert: true }
  );
};

const listMedia = async () => {
  if (env.useInMemoryDb) {
    return Array.from(memoryState.media.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return Media.find().sort({ createdAt: -1 });
};

const createMedia = async (record) => {
  if (env.useInMemoryDb) {
    const id = new mongoose.Types.ObjectId().toString();
    const media = {
      _id: id,
      id,
      ...record,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryState.media.set(id, media);
    return media;
  }

  return Media.create(record);
};

const findMediaById = async (id) => {
  if (env.useInMemoryDb) {
    return memoryState.media.get(String(id)) || null;
  }

  return Media.findById(id);
};

const deleteMediaById = async (id) => {
  if (env.useInMemoryDb) {
    const media = memoryState.media.get(String(id)) || null;
    if (media) {
      memoryState.media.delete(String(id));
    }
    return media;
  }

  return Media.findByIdAndDelete(id);
};

module.exports = {
  initializeStore,
  closeStore,
  findUserByEmail,
  findUserById,
  createUser,
  findContentByPageId,
  upsertContentByPageId,
  listMedia,
  createMedia,
  findMediaById,
  deleteMediaById,
};
