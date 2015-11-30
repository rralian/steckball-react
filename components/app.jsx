// App component - represents the whole app
App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
	return {
		currentUser: Meteor.user()
	};
  },

  render() {
	if ( ! this.data.currentUser ) {
		return <p>Register or login to get started.</p>;
	}
    return (
      <div className="container">
        <header>
          <h1>Entries</h1>
        </header>
      </div>
    );
  }
});
