import React from 'react';
AddGameForm = React.createClass({
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
	setTitle( e ) {
		const title = e.target.value;
		this.setState( { title } );
	},
	setTeam1( e ) {
		const team1 = e.target.value;
		this.setState( { team1 } );
	},
	setTeam2( e ) {
		const team2 = e.target.value;
		this.setState( { team2 } );
	},
	setLocation( e ) {
		const location = e.target.value;
		this.setState( { location } );
	},
	setDate( e ) {
		const date = e.target.value;
		this.setState( { date } );
	},
  render() {
    return (
      <li className='add-game-form row'>
		<form onSubmit={ this.validateForm }>
			<input type="text" name="name" className="col-sm-2" placeholder="bowl game title" onChange={ this.setTitle } ref='gameName' />
            <input type="text" name="team1" className="col-sm-2" placeholder="team1" onChange={ this.setTeam1 } />
            <input type="text" name="team2" className="col-sm-2" placeholder="team2" onChange={ this.setTeam2 } />
            <input type="text" name="location" className="col-sm-2" placeholder="location" onChange={ this.setLocation } />
			<input type="date" name="date" className="col-sm-2" placeholder="date" onChange={ this.setDate } />
			<input type="submit" className="col-sm-2 button" value="add game" />
		</form>
      </li>
    );
},
});
