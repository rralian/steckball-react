Meteor.publish("games", function() {
  return Games.find();
});
Meteor.publish("picks", function() {
  return Picks.find();
});

Accounts.onCreateUser( ( options, user ) => {
    if ( options.profile ) {
        user.profile = options.profile;
    }
    if ( Meteor.users.find().count() === 0 ) {
        Meteor.setTimeout( () => Roles.addUsersToRoles(user._id, ['admin']), 0 );
    }
    return user;
} );
