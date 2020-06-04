import { ITimestamps } from '../models';

export interface ICompetition extends ITimestamps {
    name: string;
}

export interface INewPlayer {
    competitionName: string;
    mu: number;
    name: string;
    sigma: number;
}
export interface IPlayer extends ITimestamps, INewPlayer {
}

export interface ICompetitionWithPlayers extends ICompetition {
    users: IPlayer[];
}

export interface ICompetitionsReducer {
    competitions: ICompetition[];
    competition: ICompetitionWithPlayers;
    game: IGame;
    createUserPending: boolean;
    getGamePending: boolean;
    rateGamePending: boolean;
    fetchCompetitionPending: boolean;
}

export interface IGame {
    teams: Array<IPlayer[]>;
}