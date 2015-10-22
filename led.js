var Gpio = require('onoff').Gpio,
  button1 = new Gpio(2, 'in', 'rising'),
  button2 = new Gpio(3, 'in', 'rising'),
  button3 = new Gpio(4, 'in', 'rising'),
  button4 = new Gpio(7, 'in', 'rising'),
  btn1led1 = new Gpio(17, 'high'),
  btn1led2 = new Gpio(18, 'high'),
  btn1led3 = new Gpio(27, 'high'),
  btn1led4 = new Gpio(22, 'high'),
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
  btn1led1.unexport();
  btn1led2.unexport();
  btn1led3.unexport();
  btn1led4.unexport();
  process.exit();
}


button1.watch(function(err, value) {
  if (err) {
    throw err;
  }
  console.log('Button1 pushed');
  verantasw.changeStatus();
  console.log(verantasw.status);
  console.log(verantasw.gpiostatus);
  btn1led1.writeSync(verantasw.gpiostatus);

});

button2.watch(function(err, value) {
  if (err) {
    throw err;
  }
  console.log('Button2 pushed');
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
});

process.on('SIGINT', exit);
