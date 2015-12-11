
AddGameForm = React.createClass({
  mixins: [ React.addons.LinkedStateMixin ],
  getInitialState() {
    return {
		title: null,
		date: null,
        locatin: null,
		team1: null,
		team2: null,
	};
  },
  validateForm( event ) {
	  event.preventDefault();
      const game = _.pick( this.state, [ 'title', 'date', 'location', 'team1', 'team2' ] );
	  if ( _.some( game, attribute => ! attribute ) ) {
          return alert('Please complete all fields');
      }
        Meteor.call( 'addGame', game );
        this.setState({
            title: null,
            date: null,
            location: null,
            team1: null,
            team2: null,
        });
        this.refs.gameName.focus();
  },
  render() {
    return (
      <li className='add-game-form row'>
		<form onSubmit={ this.validateForm }>
			<input type="text" name="name" className="col-sm-2" placeholder="bowl game title" valueLink={ this.linkState( 'title' ) } ref='gameName' />
            <input type="text" name="team1" className="col-sm-2" placeholder="team1" valueLink={ this.linkState( 'team1' ) } />
            <input type="text" name="team2" className="col-sm-2" placeholder="team2" valueLink={ this.linkState( 'team2' ) } />
            <input type="text" name="location" className="col-sm-2" placeholder="location" valueLink={ this.linkState( 'location' ) } />
			<input type="date" name="date" className="col-sm-2" placeholder="date" valueLink={ this.linkState( 'date' ) } />
			<input type="submit" className="col-sm-2 button" value="add game" />
		</form>
      </li>
    );
},
});
