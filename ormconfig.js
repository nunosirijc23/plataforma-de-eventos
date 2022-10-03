module.exports = {
    type: 'mysql',
    host: 'database',
    port: 3306,
    username: 'root',
    password: 'root1234',
    database: 'events',
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
}