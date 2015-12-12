Home = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
        	picks: Picks.find().fetch(),
        };
    },
    render() {
        const { picks } = this.data;
        return (
            <div className="home">
                <h1>Home</h1>
                <ul className="all-picks">
                    { picks.map( pick =>
                        <li key={ `pick-${pick._id}` }>{ pick.totalScore } -- { pick[ 'pick-owner' ] }</li>
                    )}
                </ul>
            </div>
        );
    }
});
