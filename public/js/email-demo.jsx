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
    	<div className="container email-container">
      	<div className="row">
          <div className="col-md-4 col-sm-4"/>
          <div className="col-md-4 col-sm-4 email">
          	<p className="email-body">
            	<strong>{this.props.direction}: tasks@blncd.io</strong><br/>
              {body}
            </p>
          </div>
          <div className="col-md-4 col-sm-4"/>
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
  componentDidUpdate: function() {
    if (this.state.elapsed > 10)
      this.state.elapsed = 0;
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    var actions = [
      {
        lines: ['read nodejs book', 'buy apples', 'watch game of thrones'],
        direction: 'from'
      },
      {
        lines: ['done node'],
        direction: 'to'
      },
      {
        lines: ['add research vacation ideas 1'],
        direction: 'to'
      },
      {
        lines: ['done apples'],
        direction: 'to'
      },
      {
        lines: ['mail'],
        direction: 'to'
      },
      {
        lines: ['research vacation ideas', 'watch game of thrones'],
        direction: 'from'
      }
    ];

    var emails = [];
    for (var i=0; i<this.state.elapsed && i<actions.length; i++) {
      emails.push(<Email key={i} lines={actions[i].lines} direction={actions[i].direction}/>);
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