module.exports = function(app) {
    const pug = require('pug');
    var fs = require('fs');
    var util = require('util');
    var exec = require('child_process').exec;
    var bodyParser = require('body-parser');
    var youtubedl = require('youtube-dl');
    var jsonParser = bodyParser.json();
    var urlParser = bodyParser.urlencoded();


  //  app.get('/', function(req, res) {
  //      res.sendFile(__dirname  + '/staticFolder/index.html');
  //  });

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
            play_radio: false,
            radio: 'http://us3.internet-radio.com:8007/listen.pls&t=.pls',
            tone: 'https://www.youtube.com/watch?v=LkbJ90wwbO8'
        };
        radio.last_modified = new Date().toJSON(); //.slice(0,10).replace(/-/g,'/');
        //    radio.update_song -?

        res.send(radio);
    });

    app.get('/radio2', function(req, res) {
        var content = fs.readFileSync('data.json');
        var jsonContent = JSON.parse(content);
        /*
                    var radio = {
                        alarm_on: true,
                        alarm_at: "11:11",
                        play_radio: false,
                        radio: 'http://us3.internet-radio.com:8007/listen.pls&t=.pls',
                        tone: 'https://www.youtube.com/watch?v=LkbJ90wwbO8'
                    };*/
        //  radio.last_modified = new Date().toJSON();

        res.send(jsonContent);
    });

    app.post('/setyoutube', urlParser, function(req, res) {
        //    console.log(req.query);
        var device = req.query.device || 'def';
        var youtube_link = req.query.link || 'def'; //'https://www.youtube.com/watch?v=IH8RVvIHB9E';
        console.log(youtube_link);
        console.log(device);
        var filePath = 'staticFolder/alarm.m4a';
        fs.unlinkSync(filePath, function(err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
        exec("youtube-dl -o 'staticFolder/alarm.m4a' -f bestaudio --audio-format m4a " + youtube_link, function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
                res.send(error);
            }
            var content = fs.readFileSync('data.json');
            var jsonContent = JSON.parse(content);
            jsonContent.tone = youtube_link;
            jsonContent.last_modified = new Date().toJSON();
            jsonContent.id = device;
            var json = JSON.stringify(jsonContent);
            fs.writeFile('data.json', json);

        });

        res.send('all ok');

    });

    app.post('/setradio', urlParser, function(req, res) {
        var device = req.query.device || 'def';
        var radio = req.query.radio || 'http://us3.internet-radio.com:8007/listen.pls&t=.pls'; //'https://www.youtube.com/watch?v=IH8RVvIHB9E';
    
        var content = fs.readFileSync('data.json');
        var jsonContent = JSON.parse(content);
        jsonContent.id = device;
        jsonContent.radio = radio;
        jsonContent.last_modified = new Date().toJSON();
        jsonContent.play_radio = true;
        var json = JSON.stringify(jsonContent);
        fs.writeFile('data.json', json);

        res.send('all ok');

    });
};
