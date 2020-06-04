import 'reflect-metadata';
import { APIGatewayEvent } from 'aws-lambda';
import { buildResponse } from '../libs/lambda';
import { Connection, In } from 'typeorm';
import { Database } from '../libs/database';
import { User } from '../libs/database/entities/user.entity';
import { createNewRankings } from '../libs/trueskill';

export const handler = async (event: APIGatewayEvent) => {
    try {
        const { name: competitionName } = event.pathParameters;
        const body = JSON.parse(event.body || '');
        const connection: Connection = await new Database().getConnection();
        const userRepository = connection.getRepository(User);
        const getTeamEntities = async (team: string[], competitionName: string): Promise<User[]> => {
            return userRepository.find({
                where: {
                    competitionName,
                    name: In(team),
                },
            });
        };
        const team1Entities = await getTeamEntities(body.teams[0], competitionName);
        const team2Entities = await getTeamEntities(body.teams[1], competitionName);
        const updatedTeams = createNewRankings([ team1Entities, team2Entities ]);
        const promises = await updatedTeams.flat().map((user: User) => userRepository.save(user));
        const users = await Promise.all(promises);
        return buildResponse(200, {
            users,
        });
    } catch (err) {
        console.log(err);
        return err;
    }
};
