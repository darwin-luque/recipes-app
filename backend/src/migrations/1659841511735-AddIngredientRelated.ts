import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIngredientRelated1659841511735 implements MigrationInterface {
    name = 'AddIngredientRelated1659841511735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ingredient_recipe_unit_enum" AS ENUM('g', 'kg', 'mg', 'μg', 'ml', 'l', 'cups', 'tbsp', 'tsp', 'pinch', 'lbs', 'oz')`);
        await queryRunner.query(`CREATE TABLE "ingredient_recipe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "unit" "public"."ingredient_recipe_unit_enum" NOT NULL, "ingredientId" uuid, "recipeId" uuid, CONSTRAINT "PK_1a884e9b70245ac229ded0d8248" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_a150dc64a33e157e205db9d8673" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "typeId" uuid, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredient_recipe" ADD CONSTRAINT "FK_4220083de9256e6df0c7ae6e146" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient_recipe" ADD CONSTRAINT "FK_df97e731d3c4ab4b7e1a67f27e8" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_765dbb42d8f32b12d882331be0b" FOREIGN KEY ("typeId") REFERENCES "ingredient_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_765dbb42d8f32b12d882331be0b"`);
        await queryRunner.query(`ALTER TABLE "ingredient_recipe" DROP CONSTRAINT "FK_df97e731d3c4ab4b7e1a67f27e8"`);
        await queryRunner.query(`ALTER TABLE "ingredient_recipe" DROP CONSTRAINT "FK_4220083de9256e6df0c7ae6e146"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "ingredient_type"`);
        await queryRunner.query(`DROP TABLE "ingredient_recipe"`);
        await queryRunner.query(`DROP TYPE "public"."ingredient_recipe_unit_enum"`);
    }

}
