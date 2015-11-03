var Gpio = require('onoff').Gpio,
  options = {debounceTimeout:750}
  button1 = new Gpio(2, 'in', 'rising', options),
  button2 = new Gpio(3, 'in', 'rising', options),
  button3 = new Gpio(4, 'in', 'rising', options),
  button4 = new Gpio(7, 'in', 'rising', options),
  button5 = new Gpio(8, 'in', 'rising', options),
  btn1led1 = new Gpio(17, 'high'), //verannan valo
  btn1led2 = new Gpio(18, 'high'), //ykAula valo
  btn1led3 = new Gpio(27, 'high'), // varalla
  btn1led4 = new Gpio(22, 'high'), //ulkovalo
  ulkoValoRele = new Gpio(23, 'high'), //ulkovalorele
  testled1 = new Gpio(24, 'high');
  
  sw = require('./switchery'),
  aulasw = new sw.Switchery('aula'),
  ulkosw = new sw.Switchery('ulko'),
  ykMHsw = new sw.Switchery('ykMH'),
  verantasw = new sw.Switchery('veranta');

function exit() {
  button1.unexport();
  button2.unexport();
  button3.unexport();
  button4.unexport();
  button5.unexport();
  btn1led1.unexport();
  btn1led2.unexport();
  btn1led3.unexport();
  btn1led4.unexport();
  testled1.unexport();
  process.exit();
}

function mylight(err, state) {
	console.log('Button1 pushed');
	console.log(verantasw.status);
	
	setTimeout(function () {
		if (button1.readSync() != 1) {
			if (verantasw.status == 1) {
			btn1led1.writeSync(0);
			verantasw.changeStatus();
			} else {
				btn1led1.writeSync(1);
				verantasw.changeStatus();
		
			}
		}
			
		}, 100)
}


button1.watch(mylight);

button2.watch(function(err, value) {
  if (err) {
    throw err;
  }
  console.log('Button2 pushed');
  testled1.writeSync(1);  
});

button3.watch(function(err, value) {
  if (err) {
    throw err;
  }
  console.log('Button3 pushed');
});

button4.watch(function(err, value) {
  if (err) {
    throw err;
  }
  console.log('button4 pushed');
  	if (ulkosw.status == 1) {
	btn1led4.writeSync(0);
	ulkoValoRele.writeSync(0);
	ulkosw.changeStatus();
	} else {
		btn1led4.writeSync(1);
		ulkoValoRele.writeSync(1);
		ulkosw.changeStatus();

	}

});

button5.watch(function(err, value) {
  if (err) {
    throw err;
  }
  console.log('button5 pushed');
});

process.on('SIGINT', exit);
