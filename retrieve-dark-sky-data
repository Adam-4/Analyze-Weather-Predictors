var temperature_container;
var humidity_container;
var windSpeed_container;

function forecast(days_in_future) {
  //Set up
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();

  var today = new Date(year,month,day);
  today = today.getTime()+43200000
  twelveToday_unix_seconds = today/1000
  
  var unix_timeStamp = twelveToday_unix_seconds+(days_in_future*86400); //Always [days_in_future] days after 12:00 that day
  var response = UrlFetchApp.fetch("https://api.darksky.net/forecast/be75fd947cf9ab041843852f412858a2/40.299,-83.0726,"+unix_timeStamp+"?exclude=minutely,hourly,daily,alerts,flags");
  var text = response.getContentText();var json = JSON.parse(text);var currently = json["currently"];
  //Three values to be obtained
  var temperature = currently["temperature"];var humidity = currently["humidity"];var windSpeed = currently["windSpeed"];
  temperature_container = Math.round(temperature);windSpeed_container = Math.round(windSpeed);humidity_container = humidity;
  log(temperature_container,humidity_container,windSpeed_container);
}


function log() {
  var args = arguments;
  for (i=0; i<args.length; i++) {
    Logger.log(args[i]);
  }
}

function getData() {
  forecast(0);
  var temp_now = temperature_container;
  var hum_now = humidity_container;
  var wind_now = windSpeed_container;
  forecast(1);
  var temp_one = temperature_container;
  var hum_one = humidity_container;
  var wind_one = windSpeed_container;
  forecast(5);
  var temp_five = temperature_container;
  var hum_five = humidity_container;
  var wind_five = windSpeed_container;
  forecast(10);
  var temp_ten = temperature_container;
  var hum_ten = humidity_container;
  var wind_ten = windSpeed_container;
  
  var sheet = SpreadsheetApp.openById("122zOuZjC5MNjwwsd5U6EIxxCHOczjgsjcy0Pwe3p-dE");
  var dark_sky_data = sheet.getSheetByName("Dark Sky");
  dark_sky_data.appendRow([temp_now,hum_now,wind_now,temp_one,hum_one,wind_one,temp_five,hum_five,wind_five,temp_ten,hum_ten,wind_ten]);
}
