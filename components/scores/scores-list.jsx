ScoresList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            games: Games.find().fetch(),
            superbowl: Superbowl.findOne() || {}
        };
    },

    recordSuperbowlWinner( event ) {
        const winner = ( event.target.value === 'select a team' ) ? null : event.target.value;
        Meteor.call( 'saveSuperbowlWinner', winner );
    },

    render() {
    	const games = this.data.games;
        const superbowl = this.data.superbowl;

        return (
          <div className="scores-list">
            <header>
              <h1>Scores</h1>
            </header>
            <p>Enter final game scores here. Each player's scores will be updated automatically.</p>
    		<ul className="scores-list__list">
                <li className='row title' onClick={ this.editGame } >
                    <span className="col-sm-2" >Title</span>
                    <span className="col-sm-2">Team 1</span>
    				<span className="col-sm-2">Score</span>
                    <span className="col-sm-2">Team 2</span>
    				<span className="col-sm-2">Score</span>
                </li>
    			{ games.map( game => <ScoreItem game={ game } key={ `score-${game._id}` } /> ) }
                <li>
                    <fieldset className="pick-form__fieldset">
                    <legend>Who won the superbowl?</legend>
                        <NFLSelector ref="NFLSelector" onChange={ this.recordSuperbowlWinner } defaultValue={ superbowl.winner } canEdit={ true }/>
                    </fieldset>
                </li>
    		</ul>
          </div>
        );
    }
});
