import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountTable1766982230470 implements MigrationInterface {
    name = 'AddAccountTable1766982230470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "firts_name" TO "first_name"`);
        await queryRunner.query(`CREATE TABLE "account_type" ("id" SERIAL NOT NULL, "name" text NOT NULL, "delete_at" TIMESTAMP, CONSTRAINT "PK_215ed371eba21a3ec30c2cfa1de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "balance" text NOT NULL, "number_account" text, "number_target" text, "delete_at" TIMESTAMP, "user_id" uuid, "account_type_id" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_5cbb48ee09daed534076d5ef88a" FOREIGN KEY ("account_type_id") REFERENCES "account_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_5cbb48ee09daed534076d5ef88a"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "account_type"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "first_name" TO "firts_name"`);
    }

}
