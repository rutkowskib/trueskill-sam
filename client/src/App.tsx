import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CompetitionsView } from './views/competitions';
import { CreateCompetition } from './views/create-competition';
import { Navbar } from './components/navbar';
import { ShowCompetition } from './views/show-competition';
import { CreateUser } from './views/create-user';

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/create-competition" component={CreateCompetition} />
                <Route path="/competition/:id/add-user" component={CreateUser} />
                <Route path="/competition/:id" component={ShowCompetition} />
                <Route path="/" component={CompetitionsView} />
            </Switch>
        </>
    );
}

export default App;
