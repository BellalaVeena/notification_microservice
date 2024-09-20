import { MigrationInterface, QueryRunner } from 'typeorm';

export class Notification1726822644416 implements MigrationInterface {
  name = 'Notification1726822644416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "event_type_id" integer NOT NULL, "time_stamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1e31bcbab78912cd044350cd7c3" FOREIGN KEY ("event_type_id") REFERENCES "notification_settings"("id") ON DELETE NO ACTION ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1e31bcbab78912cd044350cd7c3"`
    );
    await queryRunner.query(`DROP TABLE "notification"`);
  }
}
