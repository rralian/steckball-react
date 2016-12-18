import React from 'react';
import { Link, browserHistory } from 'react-router';
Tab = React.createClass({
  render() {
		const location = browserHistory.getCurrentLocation().pathname;
		const to = this.props.to;
    const isActive = !! this.props.onlyActiveOnIndex ? location === to : location.match( to );
    const className = isActive ? 'active' : ''
    return <li className={className}><Link {...this.props}/></li>
  }
})
