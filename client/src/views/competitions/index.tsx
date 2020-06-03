import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { fetchCompetitions } from '../../actions/competitions';
import { IStore } from '../../reducers';
import { ICompetition } from '../../reducers/competitions/models';
import { Competition } from './competition';

interface IDispatch {
    fetchCompetitions: () => Promise<void>
}

interface IMapState {
    competitions: ICompetition[]
}

class _CompetitionsView extends React.Component<IDispatch & IMapState> {
    public async componentDidMount(): Promise<void> {
        await this.props.fetchCompetitions()
    }

    public render() {
        const competitions = this.props.competitions.map((competition: ICompetition) => (
            <Competition name={competition.name} key={competition.name} />
        ));
        return (
            <div>
                {competitions}
            </div>
        )
    }
}

const mapStateToProps = (state: IStore): IMapState => ({
    competitions: state.competitions.competitions
});

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatch => ({
    fetchCompetitions: async () => dispatch(fetchCompetitions())
});

export const CompetitionsView = connect(mapStateToProps, mapDispatchToProps)(_CompetitionsView);
