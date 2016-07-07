var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
    	<nav className="navbar navbar-default">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#topnavbar" aria-expanded="false" aria-controls="navbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
					</div>
					<div className="collapse navbar-collapse" id="topnavbar">
						<ul className="nav navbar-nav navbar-default">
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
				</div>
			</nav>
    );
  }
});
