require('reflect-metadata');

const envFile=  process.env.TEST_ENV_FILE || '.env.test';
require('dotenv-safe').load(
    {
        path: envFile,
        allowEmptyValues: true
    }
);