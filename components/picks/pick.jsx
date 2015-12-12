Pick = React.createClass({
	mixins: [ReactMeteorData, React.addons.LinkedStateMixin],
	getMeteorData() {
		const games = Games.find().fetch();
		return {
			games: games,
			pick: Picks.findOne({_id: this.props.params.pickId})
		};
    },
	render() {
		const { games, pick } = this.data;
		const title = pick ? 'Edit Your Pick' : 'Create a Pick';
		if ( ! games.length ) return;
		return (
			<div className="pick">
				<h1>{ title }</h1>
				<PickForm games={ games } pick={ pick } />
			</div>
		);
	}
})
