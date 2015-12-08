const isEditingGame = ( game ) => game._id === Session.get( 'editingGame' );

GamesList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
	return {
		games: Games.find().fetch()
	};
  },

  render() {
	const Games = this.data.games;

    return (
      <div className="games">
        <header>
          <h1>Games</h1>
        </header>
		<ul>
			{ Games.map( game => {
                const GameItem = isEditingGame( game ) ? EditGameForm : ShowGame;
                return <GameItem key={ game._id } game={ game } />
			} ) }
			<AddGameForm />
		</ul>
      </div>
    );
  }
});
