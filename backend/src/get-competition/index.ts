import 'reflect-metadata';
import { APIGatewayEvent } from 'aws-lambda';
import { Connection } from 'typeorm';
import { Database } from '../libs/database';
import { Competition } from '../libs/database/entities/competition.entity';
import { buildResponse } from '../libs/lambda';

export const handler = async (event: APIGatewayEvent) => {
    try {
        const { name } = event.pathParameters;
        const connection: Connection = await new Database().getConnection();
        const competition = await connection.getRepository(Competition).findOne({
            relations: [ 'users' ],
            where: { name },
        });
        return buildResponse(200, competition);
    } catch (err) {
        console.log(err);
        return err;
    }
};
