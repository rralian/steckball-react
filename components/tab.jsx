const { Link, History } = ReactRouter;

Tab = React.createClass({
  mixins: [ History ],
  render() {
    const isActive = this.history.isActive(this.props.to, this.props.query, this.props.onlyActiveOnIndex)
    const className = isActive ? 'active' : ''
    return <li className={className}><Link {...this.props}/></li>
  }
})
