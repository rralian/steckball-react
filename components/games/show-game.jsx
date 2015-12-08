ShowGame = React.createClass({
  editGame() {
    Session.set( 'editingGame', this.props.game._id );
  },
  deleteGame( event ) {
      event.preventDefault();
      if ( ! confirm( 'Delete this game?' ) ) {
          return;
      }
      Meteor.call( 'deleteGame', this.props.game );
  },
  render() {
    const game = this.props.game;
    return (
      <li onClick={ this.editGame } className='show-game'>
          { game.title }
          { game.team1 }
          { game.team2 }
          { game.date }
          <input type='submit' value='delete' onClick={ this.deleteGame }/>
      </li>
    );
  }
});
