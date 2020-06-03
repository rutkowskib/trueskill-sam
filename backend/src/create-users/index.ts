import 'reflect-metadata';
import {
    APIGatewayEvent,
} from "aws-lambda";
import { Database } from '../libs/database';
import { User } from '../libs/database/entities/user.entity';
import { Connection } from 'typeorm';
import { buildResponse } from '../libs/lambda';

export const handler = async (event: APIGatewayEvent) => {
    const body = JSON.parse(event.body || '');
    const connection: Connection = await new Database().getConnection();
    const userRepository = await connection.getRepository(User);

    try {
        const user = await userRepository.save({
            name: body.name,
            mu: body.mu,
            sigma: body.sigma,
            competitionName: body.competitionName,
        });
        return buildResponse(200, user);
    } catch (e) {
        console.log(e);
        return e;
    }
};
