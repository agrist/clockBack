module.exports = function(app) {
  const pug = require('pug');
    /*
        var song = require('./controllers/song');
        app.get('/song', song.findAll);
        app.post('/song', song.add);
        app.put('/song/:id', song.update);
        app.delete('/song/:id', song.delete);

        var user = require('./controllers/device');
        app.get('/user', user.findAll);
        app.post('/user', user.add);
        app.put('/user/:id', user.update);
        app.delete('/user/:id', user.delete);
    */
    app.get('/hello', function(req, res) {
        res.send(pug.renderFile('views/index.pug', {
            title: 'Hey DOn',
            message: ' It works key!',
            im: "Cats-ear1-996x1024.jpg"
        }));
    });

    app.get('/hfile', function(req, res) {
        res.sendFile(__dirname + "/simple.html");
    });

};
