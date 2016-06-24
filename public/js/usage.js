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
			<div className="row">
				<div className="col-md-2 col-sm-2">
					<h4 className="usage-header">{this.props.title}</h4>
				</div>
				<div className="col-md-10 col-sm-10 demo">
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
						"add blank quadrant defaults to not important & not urgent task"
					]}/>
				<UsageSection 
					title="Complete" 
					commandDescription="[done | complete | delete] [fuzzy matched description]"
					examples={[
						"add buy some medicine",
						"done medicine"
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