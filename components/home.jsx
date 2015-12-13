const { Link } = ReactRouter;
Home = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
        	picks: Picks.find().fetch(),
            myPicks: Picks.find({userId: Meteor.userId()}).fetch(),
        };
    },
    render() {
        const { picks, myPicks } = this.data;
        return (
            <div className="home">
                <h1>Home</h1>
                { ! myPicks.length &&
                <p>Welcome! SteckBall is a fun little family bet to see who can
                predict the NCAA bowl game results the best. Looks like you haven't
                created any picks yet. Why not <Link to="/picks/new">create your picks</Link> and join in?</p> }
                <h2>All Picks</h2>
                <ul className="all-picks">
                    { picks.map( pick =>
                        <li key={ `pick-${pick._id}` }>{ pick.totalScore } -- { pick[ 'pick-owner' ] }</li>
                    )}
                </ul>
            </div>
        );
    }
});
