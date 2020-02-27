const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

console.log("Pegando");

app.use('/',(req,res) => {
    res.render('index.html');
});

let msg = [];

io.on('connection', socket =>{
    console.log(`User ID: ${socket.id}`);
    socket.emit('previewMessage', msg);
    socket.on('sendMessage', data => {
        msg.push(data);
        console.log(data);
        socket.broadcast.emit('chegadaMsg', data);
    });
});
server.listen(process.env.PORT || 3000);
console.log("https://localhost:"+process.env.PORT);
