import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

const Comp1 = () => (
        <div>
            <Link to="/ride">TO RIDE</Link>
        </div>
    );
const Comp2 = () => (
        <div>
            <Link to="/user">TO USER</Link>
        </div>
    );

const Comp3 = () => (
        <div>
            <Link to="/ticket">TO TICKET</Link>
        </div>
    );

const Comp4 = () => (
        <div>
            <Link to="/bus">TO BUS</Link>
        </div>
    );

const Body = () => (
            <Switch>
                <Route exact strict path="/ticket" render={Comp1} />
                <Route exact path="/ride" render={Comp2} />
                <Route exact path="/bus" render={Comp3} />
                <Route exact path="/user" render={Comp4} />
            </Switch>
        );



export default Body;

