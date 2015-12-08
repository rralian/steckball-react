EditGameForm = React.createClass({
  validateForm( event ) {
      event.preventDefault();
  },
  getInitialState() {
    return { title, team1, team2, date } = this.props.game;
  },
  render() {
    return (
        <li className='edit-game-form'>
  		<form onSubmit={ this.validateForm }>
  			<input type="text" name="name" placeholder="bowl game title" valueLink={ this.linkState( 'title' ) } />
  			<input type="text" name="team1" placeholder="team1" valueLink={ this.linkState( 'team1' ) } />
  			<input type="text" name="team2" placeholder="team2" valueLink={ this.linkState( 'team2' ) } />
  			<input type="text" name="date" placeholder="date" valueLink={ this.linkState( 'date' ) } />
  			<input type="submit" />
  		</form>
        </li>
    );
  }
});
