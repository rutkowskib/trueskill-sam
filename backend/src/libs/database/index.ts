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
        host: 'postgres',
        port: 5432,
        username: 'nodeuser',
        password: 'password',
        database: 'serverless-ranks',
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