import React from 'react';
EditGameForm = React.createClass({
    getInitialState() {
        const state = _.pick( this.props.game, [ '_id', 'title', 'date', 'location', 'team1', 'team2' ] );
        state.dirty = false;
        return state;
    },
    componentDidMount() {
        document.addEventListener( 'keydown', this.handleKeyDown );
    },
    componentWillUnmount() {
        document.removeEventListener( 'keydown', this.handleKeyDown );
    },
    validateForm( event ) {
        event.preventDefault();
        const game = _.pick( this.state, [ '_id', 'title', 'date', 'location', 'team1', 'team2' ] );
        if ( _.some( game, attribute => ! attribute ) ) {
            return alert('Please complete all fields');
        }
        Meteor.call( 'updateGame', game );
        Session.set( 'editingGame', null );
        this.setState({dirty: false});
    },
    handleKeyDown( event ) {
        if ( event.keyCode === 27 ) {
            Session.set( 'editingGame', null );
        }
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
        const inputClasses = this.state.dirty ? 'col-sm-2 button dirty' : 'col-sm-2 button';
        return (
            <li className='edit-game-form row'>
        		<form onSubmit={ this.validateForm } onChange={ () => this.setState({dirty:true}) }>
							<input type="text" name="name" className="col-sm-2" placeholder="bowl game title" onChange={ this.setTitle } ref='gameName' value={ this.state.title } />
							<input type="text" name="team1" className="col-sm-2" placeholder="team1" onChange={ this.setTeam1 } value={ this.state.team1 } />
							<input type="text" name="team2" className="col-sm-2" placeholder="team2" onChange={ this.setTeam2 } value={ this.state.team2 } />
							<input type="text" name="location" className="col-sm-2" placeholder="location" onChange={ this.setLocation } value={ this.state.location } />
							<input type="date" name="date" className="col-sm-2" placeholder="date" onChange={ this.setDate } value={ this.state.date } />
							<input type="submit" value="save changes" className={ inputClasses } />
        		</form>
            </li>
        );
    }
});
