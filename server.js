const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    switch (true) {
        case req.url === '/' && req.method === 'GET':
            fs.readFile('./public/index.html', function (err, data) {
                res.setHeader('content-type', 'text/html; charset=utf-8');
                res.end(data);
                console.log(req.url);

            })
            break;
        case req.url === '/style.css' && req.method === 'GET':
            fs.readFile('./public/style.css', function (err, data) {
                res.setHeader('content-type', 'text/css; charset=utf-8');
                res.end(data);
                console.log(req.url);

            })
            break;
        case req.url === '/lib/bootstrap-5.2.0-beta1-dist/css/bootstrap.min.css' && req.method === 'GET':
            fs.readFile('./lib/bootstrap-5.2.0-beta1-dist/css/bootstrap.min.css', function (err, data) {
                res.setHeader('content-type', 'text/css; charset=utf-8');
                res.end(data);
                console.log(req.url);

            })
            break;
        case req.url === '/node_modules/font-awesome/css/font-awesome.min.css' && req.method === 'GET':
            fs.readFile('./node_modules/font-awesome/css/font-awesome.min.css', function (err, data) {
                res.setHeader('content-type', 'text/css; charset=utf-8');
                res.end(data);
                console.log(__dirname, req.url);

            })
            break;

        case req.url === '/main.js' && req.method === 'GET':
            fs.readFile('./public/main.js', (err, file) => {
                res.setHeader('content-type', 'application/javascript; charset=utf-8');
                res.end(file);
                console.log(req.url);

            })
            break;
        case req.url === '/film' && req.method === 'GET':
            fs.readFile('./db/movies.json', (err, file) => {
                res.setHeader('content-type', 'application/json; charset=utf-8');
                res.end(file);
                console.log(req.url);

            })
            break;
            case req.url === '/film' && req.method === 'POST':
                let body="";
                req.on('data', function (chunk) {
                    body+=chunk.toString();
                });
    
                req.on('end', function () {
                    const newFilm = JSON.parse(body);
                    fs.readFile('./db/movies.json', (err, data) => {
                        const moviesData = JSON.parse(data); // Átneveztük film-et moviesData-ra
                        moviesData.film.push(newFilm); // Hozzáadjuk az új filmet a films tömbhöz
                    
                        fs.writeFile('./db/movies.json', JSON.stringify(moviesData), () => {
                            res.end(JSON.stringify(newFilm));
                        });
                    });
                });
                
    
    
                break;

        default:
            res.setHeader('content-type', 'text/html; charset=utf-8');
            res.writeHead(404);
            res.end('Oldal nem található');

    }
});

server.listen(3000);