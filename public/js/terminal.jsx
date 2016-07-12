var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
    	lines: [
	    	'$ blncd add discuss startup idea with Tom 1',
	    	'$ blncd add read nodejs book 2',
	    	'$ blncd add watch game of thrones 4',
	    	'$ blncd get',
	    	' ',
	    	'- Important & Urgent -',
	    	'discuss startup idea with Tom',
	    	' ',
	    	'- Important & Not Urgent -',
	    	'read nodejs book',
	    	' ',
	    	'- Not Important & Not Urgent -',
	    	'watch game of thrones',
	    	'                ',
	    	'$ blncd done tom',
	    	'$ blncd done node',
	    	'$ blncd get',
	    	' ',
	    	'- Not Important & Not Urgent -',
	    	'watch game of thrones',
	    	'        ',
	    	'$ blncd mail'
    	],
    	animationCount: 0,
    	elapsed: 0,
    	currentLine: 0
    };
  },
  tick: function() {
  	this.setState({elapsed: this.state.elapsed + 1});

  	var initialDelay = 60;
  	if (this.state.animationCount < initialDelay) {
  		this.setState({animationCount: this.state.elapsed < initialDelay ? 0 : this.state.elapsed - initialDelay});
  	} else {
  		this.setState({animationCount: this.state.animationCount + 1});
  	}
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 75);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
	render: function() {
		var lines = this.state.lines;
		var lineStates = [];
		lineStates[0] = lines[0].substring(0, this.state.animationCount);

		var lastCompletedLineElapsed = 0;
		for(var i = 1; i<lines.length; i++) {
			if (lineStates[i-1] === lines[i-1])
				lastCompletedLineElapsed += lines[i-1].length;
			if (lineStates[i-1] !== lines[i-1])
				lineStates[i] = "";	
			else {
				if (lines[i].charAt(0) === '$' || lines[i].charAt(0) === ' ')
					lineStates[i] = lines[i].substring(0, this.state.animationCount - lastCompletedLineElapsed);
				else
					lineStates[i] = lines[i];
			}
			if (lastCompletedLineElapsed > this.state.animationCount)
				this.setState({animationCount: lastCompletedLineElapsed});
		}

		var terminalText = lineStates.map(function(line) { 
				return (<span>{line}<br/></span>);
		});

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-2 col-sm-2"/>
					<div className="col-md-8 col-sm-8 col-xs-12">
						<p id="terminal-top"/>
			      <p id="terminal-body">
			      	{terminalText}
		      	</p>
					</div>
					<div className="col-md-2 col-sm-2"/>
				</div>
      </div>
		);
	}
});