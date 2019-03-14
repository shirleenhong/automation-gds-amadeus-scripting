import { createServer } from 'https';
import { readFileSync, readFile } from 'fs';

var options = {
    pfx: readFileSync('localhost.pfx'),
    passphrase: 'ze7ywSSXEzJ5rlMyJ/OxG+fRe311P6onGs7QxD/8DSTKtzbEmztWiyn+FOhRgi2b+obHA7Fqttj7V22FnErNbN0eOAkRPLKUM+JRs0/fmfCokYzE5qiWaoBqy97P+tIugNzctviAwrGrEZ9zx8T1ckyK+OI3bKogrgbYkWHZ98U='
};

var server = createServer(options, function (request, response) {
    readFile('index.html', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
}).listen(5443, function(){
    console.log('server running');
});