import 'reflect-metadata';
import {
    APIGatewayEvent,
    Context,
} from "aws-lambda";
import { Database } from '../libs/database';
import { Competition } from '../libs/database/entities/competition.entity';
import { Connection } from 'typeorm';
import { buildResponse } from '../libs/lambda';

export const handler = async (event: APIGatewayEvent, context: Context) => {
    const body = JSON.parse(event.body || '');
    const connection: Connection = await new Database().getConnection();
    const competitionRepository = await connection.getRepository(Competition);

    const competitionEntity = competitionRepository.merge(new Competition(), { name: body.name });
    const competition = await competitionRepository.save(competitionEntity);

    return buildResponse(200, competition);
};
