import { User } from '../database/entities/user.entity';
import 'lodash.combinations';
import _ from 'lodash';
import { quality as trueskillQuality, rate, Rating } from 'ts-trueskill';

export const generateTeams = (players: User[]): { teams: Array<User[]> } => {
    const team1Combinations = _.combinations(players, players.length / 2);
    const bestMatch = team1Combinations.reduce((currentBest: { players: User[], quality: number}, team1: User[]) => {
        const team2 = _.differenceWith<User, User>(players, team1, comparePlayers);
        const quality = trueskillQuality([ convertToTrueskillTeam(team1), convertToTrueskillTeam(team2) ]);
        if (quality > currentBest.quality) {
            return  {
                quality,
                players: team1,
            };
        }
        return currentBest;
    }, { players: [], quality: 0 });
    const team2 = _.differenceWith<User, User>(players, bestMatch.players, comparePlayers);
    return {
        teams: [ bestMatch.players, team2 ],
    };
};

export const createNewRankings = (teams: Array<User[]>): User[] => {
    let [ team1, team2 ] = teams;
    const trueskillTeam1 = convertToTrueskillTeam(team1);
    const trueskillTeam2 = convertToTrueskillTeam(team2);

    const [rated1, rated2] = rate([trueskillTeam1, trueskillTeam2]);


    return updateTeam(team1, rated1).concat(updateTeam(team2, rated2));
};

const convertToTrueskillTeam = (team: User[]): Rating[] => {
    return team.map((player: User) => new Rating(player.mu, player.sigma));
};

const updateTeam = (team: User[], ratings: Rating[]) => team.map((player: User, index: number) => updatePlayerRanking(player, ratings[index]));

const updatePlayerRanking = (player: User, rating: Rating): User => ({...player, mu: rating.mu, sigma: rating.sigma });

const comparePlayers = (player1: User, player2: User): boolean => player1.name === player2.name;