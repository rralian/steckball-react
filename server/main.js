Meteor.publish("games", function() {
  return Games.find();
});
Meteor.publish("picks", function() {
  return Picks.find();
});
Meteor.publish("superbowl", function() {
	return Superbowl.find();
});

Meteor.publish("games2016", function() {
  return Games2016.find();
});
Meteor.publish("picks2016", function() {
  return Picks2016.find();
});
Meteor.publish("superbowl2016", function() {
	return Superbowl2016.find();
});

Meteor.publish("adminSettings", function() {
  return AdminSettings.find();
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
