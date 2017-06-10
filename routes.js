module.exports = function(app) {
    const pug = require('pug');
    var fs = require('fs');
    var bodyParser = require('body-parser');
    var youtubedl = require('youtube-dl');
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

    app.get('/hfile', function(req, res) { // example for specific file filled template
        res.send(pug.renderFile('views/index.pug', {
            title: 'Hey Don',
            message: ' It works key!',
            item: {
                a: 'abc',
                b: 'before',
                c: 'continue',
                nevermind_me: ' but this works'
            },
            im: "Cats-ear1-996x1024.jpg"
        }));
    });

    app.get('/radio', function(req, res) {
        //test with single http://80.232.162.149:8000/plus96mp3.m3u -> radio swh
        var radio = {
            alarm_on: true,
            alarm_at: "11:11",
            radio: false,
            tone: 'http://80.232.162.149:8000/plus96mp3.m3u'
        };
        radio.last_modified = new Date().toJSON(); //.slice(0,10).replace(/-/g,'/');
        //    radio.update_song -?

        res.send(radio);
    });

    app.get('/radio2', function(req, res) {
        var radio = {
            alarm_on: true,
            alarm_at: "11:11",
            radio: false,
            tone: 'https://www.youtube.com/watch?v=LkbJ90wwbO8'
        };
        radio.last_modified = new Date().toJSON();

        res.send(radio);
    });
/*
  //  var jsonParser = bodyParser.json();
//    var urlencodedParser = bodyParser.urlencoded({ extended: false });
    app.post('/setyoutube', function(req, res) {
    console.log(req.body);
    //  if (!req.body) return res.sendStatus(400);


    var device = req.body.device || 'def';
    var youtube_link = req.body.link || 'https://www.youtube.com/watch?v=IH8RVvIHB9E';
    /*    var video = youtubedl(youtube_link,
            // Optional arguments passed to youtube-dl.
            ['--audio-format m4a']
            // Additional options can be given for calling `child_process.execFile()`.
            );

        // Will be called when the download starts.
        console.log('Device: ' , device);
        video.on('info', function(info) {
            console.log('Download started');
            console.log('filename: ' + info.filename);
            console.log('size: ' + info.size);
*/
//                res.send('all ok');
      //  });

//        video.pipe(fs.createWriteStream('/staticFolder/alarmtested.m4a'));
        //set info to return from some file - temp db replacement
      //  res.send('all ok');

//    });

};
