module.exports = function(app) {
  const pug = require('pug');
    /*
        var song = require('./controllers/song');
        app.get('/song', song.findAll);
        app.post('/song', song.add);
        app.put('/song/:id', song.update);
        app.delete('/song/:id', song.delete);
*/
  //      var device = require('./controllers/device');
  //      app.get('/device', device.findAll);
  //      app.post('/device', device.add);
  //      app.put('/user/:id', user.update);
  //      app.delete('/user/:id', user.delete);

    app.get('/', function(req, res) {
      res.sendFile(__dirname + "/simple.html");
    });

    app.get('/hfile', function(req, res) {
        res.send(pug.renderFile('views/index.pug', {
            title: 'Hey DOn',
            message: ' It works key!',
            item: {a:'abc', b:'before', c:'continue'},
            im: "Cats-ear1-996x1024.jpg"
        }));
    });

    app.get('/radio', function(req, res){
      //test with single http://80.232.162.149:8000/plus96mp3.m3u -> radio swh
      var radio =
    { alarm_on: true,
      alarm_at: "11:11",
      tone: 'http://80.232.162.149:8000/plus96mp3.m3u'};
      radio.last_modified = new Date().toJSON();//.slice(0,10).replace(/-/g,'/');
  //    radio.update_song -?

      res.send(        radio      );
    });
    app.get('/radio2', function(req, res){
      //test with single http://80.232.162.149:8000/plus96mp3.m3u -> radio swh
      var radio =
    { alarm_on: true,
      alarm_at: "11:11",
      tone: 'https://www.youtube.com/watch?v=LkbJ90wwbO8'};
      radio.last_modified = new Date().toJSON();//.slice(0,10).replace(/-/g,'/');

      res.send(        radio      );
    });

};
