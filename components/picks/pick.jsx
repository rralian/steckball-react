import React from 'react';
Pick = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		return {
			games: Games2016.find().fetch(),
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
		if ( ! games.length ) return null;
		return (
			<div className="pick">
				<h1>{ title }</h1>
				<PickForm games={ games } pick={ pick } />
			</div>
		);
	}
})
