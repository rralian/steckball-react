Meteor.methods( {
	// games
	addGame( game ) {
		Games.insert( game );
	},
	updateGame( game ) {
		const gameValues = _.omit( game, '_id' );
		Games.update(game._id, {$set: gameValues });
	},
	deleteGame( game ) {
		Games.remove( { _id: game._id } );
	},

	// picks
	addPick( pick ) {
		Picks.insert( pick );
	},
	updatePick( pick ) {
		const pickValues = _.omit( pick, '_id' );
		Picks.update(pick._id, {$set: pickValues });
	},
	deletePick( pick ) {
		Picks.remove( { _id: pick._id } );
	},

} );
