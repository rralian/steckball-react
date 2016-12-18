import React from 'react';
ShowGame = React.createClass({
  editGame( event ) {
    event.preventDefault();
    event.stopPropagation();
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
      <li className='show-game row' onClick={ this.editGame } >
          <span className="col-sm-2" >{ game.title }</span>
          <span className="col-sm-2">{ game.team1 }</span>
          <span className="col-sm-2">{ game.team2 }</span>
          <span className="col-sm-2">{ game.location }</span>
          <span className="col-sm-2">{ game.date }</span>
          <input type='submit' value='delete' className="col-sm-2 button" onClick={ this.deleteGame }/>
      </li>
    );
  }
});
