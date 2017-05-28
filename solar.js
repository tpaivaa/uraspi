#!/usr/bin/env node
/*jshint esversion: 6 
*/
"use strict";
var azure = require('azure-storage');
var nconf = require('nconf');
        nconf.env()
        .file({ file: 'config.json'});
var mqtt = require('mqtt')


var tableName = nconf.get("TABLE_NAME");
var partitionKey = nconf.get("PARTITION_KEY");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");
var mqtt_username = nconf.get("mqtt_USERNAME");
var mqtt_password = nconf.get("mqtt_password");


var mqtt_options = {username: mqtt_username, password: mqtt_password}
var client  = mqtt.connect('mqtt://10.10.10.2', mqtt_options)

var now = new Date().toString().substr(0,24);



var retryOperations = new azure.ExponentialRetryPolicyFilter();
var tableSvc = azure.createTableService(accountName, accountKey).withFilter(retryOperations);

tableSvc.createTableIfNotExists(tableName, function(error, result, response){
    if(!error){
        // Table exists or created
      console.log('Creation of table',result.entries);
    }
    if(error && error.code) {
      console.log('error: ' + error.code);

    }
});


var entGen = azure.TableUtilities.entityGenerator;
var getVoltage = (vol)=> {
		var now = new Date().toString().substr(0,24);
		var voltageI = {
		  PartitionKey: entGen.String(vol.partitionKey),
		  RowKey: entGen.String(new Date().valueOf()),
		  Voltage: entGen.String(vol.voltage),
		  Time: entGen.String(now)
		};
	return voltageI
	}


var updateVoltage2Azure = (tableName, voltageI) => {
	tableSvc.insertOrReplaceEntity(tableName, voltageI, function(error, result, response){
	        if(!error) {
	        // Entity updated
	                console.log('Entity updated ! ', voltageI);
	        }
	        if(error && error.code) {
	                console.log('error: ' + error.code);
	        }
	});
}
 
client.on('connect', function () {
  client.subscribe('home/solarlogger/voltage')
})
 
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(now ,message.toString())
  //client.end()
})

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
console.log('Ctrl-C...');
client.end();
process.exit(2);
});