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
								<a id="nav-link" href="index.html">Usage</a>
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

var InstallInstructions = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="row">
	  			<div className="col-md-2"/>
	  			<div className="col-md-8">
	  				<h2 className="install-header">Installation</h2>
						<h4>npm</h4>
						<pre>
							$ npm install blncd -g<br/>
							$ #run initial setup<br/>
							$ blncd<br/>
						</pre>
	  			</div>
	  			<div className="col-md-2"/>
				</div>
			</div>
		);
	}
});

var Install = React.createClass({
  render: function() {
    return (
    		<div>
		    	<Header />
		    	<InstallInstructions />
		    </div>
    );
  }
});

ReactDOM.render(<Install />, document.getElementById('install'));