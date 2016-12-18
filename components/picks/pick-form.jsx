import React from 'react';
import { browserHistory } from 'react-router';
PickForm = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
        return {
            userId: Meteor.userId(),
        };
    },
	contextTypes: {
		gameMode: React.PropTypes.string,
		isAdmin: React.PropTypes.bool,
	},
	getInitialState() {
		const { games, pick } = this.props;
		if ( pick ) return this.props.pick;
		const initialState = {
			'pick-owner': null,
			'superbowlWinner': null,
			'_id': null,
			'totalScore': 0,
		};
		games.map( game => {
			const gameKey = `game-${game._id}`;
			initialState[ gameKey ] = null;
		} );
		return initialState;
	},
	updateRadio( event ) {
		const { name, value } = event.target;
		this.setState( { [name]: value } );
	},
	isFormValid() {
		const { games, pick } = this.props;
		if ( ! this.state[ 'pick-owner' ] ) {
			alert('You forgot your name!');
			ReactDOM.findDOMNode(this.refs[ 'pick-owner' ]).focus();
			return false;
		}
		const gameTeamError = _.find( games, game => ! this.state[ `game-${game._id}` ] );
		if ( gameTeamError ) {
			alert( `You forgot to pick a team for the ${ gameTeamError.title } game.` );
			ReactDOM.findDOMNode(this.refs[ `game-${gameTeamError._id}` ]).focus();
			return false;
		}

		const gameScoreError = _.find( games, game => ! this.state[ `game-${game._id}-margin`] );
		if ( gameScoreError ) {
			alert( `You forgot to enter a score for the ${ gameScoreError.title } game.` );
			ReactDOM.findDOMNode(this.refs[ `game-${gameScoreError._id}-margin` ]).focus();
			return false;
		}

		if ( ! this.state.superbowlWinner || this.state.superbowlWinner === 'select a team' ) {
			alert('Please enter a superbowl winner.');
			ReactDOM.findDOMNode(this.refs.NFLSelector).focus();
			return false;
		}
		return true;
	},
	savePick( event ) {

		event.preventDefault();
		if ( ! this.isFormValid() ) return;
		const { games, pick } = this.props;
		const gameIds = games.map( game => `game-${game._id}` );
		const gameMarginKeys = games.map( game => `game-${game._id}-margin` );
		const newPick = _.pick( this.state, [ '_id', 'pick-owner', 'superbowlWinner', 'totalScore', 'userId', ...gameIds, ...gameMarginKeys ] );
		if ( ! newPick.userId ) {
			newPick.userId = this.data.userId;
		}
		const saveMethod = ( newPick._id ) ? 'updatePick' : 'addPick';
		Meteor.call( saveMethod, newPick );
		browserHistory.push( '/picks' );
	},
	selectSuperbowlWinner( event ) {
		event.preventDefault();
		const winner = event.target.value;
		if ( ! winner ) return;
		this.setState( { superbowlWinner: winner } );
	},
	setPickOwner( e ) {
		const pickOwner = e.target.value;
		this.setState( { 'pick-owner': pickOwner } );
	},
	setMargin( gameKey, e ) {
		const margin = e.target.value;
		this.setState( { [`${gameKey}-margin`]: margin } );
	},
	render() {
		const { games, pick } = this.props;
		const { gameMode, isAdmin } = this.context;
		const isPicking = gameMode === 'picking';
		const isOwner = ( ! this._id || this.data.userId === pick.userId );
		const canEdit = ( isAdmin || ( isPicking && isOwner ) );
		return (
			<div className="pick-form">
				<form onSubmit={ this.savePick }>
					<fieldset className="pick-form__fieldset">
						<legend>owner</legend>
						<label htmlFor="pick-owner">Who is this pick for? You? Someone in your family?</label>
						<input
							id="pick-owner"
							className="pick-form__owner-input"
							ref="pick-owner"
							type="text"
							onChange={ this.setPickOwner }
							placeholder="Pick Owner"
							disabled={ ! canEdit }
							value={ this.state[ 'pick-owner' ] }
						/>
					</fieldset>
					<fieldset className="pick-form__fieldset">
						<legend>games</legend>
				{ games.map( game => {
					const gameKey = `game-${game._id}`;
					return (
						<div className="pick-form__game" key={ gameKey } >
							<h3>{ game.title }</h3>
							<label className="pick-form__game-choice">
								<input
									type="radio"
									name={ gameKey }
									ref={ gameKey }
									value="team1"
									checked={ this.state[ gameKey ] === 'team1' }
									onChange={ this.updateRadio }
									disabled={ ! canEdit }
								/>
								{ game.team1 }
							</label>
							<label className="pick-form__game-choice">
								<input
									type="radio"
									name={ gameKey }
									value="team2"
									checked={ this.state[ gameKey ] === 'team2' }
									onChange={ this.updateRadio }
									disabled={ ! canEdit }
								/>
								{ game.team2 }
							</label>
							<input
								className="pick-form__margin"
								type="number"
								ref={ `${gameKey}-margin` }
								placeholder="by how many points"
								onChange={ this.setMargin.bind( this, gameKey ) }
								value={ this.state[`${gameKey}-margin`] }
								disabled={ ! canEdit }
							/>
						</div>
					);
				} ) }
					</fieldset>
					<fieldset className="pick-form__fieldset">
					<legend>Who's gonna win the superbowl?</legend>
						<NFLSelector ref="NFLSelector" onChange={ this.selectSuperbowlWinner } defaultValue={ this.state.superbowlWinner } canEdit={ canEdit } />
					</fieldset>

					<input type="submit" className="btn btn-primary pick-form__submit" value="save pick" disabled={ ! canEdit }/>
				</form>
			</div>
		);
	}
})
