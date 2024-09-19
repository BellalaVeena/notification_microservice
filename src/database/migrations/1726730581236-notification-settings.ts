import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotificationSettings1726730581236 implements MigrationInterface {
  name = 'NotificationSettings1726730581236';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notification_settings" ("id" SERIAL NOT NULL, "event_type" character varying NOT NULL, "muted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_45e24a4d4b6d681dea0fb74dabe" UNIQUE ("event_type"), CONSTRAINT "PK_d131abd7996c475ef768d4559ba" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notification_settings"`);
  }
}
