PicksList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
	return {
		picks: Picks.find().fetch(),
	};
  },

  render() {
	const picks = this.data.picks;

    return (
      <div className="games-list">
        <header>
          <h1>My Picks</h1>
        </header>

		<ul className="games-list__list">
            { ! picks.length &&
                <p>You don't have any picks yet. You can create picks for yourself and anyone else in your family.</p>
            }
		</ul>
      </div>
    );
  }
});
