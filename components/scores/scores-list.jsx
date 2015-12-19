ScoresList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
	return {
		games: Games.find().fetch(),
	};
  },

  render() {
	const games = this.data.games;

    return (
      <div className="scores-list">
        <header>
          <h1>Scores</h1>
        </header>
        <p>Add games here. Click on a game to make any edits or corrections.</p>
		<ul className="scores-list__list">
            <li className='row title' onClick={ this.editGame } >
                <span className="col-sm-2" >Title</span>
                <span className="col-sm-2">Team 1</span>
				<span className="col-sm-2">Score</span>
                <span className="col-sm-2">Team 2</span>
				<span className="col-sm-2">Score</span>
            </li>
			{ games.map( game => <ScoreItem game={ game } key={ `score-${game._id}` } /> ) }
		</ul>
      </div>
    );
  }
});
