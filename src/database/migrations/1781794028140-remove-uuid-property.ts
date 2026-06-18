import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUuidProperty1781794028140 implements MigrationInterface {
    name = 'RemoveUuidProperty1781794028140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`uuid\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`uuid\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`uuid\` varchar(36) NOT NULL`);
    }

}
