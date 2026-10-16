/*
 * Runs the API against a temporary in-memory MongoDB for local testing.
 * All data is lost when the process stops. Use MONGODB_URI for real data.
 */
const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
    const mongo = await MongoMemoryServer.create({ instance: { launchTimeout: 60000 } });
    process.env.MONGODB_URI = mongo.getUri('kamglobal-dev');
    process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@kamglobal.local';
    process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeMe12345';
    process.env.ADMIN_NAME = process.env.ADMIN_NAME || 'Local Admin';
    process.env.PORT = process.env.PORT || '5001';
    console.log(`In-memory MongoDB ready. Sign in at /admin with ${process.env.ADMIN_EMAIL} / ${process.env.ADMIN_PASSWORD}`);

    const stop = async () => {
        await mongo.stop();
        process.exit(0);
    };
    process.on('SIGINT', stop);
    process.on('SIGTERM', stop);

    require('../src/index');
})();
