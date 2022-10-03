const typeorm = require('typeorm');

module.exports = new typeorm.DataSource({
    migrationsTableName: 'migrations',
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
        "./src/modules/**/entities/typeorm/*.js"
    ],
    migrations: [
        "./src/shared/infra/typeorm/migrations/*.js"
    ],
    cli: {
        migrationsDir: "./src/shared/infra/typeorm/migrations"
    }
});