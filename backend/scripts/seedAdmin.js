require('dotenv').config();

const { validateEnv, env } = require('../config/env');
const { initializeStore, closeStore, findUserByEmail, createUser } = require('../services/dataStore');

const run = async () => {
  validateEnv();

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required');
  }

  if (ADMIN_PASSWORD.length < 8) {
    throw new Error('ADMIN_PASSWORD must be at least 8 characters long');
  }

  if (env.useInMemoryDb) {
    throw new Error('seed:admin is not needed when USE_IN_MEMORY_DB=true');
  }

  await initializeStore();

  const existingUser = await findUserByEmail(ADMIN_EMAIL);
  if (existingUser) {
    console.log(`Admin user already exists: ${ADMIN_EMAIL}`);
    return;
  }

  await createUser({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin',
  });

  console.log(`Admin user created: ${ADMIN_EMAIL}`);
};

run()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeStore();
  });
