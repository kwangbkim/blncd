'use strict';

var Header = React.createClass({
  render: function() {
    return (
    	<nav className="navbar navbar-default">
				<div className="container-fluid">
					<a href="/">
						<img className="logo" src="assets/logo.png"/>
					</a>
					<ul className="nav navbar-nav navbar-right">
						<li>
							<a href="install.html">Install</a>
						</li>
						<li>
							<a href="index.html">Usage</a>
						</li>
						<li>
							<a href="https://github.com/kwangbkim/balanced">Code</a>
						</li>
					</ul>
				</div>
			</nav>
    );
  }
});
