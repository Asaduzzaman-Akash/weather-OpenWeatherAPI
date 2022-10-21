const express = require('express');
const app=express();
const bodyParser= require('body-parser');
const https= require('https');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +("/index.html"));
});


app.post("/",function(req,res){

  const query=req.body.cityName;
  const appKey="111e2cb5f89a89102603c9ea69726674";
  const unit="metric";

  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData= JSON.parse(data);
      const temp=weatherData.main.temp;
      const description= weatherData.weather[0].description;
      const icon= weatherData.weather[0].icon;
      const imgURL="http://openweathermap.org/img/wn/10d@2x.png";
      res.write("<p>The description of weather is "+description+ ".</p>");
      res.write("<h1>The current weather of "+ query +" is " +temp+" degree celsius.</h1>");
      res.write("<img src="+imgURL+">");
      res.send();
    });
  });



});

app.listen(3000,function(){
  console.log("server started on port 3000");
});
