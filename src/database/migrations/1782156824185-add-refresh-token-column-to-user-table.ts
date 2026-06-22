import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenColumnToUserTable1782156824185 implements MigrationInterface {
    name = 'AddRefreshTokenColumnToUserTable1782156824185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`refreshTokenHash\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`refreshTokenHash\``);
    }

}
