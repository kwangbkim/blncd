'use strict';

var Header = React.createClass({
  render: function() {
    return (
    	<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
						<a href="/">
							<img className="logo" src="assets/logo.png"/>
						</a>
					</div>
					<div className="collapse navbar-collapse" id="#navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">
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