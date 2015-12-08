const { Link, IndexLink } = ReactRouter;

App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
	return {
		currentUser: Meteor.user()
	};
  },

  render() {
    return (
      <div className='app'>
        <ul className='app__navigation'>
            <li>
                <AccountsUIWrapper />
            </li>
            <li>
                <IndexLink to="/" activeClassName='current'>home</IndexLink>
            </li>
            <li>
                <Link to="games" activeClassName='current'>games</Link>
            </li>
        </ul>
          <div className="container">{this.props.children}</div>
      </div>
    );
  }
});
