const { Link, IndexLink } = ReactRouter;

App = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
        	currentUser: Meteor.user()
        };
    },

    userDialog( event ) {
        event.preventDefault();
        Accounts._loginButtonsSession.set('dropdownVisible', true);
    },


  render() {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), ['admin']);
    const { currentUser } = this.data;
    return (
      <div className='app'>
        <AccountsUIWrapper />
        <nav className="navbar navbar-default">
            <ul className='app__navigation nav navbar-nav'>
                { currentUser ?
                    <li><a href="/logout" onClick={ this.userDialog }>{ currentUser.profile.name } ▾</a></li>
                :
                    <li><a href="/login" onClick={ this.userDialog }>login/register</a></li>
                }
                <Tab to="/" onlyActiveOnIndex>home</Tab>
                <Tab to="picks">my picks</Tab>
                { isAdmin && <Tab to="games">games</Tab> }
            </ul>
        </nav>
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
});
