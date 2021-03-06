import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.dev.js';
const bodyParser  =  require('body-parser');

const db = require('./db')

const auth = require('./routes/auth');
const notes = require('./routes/notes');
const users =  require('./routes/users');


let app = express();


app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/notes', notes);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname,"/public/index.html"));
});

db.connect('mongodb://localhost:27017', function(err) {
    if (err) return console.log(err)

    app.listen(3000, () => console.log('Running on location:3000'));

});