import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelationCategoriesAndTransactions1587325894315
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'categories',
      new TableForeignKey({
        name: 'CategoryKey',
        columnNames: ['category_id'],
        referencedTableName: 'transactions',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('categories', 'CategoryKey');
  }
}
