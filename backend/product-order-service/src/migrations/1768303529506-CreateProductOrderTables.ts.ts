import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProductOrderTables1768303529506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Product table
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'price', type: 'decimal' },
          { name: 'image', type: 'varchar', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // Create Order table
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'customerId', type: 'int' },
          { name: 'productId', type: 'int' },
          { name: 'quantity', type: 'int' },
          { name: 'status', type: 'varchar', default: `'confirmed'` },
        ],
      }),
    );

    // Add foreign key: order.productId -> product.id
    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key first
    const table = await queryRunner.getTable('order');
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf('productId') !== -1);
    if (foreignKey) await queryRunner.dropForeignKey('order', foreignKey);

    // Drop tables
    await queryRunner.dropTable('order');
    await queryRunner.dropTable('product');
  }
}
