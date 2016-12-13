Pick = React.createClass({
	mixins: [ReactMeteorData, React.addons.LinkedStateMixin],
	getMeteorData() {
		const games = Games2016.find().fetch();
		return {
			games: games,
			pick: Picks2016.findOne({_id: this.props.params.pickId})
		};
  },
	contextTypes: {
        gameMode: React.PropTypes.string,
		isAdmin: React.PropTypes.bool,
    },
	render() {
		const { games, pick } = this.data;
		const { gameMode, isAdmin } = this.context;
		let title = pick ? 'Edit Pick' : 'Create a Pick';
		if ( gameMode === 'playing' && ! isAdmin ) {
			title = 'View Pick';
		}
		if ( ! games.length ) return;
		return (
			<div className="pick">
				<h1>{ title }</h1>
				<PickForm games={ games } pick={ pick } />
			</div>
		);
	}
})
