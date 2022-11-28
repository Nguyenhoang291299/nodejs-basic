import configViewEngine from './configs/viewEngine';
import initWebRoute from "./route/web";
import initApiRoute from "./route/api";
import connection from './configs/connectDB';
const express = require('express');
require('dotenv').config();
var morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;
app.use(morgan('combined'));

app.use((req,res) => {
  console.log("run into my middleware");
  console.log(req.method);
  console.log(req.header);
})

app.use(express.urlencoded({ extended:true}));
app.use(express.json());
configViewEngine(app);

// init web route
initWebRoute(app)

// init api route
initApiRoute(app)

// handle 404 not found
app.use((req,res) => {
  return res.render('404.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})