import React from 'react';
import ReactDOM from 'react-dom';
const nflTeams = [
"Arizona Cardinals",
"Atlanta Falcons",
"Baltimore Ravens",
"Buffalo Bills",
"Carolina Panthers",
"Chicago Bears",
"Cincinnati Bengals",
"Cleveland Browns",
"Dallas Cowboys",
"Denver Broncos",
"Detroit Lions",
"Green Bay Packers",
"Houston Texans",
"Indianapolis Colts",
"Jacksonville Jaguars",
"Kansas City Chiefs",
"Miami Dolphins",
"Minnesota Vikings",
"New England Patriots",
"New Orleans Saints",
"NY Giants",
"NY Jets",
"Oakland Raiders",
"Philadelphia Eagles",
"Pittsburgh Steelers",
"San Diego Chargers",
"San Francisco 49ers",
"Seattle Seahawks",
"St. Louis Rams",
"Tampa Bay Buccaneers",
"Tennessee Titans",
"Washington Redskins",
];

NFLSelector = React.createClass({
	focus() {
		ReactDOM.findDOMNode(this.refs[ 'nfl-selector' ]).focus();
	},
	render() {
		return (
			<select name="nfl-selector" ref="nfl-selector" onChange={ this.props.onChange } defaultValue={ this.props.defaultValue } disabled={ ! this.props.canEdit }>
				<option>select a team</option>
				{ nflTeams.map( team => {
					return <option value={ team } key={ `nfl-team-${ team }` }>{ team }</option>
				} ) }
			</select>
		)
	}
});
