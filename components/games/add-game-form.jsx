
AddGameForm = React.createClass({
  mixins: [ React.addons.LinkedStateMixin ],
  getInitialState() {
    return {
		title: null,
		team1: null,
		team2: null,
		date: null
	};
  },
  validateForm( event ) {
	  event.preventDefault();
      const game = _.pick( this.state, [ 'title', 'team1', 'team2', 'date' ] );
	  if ( _.some( game, attribute => ! attribute ) ) {
          return alert('Please complete all fields');
      }
        Meteor.call( 'addGame', game );
        this.setState({
            title: null,
            team1: null,
            team2: null,
            date: null
        });
        this.refs.gameName.focus();
  },
  render() {
    return (
      <li className='add-game-form'>
		<form onSubmit={ this.validateForm }>
			<input type="text" name="name" placeholder="bowl game title" valueLink={ this.linkState( 'title' ) } ref='gameName' />
			<input type="text" name="team1" placeholder="team1" valueLink={ this.linkState( 'team1' ) } />
			<input type="text" name="team2" placeholder="team2" valueLink={ this.linkState( 'team2' ) } />
			<input type="text" name="date" placeholder="date" valueLink={ this.linkState( 'date' ) } />
			<input type="submit" />
		</form>
      </li>
    );
},
});
