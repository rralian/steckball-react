Admin = React.createClass({
	getInitialState() {
		return this.props;
	},
	updateRadio( event ) {
		if ( ! confirm( "Are you sure you want to change the game mode?\nIt's kind of a big deal.") ) {
			event.preventDefault()
			return;
		}
		this.setState( { gameMode: event.target.value } );
	},
	componentWillUpdate( nextProps, nextState ) {
		if ( nextState !== this.state ) {
			const adminSettings = _.pick( nextState, [ 'gameMode' ] );
			Meteor.call( 'saveAdminSettings', adminSettings );
		}
	},
	render() {
		const { gameMode } = this.state;
		return (
			<div className="admin">
				<header>
					<h1>Admin</h1>
				</header>
				<form>
					<fieldset className="admin__fieldset">
						<legend>Game Mode</legend>
						<div className="admin__row">
							<label className="pick-form__game-choice">
								<input
									type="radio"
									value="picking"
									name="gameMode"
									checked={ gameMode !== 'playing' }
									onChange={ this.updateRadio }/>
								Still Picking
							</label>
							<label className="pick-form__game-choice">
								<input
									type="radio"
									name="gameMode"
									value="playing"
									checked={ gameMode === 'playing' }
									onChange={ this.updateRadio }/>
								Games Started
							</label>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
});
