const { Link } = ReactRouter;

PicksList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            picks: Picks.find({userId: Meteor.userId()}).fetch(),
        };
    },

  render() {
	const { picks } = this.data;

    return (
      <div className="picks-list">
        <header>
          <h1>My Picks</h1>
        </header>

		<ul className="games-list__list">
            { ! picks.length ?
                <p>You don't have any picks yet. You can create picks for
                    yourself and anyone else in your family.
                </p>
            :
                <p>Here are your picks so far. You can add more picks for
                    other people in your family if you all want to use the
                    same login. Feel free to second-guess yourself and edit
                    your picks to your heart's content. You can make changes
                    up until the first game.
                </p>
            }
            <ul className="picks-list__ul">
            { picks.map( pick =>
                <li key={ `pick-${pick._id}` }>
                    <Link to={`/picks/${pick._id}`}>{ pick[ 'pick-owner' ] }</Link>
                </li>
            ) }
            </ul>
            <Link className="btn btn-primary" to="/picks/new">create a pick</Link>
		</ul>
      </div>
    );
  }
});
