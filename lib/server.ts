import app from "./app";


const port = 4040 || process.env.port;
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

//curl 'http://localhost:4040' -method:post -body:id=12,name='keiwan',age=38
//node --inspect dist/server.js
//chrome://inspect/


