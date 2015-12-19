const {
  Router,
  Route,
  IndexRoute,
} = ReactRouter;

const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)()

Meteor.subscribe('games');
Meteor.subscribe('picks');

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
	  <Router history={ history }>
		  <Route name="root" component={App} path="/">
			<IndexRoute component={Home} />
            <Route name="picks" path="picks" onEnter={ checkLoggedIn }>
                <IndexRoute component={PicksList}/>
                <Route name="pick" path=":pickId" component={Pick}/>
            </Route>
			<Route name="games" path="games" component={GamesList} onEnter={ checkAdmin }/>
            <Route name="scores" path="scores" component={ScoresList} onEnter={ checkAdmin }/>
		  </Route>
	  </Router>
  ), document.getElementById("render-target"))
});
