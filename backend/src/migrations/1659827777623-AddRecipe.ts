import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecipe1659827777623 implements MigrationInterface {
    name = 'AddRecipe1659827777623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "note" character varying, "videoPath" character varying, "nutritionValue" character varying, "totalCalories" integer, "prepTime" TIMESTAMP WITH TIME ZONE, "cookTime" TIMESTAMP WITH TIME ZONE NOT NULL, "postTime" TIMESTAMP WITH TIME ZONE, "servings" integer, "userId" uuid, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_fe30fdc515f6c94d39cd4bbfa76" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_fe30fdc515f6c94d39cd4bbfa76"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}
