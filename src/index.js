const fs = require('fs')
  , ivona = require('./ivona')
  , player = require('./player')
  , vorpal = require('vorpal')();
// ivona.listVoices()
//   .on('complete', function (voices) {
//     console.log(voices);
//   });

vorpal
  .delimiter('ivonaNode$')
  .show()

vorpal
  .command('say', 'tell me what to say:')
  .action(function (args, cb) {
    const self = this;

    this.prompt({
      type: 'input',
      name: 'continue',
      message: 'what should I say? \n> ',
    },
      function (result) {
        if (result.continue == '') {
          self.cancel(function () {
          });
        } else {
          say(result.continue)
            .then(() => {
              vorpal.execSync('say');
            })
            .catch((err) => { console.log(err) });
        }
      });
  });

function say(speach) {

  return new Promise((resolve, reject) => {
    ivona(speach, '../temp/temp.mp3')
      .then((path) => {
        player(path)
      })
      .then(() => {
        console.log('I say: "' + speach + '"');
        resolve();
      })
      .catch(err => { reject(err) })
  });
}
