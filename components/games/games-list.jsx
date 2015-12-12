GamesList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
	return {
		games: Games.find().fetch(),
        editingGame: Session.get( 'editingGame' ),
	};
  },

  render() {
	const games = this.data.games;

    return (
      <div className="games-list">
        <header>
          <h1>Games</h1>
        </header>
        <p>Add games here. Click on a game to make any edits or corrections.</p>
		<ul className="games-list__list">
            <li className='row title' onClick={ this.editGame } >
                <span className="col-sm-2" >Title</span>
                <span className="col-sm-2">Team 1</span>
                <span className="col-sm-2">Team 2</span>
                <span className="col-sm-2">Location</span>
                <span className="col-sm-2">Date</span>
            </li>
			{ games.map( game => {
                const GameItem = ( this.data.editingGame === game._id ) ? EditGameForm : ShowGame;
                return <GameItem key={ game._id } game={ game } />
			} ) }
			<AddGameForm />
		</ul>
      </div>
    );
  }
});
