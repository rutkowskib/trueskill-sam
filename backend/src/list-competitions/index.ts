import 'reflect-metadata';
import { Connection } from 'typeorm';
import { Database } from '../libs/database';
import { Competition } from '../libs/database/entities/competition.entity';
import { buildResponse } from '../libs/lambda';

export const handler = async () => {
    try {
        const connection: Connection = await new Database().getConnection();
        const competitions = await connection.getRepository(Competition).find();
        return buildResponse(200, competitions);
    } catch (err) {
        console.log(err);
        return err;
    }
};
