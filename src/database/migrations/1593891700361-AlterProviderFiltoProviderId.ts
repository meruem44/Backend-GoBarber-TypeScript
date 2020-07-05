import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export default class AlterProviderFiltoProviderId1593891700361 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider')
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider_id',
      type: 'uuid'
    }))

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'appointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'appointmentProvider')

    await queryRunner.dropColumn('appointments', 'provider_id')

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'uuid'
    }))
  }
}
