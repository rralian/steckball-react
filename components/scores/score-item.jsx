ScoreItem = React.createClass({
    mixins: [ React.addons.LinkedStateMixin ],
	getInitialState() {
	    const state = _.pick( this.props.game, [ 'team1Score', 'team2Score' ] );
	    state.dirty = false;
	    return state;
	},
	validateForm( event ) {
		event.preventDefault();
		const { game } = this.props;
		let { team1Score, team2Score } = this.state;
		team1Score = parseInt( team1Score, 10 );
		team2Score = parseInt( team2Score, 10 );
		const { _id } = game;
		if ( typeof team1Score !== 'number' || typeof team2Score !== 'number' ) {
			alert('Only enter numbers, you monkey!');
			return;
		}
		Meteor.call( 'saveScore', { _id, team1Score, team2Score } );
        this.setState({dirty:false});
	},
	render() {
		const { game } = this.props;
		const inputClasses = this.state.dirty ? 'col-sm-2 button dirty' : 'col-sm-2 button';
		return (
			<li className='edit-score-form row'>
				<form onSubmit={ this.validateForm } onChange={ () => this.setState({dirty:true}) }>
					<span className="col-sm-2">{ game.title }</span>
					<span className="col-sm-2">{ game.team1 }</span>
					<input
						type="number"
						name="team1Score"
						className="col-sm-2"
						valueLink={ this.linkState( 'team1Score' ) } />
					<span className="col-sm-2">{ game.team2 }</span>
					<input
						type="number"
						name="team2Score"
						className="col-sm-2"
						valueLink={ this.linkState( 'team2Score' ) } />
					<input type="submit" value="save changes" className={ inputClasses } />
				</form>
			</li>
		);
	}
});
