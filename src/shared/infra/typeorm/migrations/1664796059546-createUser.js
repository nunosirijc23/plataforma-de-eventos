const { Table } = require("typeorm");

module.exports = class createUser1664796059546 {
    async up(queryRunner) {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "phone",
                        type: "int"
                    },
                    {
                        name: "photo",
                        type: "text",
                    },
                    {
                        name: "password",
                        type: "text"
                    },
                    {
                        name: "create_at",
                        type: "date",
                        default: "now()"
                    }
                ]
            })
        );
    }

    async down(queryRunner) {
        await queryRunner.dropTable("user");
    }
}
