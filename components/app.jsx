import React from 'react';
import { Link, IndexLink } from 'react-router';

App = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
					currentUser: Meteor.user(),
					adminSettings: AdminSettings.findOne(),
        };
    },

    childContextTypes: {
        gameMode: React.PropTypes.string,
        isAdmin: React.PropTypes.bool,
    },

    getChildContext() {
        const { adminSettings } = this.data;
        const gameMode = adminSettings ? adminSettings.gameMode : 'picking';
        return {
            gameMode,
            isAdmin: Roles.userIsInRole(Meteor.userId(), ['admin'])
        };
    },

    userDialog( event ) {
        event.preventDefault();
        Accounts._loginButtonsSession.set('dropdownVisible', true);
    },

    render() {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), ['admin']);
    const { currentUser } = this.data;
    let displayName = 'sign out';
    if ( currentUser && currentUser.profile && currentUser.profile.name ) {
        displayName = currentUser.profile.name;
    } else if ( currentUser && currentUser.emails && currentUser.emails.length ) {
        displayName = currentUser.emails[ 0 ].address;
    }
    return (
      <div className='app'>
        <AccountsUIWrapper />
        <nav className="navbar navbar-default">
            <ul className='app__navigation nav navbar-nav'>
                { currentUser ?
                    <li><a href="/logout" onClick={ this.userDialog }>{ displayName } ▾</a></li>
                :
                    <li><a href="/login" onClick={ this.userDialog }>login/register</a></li>
                }
                <Tab to="/" onlyActiveOnIndex>home</Tab>
                { currentUser && <Tab to="/picks">picks</Tab> }
                { isAdmin && <Tab to="/games">games</Tab> }
                { isAdmin && <Tab to="/scores">scores</Tab> }
                { isAdmin && <Tab to="/admin">admin</Tab> }
								{ currentUser && <Tab to="/2015-16">2015/16</Tab> }
            </ul>
        </nav>
        <div className="container">{this.props.children}</div>
      </div>
    );
    }
});
