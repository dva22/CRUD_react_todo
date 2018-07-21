const express =  require('express');
const path =  require('path');
const bodyParser  =  require('body-parser');
const db = require('./db');

const auth = require('./routes/auth');
const notes = require('./routes/notes');
const users =  require('./routes/users');



let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/notes', notes);

app.use(express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname,"/public/index.html"));

});


db.connect('mongodb://localhost:27017', function(err) {
    if (err) return console.log(err)

        app.listen(3000, () => console.log('Running on location:3000'));

});