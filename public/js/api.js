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

var RequestTab = React.createClass({
	render: function() {
		var body = this.props.body ? "\n" + this.props.body : null;
		return (
			<pre>
				{this.props.requestType} http://blncd.io{this.props.url}<br/>
				{body}
			</pre>
		);
	}
});

var ResponseTab = React.createClass({
	render: function() {
		var body = this.props.body ? "\n" + this.props.body : null;
		return (
			<pre>
				Status: {this.props.status}<br/>
				{body}
			</pre>
		);
	}
});

var ApiSection = React.createClass({
	render: function() {
		return (
			<div className="container api-section">
				<h4 className="default-header">{this.props.requestType} {this.props.url}</h4>
				<small>{this.props.description}</small>
				<div className="row">
					<div className="col-md-6">
						<h5>Request</h5>
						<RequestTab requestType={this.props.requestType} body={this.props.requestBody} url={this.props.url}/>
					</div>
					<div className="col-md-6">
						<h5>Response</h5>
						<ResponseTab body={this.props.responseBody} status={this.props.responseStatus}/>
					</div>
				</div>
			</div>
		);
	}
});

var ApiList = React.createClass({
	render: function() {
		return (
			<div className="container">
				<ApiSection 
					url="/api/users" 
					description="Sign up for a new api key."
					requestType="POST"
					requestBody="{ 'email': 'optional' }"
					responseBody="{ 'key':'user api key', 'email': 'user email' }"
					responseStatus="201 Created"/>
				<ApiSection 
					url="/api/users/{key}" 
					description="Update or remove your email."
					requestType="PUT"
					requestBody="{ 'email': 'optional' }"
					responseBody="{ 'key':'user api key', 'email': 'user email' }"
					responseStatus="200 OK"/>
				<ApiSection 
					url="/api/users/{key}" 
					description="Remove your key and all associated data."
					requestType="DELETE"
					requestBody=""
					responseBody=""
					responseStatus="200 OK"/>
			</div>
		);
	}
});

var Api = React.createClass({
  render: function() {
    return (
    		<div>
		    	<Header />
		    	<ApiList />
		    </div>
    );
  }
});

ReactDOM.render(<Api />, document.getElementById('api'));