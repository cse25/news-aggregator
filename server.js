const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false} );
const requireSignin = passport.authenticate('local', { session: false } );

// mongoose.connect('mongodb://localhost:auth/auth');
mongoose.connect('mongodb://chrisjc25:pw12345@ds117869.mlab.com:17869/news-aggregator');

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup', Authentication.signup);
app.post('/favorites', Authentication.getFavorites);
app.post('/save', Authentication.saveFavorites);

// router(app);

app.get('/hello', (req, res) => res.send({ hi: 'there' }));

if (process.env.NODE_ENV !== 'production') {
  console.log('if');
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  console.log('else');
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(process.env.PORT || 3050, () => console.log('Listening on 3050'));

// // DB Setup
// mongoose.connect('mongodb://localhost:auth/auth');
// mongoose.connect('mongodb://chrisjc25:pw12345@ds117869.mlab.com:17869/news-aggregator');

// // App Setup
// app.use(morgan('combined'));
// app.use(cors());
// app.use(bodyParser.json({ type: '*/*' }));
// router(app);

// // Server Setup
// const port = process.env.PORT || 3090;
// const server = http.createServer(app);
// server.listen(port);
// console.log('Server listening on:', port);
