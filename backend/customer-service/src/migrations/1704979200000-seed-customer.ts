import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedCustomer1704979200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('password123', 10);

    await queryRunner.query(`
      INSERT INTO customer (name, email, phone, password)
      VALUES ('Demo User', 'demo@example.com', '9999999999', '${password}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM customer WHERE email='demo@example.com'`);
  }
}
