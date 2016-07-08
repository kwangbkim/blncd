var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header.jsx');

var RequestTab = React.createClass({
	render: function() {
		var body = JSON.stringify(this.props.body, null, 2);
		var contentType = this.props.body != null ? "Content-Type: application/json" : null
		return (
			<pre>
				{this.props.requestType} http://blncd.io{this.props.url}<br/>
				{contentType}<br/>
				{body}
			</pre>
		);
	}
});

var ResponseTab = React.createClass({
	render: function() {
		var body = JSON.stringify(this.props.body, null, 2);
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
				<h4 className="api-header">{this.props.requestType} {this.props.url}</h4>
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
			<div className="container api-container">
				<ApiSection 
					url="/api/requests" 
					description="Add, delete, or email tasks."
					requestType="POST"
					requestBody={{"key":"api key","ask":"add buy apples"}}
					responseBody={{"description":"buy apples","type":"buy","quadrant":4,"date":"2016-07-08T22:15:44.353Z"}}
					responseStatus="200 OK"/>
				<ApiSection 
					url="/api/users" 
					description="Sign up for a new api key."
					requestType="POST"
					requestBody={{email: "optional" }}
					responseBody={{key: "api key", "email": 'email' }}
					responseStatus="201 Created"/>
				<ApiSection 
					url="/api/users/{key}" 
					description="Update or remove your email."
					requestType="PUT"
					requestBody={{email: "optional" }}
					responseBody={{key: "api key", email: "email" }}
					responseStatus="200 OK"/>
				<ApiSection 
					url="/api/users/{key}" 
					description="Remove your key and all associated data."
					requestType="DELETE"
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