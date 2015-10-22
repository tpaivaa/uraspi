"use strict";


function Switchery(name) {

	var jsonfile = require('jsonfile'),
	file = './lights.config',
	lights = jsonfile.readFileSync(file);

	this.name = name;
	this.status = lights[name].status;

	this.changeStatus = function () {
		if (this.status) {
			this.status = false;
			lights[name].status = this.status;
		}
		else {
			this.status = true;
			lights[name].status =this.status;
		}
		jsonfile.writeFileSync(file,lights);
	}
}


function Switches() {
	
}


module.exports = {
        Switchery: Switchery,
        Switches: Switches
    };
