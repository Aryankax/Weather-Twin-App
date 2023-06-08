//Type node app.js in your bash terminal to start the app!

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = '5d3b206d05a51aabd36d23eb3c2f4782'; //Enter your own OpenWeather API KEY

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

        let urlFirstCity5Days = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&cnt=5&units=metric`;

        let urlSecondCity5Days = `http://api.openweathermap.org/data/2.5/forecast?q=${city2}&appid=${apiKey}&cnt=5&units=metric`;

      const response1 = await axios.get(url);
      const response2 = await axios.get(url2);
      const response3 = await axios.get(urlFirstCity5Days);
      const response4 = await axios.get(urlSecondCity5Days);

      // var today = new Date();
      // var todayDate = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
      // var day = "";
      // var currentDayNum = today.getDay();
      // var tomorrowDate = new Date();
      // tomorrowDate.setDate(today.getDate() +1);
      // var tomorrowDate2 = new Date();
      // tomorrowDate2.setDate(today.getDate() +2) + "/" + today.getMonth() + "/" + today.getFullYear();
      // var tomorrowDate3 = today.setDate(today.getDate() +3) + "/" + today.getMonth() + "/" + today.getFullYear();
      // var tomorrowDate4 = today.setDate(today.getDate() +4) + "/" + today.getMonth() + "/" + today.getFullYear();
      // var tomorrowDate5 = today.setDate(today.getDate() +5) + "/" + today.getMonth() + "/" + today.getFullYear();

      // console.log(tomorrowDate2)
      

      // const DateObject = {
      //   Today: todayDate,
      //   Tomorrow: tomorrowDate,
      //   DayAfterTomorrow: tomorrowDate2,
      //   DayAfterTomorrow1: tomorrowDate3,
      //   DayAfterTomorrow2: tomorrowDate4,
      //   DayAfterTomorrow3: tomorrowDate5
      // }
    
      const data = {
        data1: response1.data,
        data2: response2.data,
        data3: response3.data,
        data4: response4.data,
        // Date: DateObject
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

  const port = process.env.PORT || 9001;
  app.listen(port, function() {
    console.log(`Server Started on port ${port}`)
  })


  