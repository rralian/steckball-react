EditGameForm = React.createClass({
    mixins: [ React.addons.LinkedStateMixin ],
    getInitialState() {
        const state = _.pick( this.props.game, [ '_id', 'title', 'date', 'location', 'team1', 'team2' ] );
        state.dirty = false;
        return state;
    },
    validateForm( event ) {
        event.preventDefault();
        const game = _.pick( this.state, [ '_id', 'title', 'date', 'location', 'team1', 'team2' ] );
        if ( _.some( game, attribute => ! attribute ) ) {
            return alert('Please complete all fields');
        }
        Meteor.call( 'updateGame', game );
        Session.set( 'editingGame', null );
    },
    handleKeyDown( event ) {
        if ( event.keyCode === 27 ) {
            Session.set( 'editingGame', null );
        }
    },
    render() {
        const inputClasses = this.state.dirty ? 'col-sm-2 button dirty' : 'col-sm-2 button';
        return (
            <li className='edit-game-form row' onKeyDown={ this.handleKeyDown }>
        		<form onSubmit={ this.validateForm } onChange={ () => this.setState({dirty:true}) }>
                    <input type="text" name="name" className="col-sm-2" placeholder="bowl game title" valueLink={ this.linkState( 'title' ) } ref='gameName' />
            		<input type="date" name="date" className="col-sm-2" placeholder="date" valueLink={ this.linkState( 'date' ) } />
                    <input type="text" name="location" className="col-sm-2" placeholder="location" valueLink={ this.linkState( 'location' ) } />
            		<input type="text" name="team1" className="col-sm-2" placeholder="team1" valueLink={ this.linkState( 'team1' ) } />
            		<input type="text" name="team2" className="col-sm-2" placeholder="team2" valueLink={ this.linkState( 'team2' ) } />
            		<input type="submit" value="save changes" className={ inputClasses } />
        		</form>
            </li>
        );
    }
});
