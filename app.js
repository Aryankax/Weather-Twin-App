//Type node app.js in your bash terminal to start the app!

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = '********'; //Enter your own OpenWeather API KEY

app.use(express.static('public'));

const axios = require('axios');

var fs = require('fs');
const ejs = require('ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
      
      res.render('index');
  });

  app.post('/Forecast', async (req, res) => {
    try {

        let city = req.body.city;
        let city2 = req.body.city2
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      
        let url2 = `http://api.openweathermap.org/data/2.5/weather?q=${city2}&units=metric&appid=${apiKey}`;

      const response1 = await axios.get(url);
      const response2 = await axios.get(url2);
      
      const data = {
        data1: response1.data,
        data2: response2.data
      };
      
      res.render('Forecast', { data });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  app.post('/newLocation', function(req, res){
    res.redirect("/")
  })

  app.listen(3000, function() {
    console.log("Server Started on http://localhost:3000/")
  })