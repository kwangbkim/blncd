var React = require('react');
var ReactDOM = require('react-dom');
var Carousel = require('nuka-carousel');
var Header = require('./header.jsx');
var Terminal = require('./terminal.jsx');

var Hero = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Carousel>
					<Terminal />
					<div><h2>hello</h2></div>
				</Carousel>
			</div>
		);
	}
});

var Index = React.createClass({
	render: function() {
		return (
				<div>
					<Header />
					<Hero />
				</div>
		);
	}
});

ReactDOM.render(<Index /> , document.getElementById('index'));