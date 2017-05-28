"use strict";


function Switchery(name) {

	var jsonfile = require('jsonfile'),
	file = './lights.config',
	lights = jsonfile.readFileSync(file);

	this.name = name;
	this.status = lights[name].status;
	this.gpiostatus = lights[name].gpiostatus;

	this.changeStatus = function () {
		if (this.status) {
			this.status = false;
			this.gpiostatus = 0;
			lights[name].status = this.status;
			lights[name].gpiostatus = this.gpiostatus;
		}
		else {
			this.status = true;
			this.gpiostatus = 1;
			lights[name].status =this.status;
			lights[name].gpiostatus = this.gpiostatus;
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
