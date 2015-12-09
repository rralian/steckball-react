const { Link, IndexLink } = ReactRouter;

App = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
        	currentUser: Meteor.user()
        };
    },

    logoutDialog( event ) {
        event.preventDefault();
        Accounts._loginButtonsSession.set('dropdownVisible', true);
    },

  render() {
    if ( ! this.data.currentUser ) {
        return <AccountsUIWrapper />;
    }
    return (
      <div className='app'>
        <AccountsUIWrapper />
        <nav className="navbar navbar-default">
            <ul className='app__navigation nav navbar-nav'>
                <li>
                    <a href="/logout" onClick={ this.logoutDialog }>{ this.data.currentUser.profile.name } ▾</a>
                </li>
                <Tab to="/" indexLink>home</Tab>
                <Tab to="games">games</Tab>
            </ul>
        </nav>
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
});
