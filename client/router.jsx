const {
  Router,
  Route,
  IndexRoute,
} = ReactRouter;

const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)()

Meteor.subscribe('games');

const checkAdmin = function( nextState, replaceState ) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        replaceState({ nextPathname: nextState.location.pathname }, '/')
    }
};

Meteor.startup(function () {
  ReactDOM.render((
	  <Router history={ history }>
		  <Route name="root" component={App} path="/">
			<IndexRoute component={Home} />
            <Route name="picks" path="picks" component={PicksList}/>
			<Route name="games" path="games" component={GamesList} onEnter={ checkAdmin }/>
		  </Route>
	  </Router>
  ), document.getElementById("render-target"))
});
