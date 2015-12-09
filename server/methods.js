Meteor.methods( {
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







	updateActivity( id, data ) {
		Activities.update( { _id: id }, { $set: data } );
	},
	insertActivity( data ) {
		if ( ! isAdmin() ) return;
		Activities.insert(data);
	},
	deleteActivity( activity ) {
		if ( ! isAdmin() ) return;
		Activities.remove({ _id: activity._id } );
	},
	slackNotify( slackUser, message ) {
		if ( ! Meteor.userId ) return;
		if ( slackUser.substring( 0, 1 ) !== '@' ) {
			slackUser = '@' + slackUser;
		}
		rateLimitSlack( slackUser, message );
	}
} );
