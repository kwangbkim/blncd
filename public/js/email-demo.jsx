var React = require('react');

var Reply = React.createClass({
  render: function() {
    return (
    	<div className="container email">
      	<div className="row">
          <div className="col-md-4 col-xs-3"/>
        	<div className="col-md-6 col-xs-3">
            <p id="email-body">
              {this.props.body}
            </p>
          </div>
          <div className="col-md-2 col-xs-9">
         		<button>send</button>
          </div>
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
    	<div className="container email">
      	<div className="row">
          <div className="col-md-4"/>
          <div className="col-md-6">
          	<p id="email-header">
            	<strong>{this.props.address}</strong><br/>
              subject: blncd tasks
            </p>
            <p id="email-body">
  						{body}
            </p>
          </div>
          <div className="col-md-2"/>
        </div>
      </div>
    );
  }
});

var EmailDemo = React.createClass({
  render: function() {
    return (
    	<div className="container">
        <Email 
          lines={['read nodejs book', 'do something else']}
          address="from: tasks@blncd.io"
        />
        <Email 
        lines={['done nodejs']}
        address="to: tasks@blncd.io"
        />
        <Reply body="add pick up something"/>
      </div>
    );
  }
});

module.exports = EmailDemo;