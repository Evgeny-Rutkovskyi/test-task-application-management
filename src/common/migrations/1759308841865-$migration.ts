import { MigrationInterface, QueryRunner } from "typeorm";

export class  $migration1759308841865 implements MigrationInterface {
    name = ' $migration1759308841865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."statements_status_enum" AS ENUM('new', 'in_progress', 'done')`);
        await queryRunner.query(`CREATE TABLE "statements" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "status" "public"."statements_status_enum" NOT NULL DEFAULT 'new', CONSTRAINT "PK_7f53bcddeb706df7ea7eec10b8d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "statements"`);
        await queryRunner.query(`DROP TYPE "public"."statements_status_enum"`);
    }

}
