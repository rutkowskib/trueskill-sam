import { ITimestamps } from '../models';

export interface ICompetition extends ITimestamps {
    name: string;
}

export interface IPlayer extends ITimestamps {
    competitionName: string;
    mu: number;
    name: string;
    sigma: number;
}

export interface ICompetitionWithPlayers extends ICompetition {
    users: IPlayer[];
}

export interface ICompetitionsReducer {
    competitions: ICompetition[];
    competition: ICompetitionWithPlayers;
}