var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header.jsx');

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