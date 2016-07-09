var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var EmailHeader = React.createClass({  
  render: function() {
    return (
      <div className="container email-container">
        <div className="row">
          <div className="col-md-4 col-sm-4"/>
          <div className="col-md-4 col-sm-4 email">
            <p className="email-header">
              Tasks from blncd.io
            </p>
          </div>
          <div className="col-md-4 col-sm-4"/>
        </div>
      </div>
    );
  }
});

var Email = React.createClass({
  render: function() {
  	var lines = this.props.lines;
  	var body = lines.map(function(line) { 
				return (<span>{line}<br/></span>);
		});
    
    return (
      <div key={this.props.key}>
      	<div className="container email-container">
        	<div className="row">
            <div className="col-md-4 col-sm-4"/>
            <div className="col-md-4 col-sm-4 email">
            	<p className="email-body">
              	<strong>{this.props.address}</strong><br/>
                {body}
              </p>
            </div>
            <div className="col-md-4 col-sm-4"/>
          </div>
        </div>
      </div>
    );
  }
});

var EmailDemo = React.createClass({
  getInitialState: function() {
    return {
      elapsed: 1
    };
  },
  tick: function() {
    this.setState({elapsed: this.state.elapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 2000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    var actions = [
      {
        lines: ['read nodejs book', 'buy apples'],
        address: 'from: tasks@blncd.io'
      },
      {
        lines: ['done node'],
        address: 'to: tasks@blncd.io'
      },
      {
        lines: ['add research vacation ideas 1'],
        address: 'to: tasks@blncd.io'
      },
      {
        lines: ['done apples'],
        address: 'to: tasks@blncd.io'
      },
      {
        lines: ['mail'],
        address: 'to: tasks@blncd.io'
      }
    ];

    var emails = [];
    for (var i=0; i<this.state.elapsed && i<actions.length; i++) {
      emails.push(<Email key={i} lines={actions[i].lines} address={actions[i].address}/>);
    }

    return (
    	<div className="email-demo-container">
        <EmailHeader />
        <ReactCSSTransitionGroup transitionName="email-list" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {emails}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = EmailDemo;