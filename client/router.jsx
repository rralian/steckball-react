import {
  Router,
  Route,
  IndexRoute,
	browserHistory,
} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

Meteor.subscribe('adminSettings');
Meteor.subscribe('games');
Meteor.subscribe('picks');
Meteor.subscribe('superbowl');
Meteor.subscribe('games2016');
Meteor.subscribe('picks2016');
Meteor.subscribe('superbowl2016');

const checkAdmin = function( nextState, replaceState ) {
    if ( ! Roles.userIsInRole( Meteor.userId(), ['admin'] ) ) {
        replaceState({ nextPathname: nextState.location.pathname }, '/')
    }
};
const checkLoggedIn = function( nextState, replaceState ) {
    if ( ! Meteor.user() ) {
        replaceState({ nextPathname: nextState.location.pathname }, '/')
    }
};

Meteor.startup(function () {
  ReactDOM.render((
	  <Router history={ browserHistory }>
		  <Route name="root" component={App} path="/">
			<IndexRoute component={Home} />
      <Route name="picks" path="picks" onEnter={ checkLoggedIn }>
          <IndexRoute component={PicksList}/>
          <Route name="pick" path=":pickId" component={Pick}/>
      </Route>
			<Route name="games" path="games" component={GamesList} onEnter={ checkAdmin }/>
      <Route name="scores" path="scores" component={ScoresList} onEnter={ checkAdmin }/>
      <Route name="admin" path="admin" component={AdminWrapper} onEnter={ checkAdmin }/>
			<Route name="2015-16" path="2015-16" component={PastYear}/>
		  </Route>
	  </Router>
  ), document.getElementById("render-target"))
});
