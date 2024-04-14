const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apikey = "5daf8f0a8781d35c0e4ccac416edeb4e";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    response.on("data", (data) => {
      const weatherdata = JSON.parse(data);

      const temp = weatherdata.main.temp;
      const desc = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;

      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + desc + "</p>");
      res.write(
        "<h1>The temperature in " +
          query +
          " is : " +
          temp +
          " degree celcius</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
