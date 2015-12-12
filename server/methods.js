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
		const pickValues = _.omit( pick, '_id' );
		Picks.insert( pickValues );
	},
	updatePick( pick ) {
		const pickValues = _.omit( pick, '_id' );
		const storedPick = Picks.find({_id:pick._id}).fetch();
		if ( pick.userId !== Meteor.userId() ) {
			throw new Meteor.Error(
				"wrong-user",
  				"It doesn't look like you're the owner of these picks."
			);
			return;
		}
		Picks.update(pick._id, {$set: pickValues });
	},
	deletePick( pick ) {
		Picks.remove( { _id: pick._id } );
	},

} );
