import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm';
import { Competition } from './entities/competition.entity';
import { User } from './entities/user.entity';

/**
 * Database manager class
 */
export class Database {
    private connectionManager: ConnectionManager;
    private static connectionOptions: ConnectionOptions = {
        type: 'postgres',
        host: 'terraform-20200603083614617700000001.cabniyxy5ruo.eu-west-1.rds.amazonaws.com',
        port: 5432,
        username: 'root',
        password: 'Vdu1mucx%xAiF0Rq',
        database: 'sam_ranks',
        entities: [
            Competition,
            User,
        ],
    };

    constructor() {
        this.connectionManager = getConnectionManager();
    }

    public async getConnection(): Promise<Connection> {
        const CONNECTION_NAME = `default`;

        let connection: Connection;
        if (this.connectionManager.has(CONNECTION_NAME)) {
            connection = await this.connectionManager.get(CONNECTION_NAME);
            console.log('IS CONNECTED', connection.isConnected);
            console.log(connection.entityMetadatas);
            if (!connection.isConnected) {
                connection = await connection.connect()
            }
        }
        else {
            connection = await createConnection(Database.connectionOptions);
        }

        return connection;
    }
}