const checkAdmin = function() {
    if( ! Roles.userIsInRole( Meteor.userId(), ['admin'] ) ) {
		throw new Meteor.Error(
			"admin-only",
			"Only admins are allowed to do this."
		);
		return false;
	}
	return true;
};
Meteor.methods( {
	// games
	addGame( game ) {
		if ( ! checkAdmin() ) return;
		Games.insert( game );
	},
	updateGame( game ) {
		if ( ! checkAdmin() ) return;
		const gameValues = _.omit( game, '_id' );
		Games.update(game._id, {$set: gameValues });
	},
	deleteGame( game ) {
		if ( ! checkAdmin() ) return;
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
		if ( pick.userId !== Meteor.userId() && ! checkAdmin() ) {
			throw new Meteor.Error(
				"wrong-user",
				"It doesn't look like you're the owner of these picks."
			);
			return;
		}
		Picks.update(pick._id, {$set: pickValues });
	},
	deletePick( pick ) {
		const storedPick = Picks.find({_id:pick._id}).fetch();
		if ( pick.userId !== Meteor.userId() && ! checkAdmin() ) {
			throw new Meteor.Error(
				"wrong-user",
				"It doesn't look like you're the owner of these picks."
			);
			return;
		}
		Picks.remove( { _id: pick._id } );
	},
    saveScore( scores ) {
        if ( ! checkAdmin() ) return;
        const { _id, team1Score, team2Score } = scores;
        if ( typeof team1Score !== 'number' || typeof team2Score !== 'number' ) {
            throw new Meteor.Error(
                "Invalid Score",
                "Scores must be numbers."
            );
            return;
        }
        Games.update( _id, {$set: { team1Score, team2Score } });

        updateScores( { _id, team1Score, team2Score } );
    },
    saveAdminSettings( adminSettings ) {
        if ( ! checkAdmin() ) return;
        const adminSettingsValues = _.pick( adminSettings, [ 'gameMode' ] );
        const storedAdminSettings = AdminSettings.findOne();
        if ( storedAdminSettings ) {
            AdminSettings.update( storedAdminSettings._id, {$set: adminSettingsValues} )
        } else {
            AdminSettings.insert( adminSettingsValues );
        }
    },

} );

function updateScores( scores ) {
    const picks = Picks.find().fetch();
    picks.map( pick => {
        updateGameScore( pick, scores );
    } );
}

function updateGameScore( pick, scores ) {
    let { _id, team1Score, team2Score } = scores;
    team1Score = parseInt( team1Score, 10 );
    team2Score = parseInt( team2Score, 10 );
    let gameScore = 0;
    const winner = ( team1Score > team2Score ) ? 'team1' : 'team2';
    const pickedSpread = parseInt( pick[ `game-${_id}-margin` ], 10 );
    const realSpread = Math.abs( team1Score - team2Score );
    if ( pick[ `game-${_id}` ] !== winner ) {
        gameScore += 25;
        gameScore += ( pickedSpread + realSpread );
    } else {
        gameScore += Math.abs( pickedSpread - realSpread );
    }
    const allScores = pick.allScores || {};
    allScores[ _id ] = gameScore;
    let totalScore = 0;
    for( game in allScores ) {
        totalScore += allScores[ game ];
    }
    Picks.update( pick._id, {$set: { allScores, totalScore } } );
}
