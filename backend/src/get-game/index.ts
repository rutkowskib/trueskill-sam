import 'reflect-metadata';
import { APIGatewayEvent } from 'aws-lambda';
import { Connection, In } from 'typeorm';
import { Database } from '../libs/database';
import { User } from '../libs/database/entities/user.entity';
import { generateTeams } from '../libs/trueskill';
import { buildResponse } from '../libs/lambda';

export const handler = async (event: APIGatewayEvent) => {
    try {
        const { name: competitionName } = event.pathParameters;
        const { players } = event.multiValueQueryStringParameters;
        const connection: Connection = await new Database().getConnection();
        const playersEntities = await connection.getRepository(User).find({
            where: {
                competitionName,
                name: In(players),
            },
        });
        const { teams } = generateTeams(playersEntities);
        return buildResponse(200, teams);
    } catch (err) {
        console.log(err);
        return err;
    }
};
