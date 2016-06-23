'use strict';

var Header = React.createClass({
  render: function() {
    return (
    	<div className="header-container">
				<nav className="navbar-default">
					<a href="/">
						<img className="logo" src="assets/logo.png"/>
					</a>
					<ul className="nav-link-list">
						<li className="nav-link-li">
							<a className="nav-link" href="index.html">Install</a>
						</li>
						<li className="nav-link-li">
							<a className="nav-link" href="index.html">Usage</a>
						</li>
						<li className="nav-link-li">
							<a className="nav-link" href="https://github.com/kwangbkim/balanced">Code</a>
						</li>
					</ul>
				</nav>
			</div>
    );
  }
});

ReactDOM.render(<Header />, document.getElementById('header'));