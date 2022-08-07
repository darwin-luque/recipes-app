import { MigrationInterface, QueryRunner } from "typeorm";

export class CompleteRecipeRelated1659842441855 implements MigrationInterface {
    name = 'CompleteRecipeRelated1659842441855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "step" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "position" integer NOT NULL, "body" character varying NOT NULL, "recipeId" uuid, CONSTRAINT "PK_70d386ace569c3d265e05db0cc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "step" ADD CONSTRAINT "FK_e50600a62b8ece3b996d58331f4" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_991484dd8189182dafe91e44413" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_991484dd8189182dafe91e44413"`);
        await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_e50600a62b8ece3b996d58331f4"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "step"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
