module.exports = function(app) {
        const pug = require('pug');
        var fs = require('fs');
        var util = require('util');
        var exec = require('child_process').exec;
        var bodyParser = require('body-parser');
        var youtubedl = require('youtube-dl');
        var jsonParser = bodyParser.json();
        var urlParser = bodyParser.urlencoded();
        app.get('/', function(req, res) {
            res.sendFile(__dirname + "/views/" + 'index.html');
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
                play_radio: false,
                radio: 'http://us3.internet-radio.com:8007/listen.pls&t=.pls',
                tone: 'https://www.youtube.com/watch?v=LkbJ90wwbO8'
            };
            radio.last_modified = new Date().toJSON();

            res.send(radio);
        });


        app.post('/setyoutube', urlParser, function(req, res) {
                    //    console.log(req.query);
                    var device = req.query.device || 'def';
                    var youtube_link = req.query.link || 'def'; //'https://www.youtube.com/watch?v=IH8RVvIHB9E';
                    console.log(youtube_link);
                    console.log(device);
                    exec("youtube-dl -o 'staticFolder/alarm.m4a' -f bestaudio --audio-format m4a " + youtube_link, function(error, stdout, stderr) {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                      });
                        //  var video = youtubedl(youtube_link,
                        // Optional arguments passed to youtube-dl.
                        //       ['--audio-format m4a']
                        // Additional options can be given for calling `child_process.execFile()`.
                        //      );

                        // Will be called when the download starts.
                        //    console.log('Device: ' , device);
                        //        video.on('info', function(info) {
                        //            console.log('Download started');
                        //            console.log('filename: ' + info.filename);
                        //            console.log('size: ' + info.size);
                        //        });

                        //   video.pipe(fs.createWriteStream('staticFolder/alarmtested.m4a'));
                        //set info to return from some file - temp db replacement
                        res.send('all ok');

                    });

                };
