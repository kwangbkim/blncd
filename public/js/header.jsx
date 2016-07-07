var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
    	<nav className="navbar navbar-default">
				<div className="container">
					<ul className="nav navbar-nav">
						<li>
							<a id="nav-link" href="install.html">Install</a>
						</li>
						<li>
							<a id="nav-link" href="usage.html">Usage</a>
						</li>
						<li>
							<a id="nav-link" href="api.html">API</a>
						</li>
						<li>
							<a id="nav-link" href="https://github.com/kwangbkim/balanced">Code</a>
						</li>
					</ul>
				</div>
			</nav>
    );
  }
});
