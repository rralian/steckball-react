PickForm = React.createClass({
	mixins: [ReactMeteorData,React.addons.LinkedStateMixin],
	getMeteorData() {
        return {
            userId: Meteor.userId(),
        };
    },
	contextTypes: {
		history: React.PropTypes.object,
	},
	getInitialState() {
		const { games, pick } = this.props;
		if ( pick ) return this.props.pick;
		const initialState = {
			'pick-owner': null,
			'superbowl-score': null,
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

		if ( ! this.state[ 'superbowl-score' ] ) {
			alert('Please enter a total superbowl score.');
			ReactDOM.findDOMNode(this.refs[ 'superbowl-score' ]).focus();
			return false;
		}
		return true;
	},
	savePick( event ) {
		const { history } = this.context;
		event.preventDefault();
		if ( ! this.isFormValid() ) return;
		const { games, pick } = this.props;
		const gameIds = games.map( game => `game-${game._id}` );
		const gameMarginKeys = games.map( game => `game-${game._id}-margin` );
		const newPick = _.pick( this.state, [ '_id', 'pick-owner', 'superbowl-score', 'totalScore', ...gameIds, ...gameMarginKeys ] );
		newPick.userId = this.data.userId;
		const saveMethod = ( newPick._id ) ? 'updatePick' : 'addPick';
		Meteor.call( saveMethod, newPick );
		history.pushState( null, '/picks' );
	},
	render() {
		const { games } = this.props;
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
							valueLink={ this.linkState( 'pick-owner' ) }
							placeholder="Pick Owner"
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
								/>
								{ game.team2 }
							</label>
							<input
								className="pick-form__margin"
								type="number"
								ref={ `${gameKey}-margin` }
								placeholder="by how many points"
								valueLink={ this.linkState( `${gameKey}-margin` ) }
							/>
						</div>
					);
				} ) }
					</fieldset>
					<fieldset className="pick-form__fieldset">
					<legend>tiebreaker</legend>
						<label htmlFor="superbowl-score">Enter the combined score for the superbowl.</label>
						<input
							id="superbowl-score"
							className="pick-form__superbowl-input"
							type="number"
							ref="superbowl-score"
							valueLink={ this.linkState( 'superbowl-score' ) }
						/>
					</fieldset>

					<input type="submit" className="btn btn-primary pick-form__submit" value="save pick" />
				</form>
			</div>
		);
	}
})
