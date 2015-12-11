PicksList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
	return {
		games: Games.find().fetch(),
        editingGame: Session.get( 'editingGame' ),
	};
  },

  render() {
	const Games = this.data.games;

    return (
      <div className="games-list">
        <header>
          <h1>Games</h1>
        </header>
		<ul className="games-list__list">
			{ Games.map( game => {
                const GameItem = ( this.data.editingGame === game._id ) ? EditGameForm : ShowGame;
                return <GameItem key={ game._id } game={ game } />
			} ) }
			<AddGameForm />
		</ul>
      </div>
    );
  }
});
