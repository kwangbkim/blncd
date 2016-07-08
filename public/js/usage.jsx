var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header.jsx');

var TerminalUsageExample = React.createClass({
	render: function() {
		return (
			<div>
				$ blncd {this.props.value}<br/>
			</div>
		);
	}
});

var EmailUsageExample = React.createClass({
	render: function() {
		return (
			<div>
				{this.props.value}<br/>
			</div>
		);
	}
});

var UsageSection = React.createClass({
	render: function() {
		var exampleList = this.props.examples.map(function(request) {
			return <TerminalUsageExample value={request} />;
		});
		var mailExample = this.props.examples[this.props.examples.length-1];
		return (
			<div className="container usage-section">
				<div className="row">
					<div className="col-md-1 col-sm-1"/>
					<div className="col-md-2 col-sm-2">
						<h4 className="usage-header">{this.props.title}</h4>
					</div>
					<div className="col-md-8 col-sm-8">
						<h5 className="usage-subheader">CLI</h5>
						<pre>
							<strong>blncd {this.props.commandDescription}<br/></strong>
							{exampleList}
						</pre>
						<h5>Email</h5>
						<pre>
							<strong>{this.props.commandDescription}<br/></strong>
							{mailExample}
						</pre>
					</div>
					<div className="col-md-1 col-sm-1"/>
				</div>
			</div>
		);
	}
});

var UsageInstructions = React.createClass({
	render: function() {
		return (
			<div className="container">
				<UsageSection 
					title="Add" 
					commandDescription="[add | new] [request] [quadrant]"
					examples={[
						"add an important & urgent task 1",
						"add an important & not urgent task 2",
						"add a not important & urgent task 3",
						"add a not important & not urgent task 4",
						"add a not important & not urgent task"
					]}/>
				<UsageSection 
					title="Complete" 
					commandDescription="[done | complete | delete] [fuzzy matched description]"
					examples={[
						"add tasks are finished using a fuzzy match",
						"done fuzzy"
					]}/>
				<UsageSection 
					title="Complete Category" 
					commandDescription="[finish | finished] [type]"
					examples={[
						"add buy apples",
						"add buy oranges",
						"add buy grapes",
						"finish buy"
					]}/>
				<UsageSection 
					title="Email" 
					commandDescription="[mail | email | send]"
					examples={[
						"mail"
					]}/>
				<UsageSection 
					title="Get" 
					commandDescription="get"
					examples={[
						"get"
				]}/>
				<UsageSection 
					title="Get Category" 
					commandDescription="get [category]"
					examples={[
						"add buy apples",
						"add buy oranges",
						"get buy"
				]}/>
			</div>
		);
	}
});

var Usage = React.createClass({
  render: function() {
    return (
    		<div>
		    	<Header />
		    	<UsageInstructions />
		    </div>
    );
  }
});

ReactDOM.render(<Usage />, document.getElementById('usage'));