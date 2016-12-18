import React from 'react';
AdminWrapper = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
		return AdminSettings.findOne() || {};
    },
	render() {
		return <Admin {...this.data} />;
	}
});
