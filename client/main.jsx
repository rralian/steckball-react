const {
  Router,
  Route,
  IndexRoute,
} = ReactRouter;

const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)()

Meteor.subscribe('games');

Meteor.startup(function () {
  ReactDOM.render((
	  <Router history={ history }>
		  <Route name="root" component={App} path="/">
			<IndexRoute component={Home} />
			<Route name="games" path="games" component={GamesList} />
		  </Route>
	  </Router>
  ), document.getElementById("render-target"))
});
