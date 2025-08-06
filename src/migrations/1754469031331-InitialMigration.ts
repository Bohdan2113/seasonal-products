import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754469031331 implements MigrationInterface {
    name = 'InitialMigration1754469031331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "parentId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "label" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5692ac5348861d3776eb5843672" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" jsonb, "description" character varying, "images" text array NOT NULL DEFAULT '{}', "price" double precision NOT NULL, "categoryId" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_labels_label" ("itemId" integer NOT NULL, "labelId" integer NOT NULL, CONSTRAINT "PK_321315024988351a396a9d42b37" PRIMARY KEY ("itemId", "labelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b964cfc25b67b66bee687424bb" ON "item_labels_label" ("itemId") `);
        await queryRunner.query(`CREATE INDEX "IDX_196d7588c22dd6bc5c547e5e4c" ON "item_labels_label" ("labelId") `);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_c0c8f47a702c974a77812169bc2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_labels_label" ADD CONSTRAINT "FK_b964cfc25b67b66bee687424bbe" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_labels_label" ADD CONSTRAINT "FK_196d7588c22dd6bc5c547e5e4c7" FOREIGN KEY ("labelId") REFERENCES "label"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_labels_label" DROP CONSTRAINT "FK_196d7588c22dd6bc5c547e5e4c7"`);
        await queryRunner.query(`ALTER TABLE "item_labels_label" DROP CONSTRAINT "FK_b964cfc25b67b66bee687424bbe"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_c0c8f47a702c974a77812169bc2"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_196d7588c22dd6bc5c547e5e4c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b964cfc25b67b66bee687424bb"`);
        await queryRunner.query(`DROP TABLE "item_labels_label"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "label"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
