import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CompetitionTable1589974897341 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'Competition',
            columns: [
                {
                    name: 'name',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'createdAt',
                    type: 'TIMESTAMP',
                    default: 'now()',
                    isNullable: false,
                },
                {
                    name: 'updatedAt',
                    type: 'TIMESTAMP',
                    default: 'now()',
                    isNullable: false,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('Competition', true);
    }
}
