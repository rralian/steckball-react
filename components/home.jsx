import React from 'react';
import { Link } from 'react-router';
Home = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
        	picks: Picks2016.find({}, {sort: {totalScore: 1}}).fetch(),
          myPicks: Picks2016.find({userId: Meteor.userId()}).fetch(),
          currentUser: Meteor.user(),
        };
    },
    contextTypes: {
        gameMode: React.PropTypes.string,
        isAdmin: React.PropTypes.bool,
    },
    loginRegister( event ) {
        event.preventDefault();
        Accounts._loginButtonsSession.set('dropdownVisible', true);
    },
    render() {
        const { picks, myPicks, currentUser } = this.data;
        const { gameMode, isAdmin } = this.context;
        const callToAction = currentUser ?
            <p>Looks like you haven't created any picks yet. Why not <Link to="/picks/new">create your picks</Link> and join in?</p>
            :
            <p>Looks like you aren't signed in. First thing's first, <a href="/login" onClick={ this.loginRegister }>login/register</a> to get started.</p>
        ;
        return (
            <div className="home">
                { ! myPicks.length &&
                <div>
                    <p>
                        Welcome! SteckBall is a fun little family bet to see who can
                        predict the NCAA bowl game results the best.
                    </p>
                    { ( gameMode === 'picking' ) && callToAction }
                </div> }
                <h1>Standings</h1>
                <p>Here are the picks and standings so far.</p>
                <ul className="all-picks">
                    { picks.map( pick => {
                        const item = ( gameMode === 'playing' || isAdmin ) ? <Link to={ `/picks/${pick._id}` }>{ pick.totalScore } -- { pick[ 'pick-owner' ] }</Link> : <span>{ pick.totalScore } -- { pick[ 'pick-owner' ] }</span>;
                        return (
                            <li key={ `pick-${pick._id}` }>
                                { item }
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});
