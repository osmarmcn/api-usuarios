import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePeopleTable1778880380122 implements MigrationInterface {
    name = 'CreatePeopleTable1778880380122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people" ("id" uuid NOT NULL, "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "cpf" character varying(11) NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "gender" character varying, "profession" character varying, "education" character varying, CONSTRAINT "UQ_c77e8752faa45901af2b245dff2" UNIQUE ("email"), CONSTRAINT "UQ_051da4f26641e2e7986ffc91497" UNIQUE ("cpf"), CONSTRAINT "UQ_1c8b1a1beea909ce21df2a11706" UNIQUE ("phone"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "people"`);
    }

}
