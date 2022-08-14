const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000, function (){
    console.log("server connected at port 3000");
});


app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/",(req,res)=>{ // when the user send the city name
    const city = req.body.city;
    // console.log(city);
    https.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=eabeeff37c06b6affef5a4e1561578ba&units=metric",(respond)=>{
        console.log(respond.statusCode);
        respond.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temperature);
            console.log(description);
            res.write("<h1>The temperature at " + city + " is " + temperature + " degree Celcius.</h1>");
            res.write("<h2>The weather is "+ description +".</h2>");
            res.write("<img src ="+iconImage+"><img>");
            res.send();
        });
    });
});