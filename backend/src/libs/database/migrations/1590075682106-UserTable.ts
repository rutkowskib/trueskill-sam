import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable1590075682106 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'User',
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
                {
                    name: 'mu',
                    type: 'real',
                    isNullable: false,
                    default: '25.0'
                },
                {
                    name: 'sigma',
                    type: 'real',
                    isNullable: false,
                    default: '8.33'
                },
                {
                    name: 'competitionName',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
            foreignKeys: [
                {
                    name: 'userCompetitionIDFK',
                    columnNames: ['competitionName'],
                    referencedColumnNames: ['name'],
                    referencedTableName: 'Competition',
                    onDelete: 'CASCADE',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('User', true);
    }
}
