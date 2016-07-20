const props = require('./properties');
const mongoose = require('mongoose');

let mongoUrl = props.get("mongo:url")
	.replace('{BLNCD_DB_PASSWORD}', props.get('BLNCD_DB_PASSWORD'))
	.replace('{BLNCD_DB_USER}', props.get('BLNCD_DB_USER'))
	.replace('{BLNCD_DB_URL}', props.get('BLNCD_DB_URL'));
if (props.get('BLNCD_DB_REPLICA'))
	mongoUrl = mongoUrl + "?replicaSet=" + props.get('BLNCD_DB_REPLICA');

var options = {
	server: {
		socketOptions: {
			keepAlive: 300000,
			connectTimeoutMS: 30000
		}
	},
	replset: {
		poolSize: 5,
		socketOptions: {
			keepAlive: 300000,
			connectTimeoutMS: 30000
		}
	}
};

mongoose.connect(mongoUrl, options);