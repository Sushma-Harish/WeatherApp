const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();
const superagent = require('superagent');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.listen(3002, function () {
    console.log("server is listening on port 3000");
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = 'b99a87c2e13848ff8da122432221909';
    const unit = "metric";
    (async function () {
        const response = await superagent.get('https://api.weatherapi.com/v1/current.json?key= b99a87c2e13848ff8da122432221909&q=India')
        let country = response.text;
        const obj = JSON.parse(country);
        console.log(obj.location)
    })();
    (async function () {
        const response = await superagent.get('http://api.weatherapi.com/v1/forecast.json?key= b99a87c2e13848ff8da122432221909&q=India&days=1&aqi=no&alerts=no')
        let country = response.text;
        const obj = JSON.parse(country);
        // console.log(obj.forecast.forecastday);
        // console.log(obj.astro);
        let astrodetails = obj.forecast.forecastday
        let obj1 = Object.assign({}, astrodetails)
        console.log(obj1[0].astro)

    })();


    console.log("post req received");
})
