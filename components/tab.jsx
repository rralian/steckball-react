const { Link, History, IndexLink } = ReactRouter;

Tab = React.createClass({
  mixins: [ History ],
  render() {
    let isActive = this.history.isActive(this.props.to, this.props.query, this.props.indexLink)
    let className = isActive ? 'active' : ''
	const LinkElement = this.props.indexLink ? IndexLink : Link;
    return <li className={className}><LinkElement {...this.props}/></li>
  }
})
