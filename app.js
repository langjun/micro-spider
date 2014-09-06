var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

var host = 'http://striv.me/archives/19.html';
var html = '';

function spider (host) {
  request(host, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(data);
      var title = $('title').first().text();
      var article = $('.post-content').first().text();

        html = "" +
        "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        "<meta charset='UTF-8' />" +
        "<title>" + title + "</title>" +
        "</head>" +
        "<body>" +
        "<header><strong>" + title + "</strong></header>" +
        "<article>" + article + "</article>" +
        "</body>" +
        "</html>";
    } else {
        console.log("It's Error!");
    }
  });
}

spider(host);

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(html);
}).listen(3000);

console.log('Server running at localhost:3000');