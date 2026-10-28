/*
 * Runs the API against a temporary in-memory MongoDB for local testing.
 * All data is lost when the process stops. Use MONGODB_URI for real data.
 */
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

(async () => {
    const mongo = await MongoMemoryServer.create({ instance: { launchTimeout: 60000 } });
    process.env.MONGODB_URI = mongo.getUri('kamglobal-dev');
    process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'teju@kamglobalai.com';
    process.env.ADMIN_NAME = process.env.ADMIN_NAME || 'Super Admin';
    process.env.PORT = process.env.PORT || '5001';
    console.log(`In-memory MongoDB ready. Sign in at /admin with ${process.env.ADMIN_EMAIL}`);

    const stop = async () => {
        await mongo.stop();
        process.exit(0);
    };
    process.on('SIGINT', stop);
    process.on('SIGTERM', stop);

    require('../src/index');
})();
