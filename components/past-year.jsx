const { Link } = ReactRouter;
PastYear = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
        	picks: Picks.find({}, {sort: {totalScore: 1}}).fetch(),
        };
    },
    render() {
        const { picks } = this.data;
        return (
            <div className="home">
                <h1>2015/16 Results</h1>
                <p>Here's what happened in the 2015/16 season.</p>
                <ul className="all-picks">
                    { picks.map( pick => {
                        return (
                            <li key={ `pick-${pick._id}` }>
                                <span>{ pick.totalScore } -- { pick[ 'pick-owner' ] }</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});
