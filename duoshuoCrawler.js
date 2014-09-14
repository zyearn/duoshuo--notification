var http = require('http');
var fs = require('fs')

var options = {
    hostname: 'zyearn.duoshuo.com',
    port: 80,
    path: '/api/posts/list.json?order=desc&source=duoshuo%2Crepost&max_depth=1&limit=30&related%5B%5D=thread&related%5B%5D=iplocation&nonce=541285d052af9&status=all',
    headers:{
        'Connection': 'Close',
        'Cache-Control': 'max-age=0',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Referer': 'http://zyearn.duoshuo.com/admin/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Accept-Charset': 'utf-8',
        'Cookie': 'duoshuo_unique=4214757617811062784; PHPSESSID=do7mnehf79llfvntf2jj471op5'
    }
};

var file_path = "./num";

fs.readFile(file_path, function(err, datanum){
    if (err) throw err;

    http.get(options, function(res) {
        var chunks = [];
        var size = 0;
        
        res.on('data', function(d) {
            //console.log('data receid');
            chunks.push(d);
            size += d.length;
        });
        
        res.on('end', function(){
            var data = Buffer.concat(chunks , size).toString();
            var jdata = JSON.parse(data);
            var messnum = jdata.cursor.total;

            if (datanum.toString() == messnum){
                console.log('no new message');
            }else {
                // MUTT
                console.log(datanum.toString());
                console.log(messnum);    
                console.log('there is new message');
                fs.writeFile(file_path, messnum, function(err){
                    if (err) throw err;
                });
            }
        });

    }).on('error', function(e) {
        console.error(e);
    });
});

