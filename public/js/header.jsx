var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
    	<nav className="navbar">
				<div className="container header-container">
					<div className="text-center">
						<a className="nav-link" href="/install">Install</a>
						<a className="nav-link" href="/usage">Usage</a>
						<a className="nav-link" href="/api">API</a>
						<a className="nav-link" href="https://github.com/kwangbkim/balanced">Code</a>
					</div>
				</div>
			</nav>
    );
  }
});
