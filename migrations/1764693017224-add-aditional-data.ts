import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAditionalData1764693017224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "roles" (id,name) VALUES ('1','super_admin'), ('2','admin'), ('3','user')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "roles";`);
    }

}
