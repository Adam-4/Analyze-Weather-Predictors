function calculate(weather_predictor,unit,length) { //[weather_predictor] can be ["Dark Sky"], ["AccuWeather"], or ["The Weather Channel"]
  var sheet = SpreadsheetApp.openById("122zOuZjC5MNjwwsd5U6EIxxCHOczjgsjcy0Pwe3p-dE");
  var data_set = sheet.getSheetByName(weather_predictor);var accuracy_array = [];var accuracy_sum = 0;
  var actual_X;var prediction_X;var offset;var accuracy;
  var forecast_string_key=unit+"-"+length
  
  //Right here there are a bunch of if statements that set [actual_X] and [prediction_X] (based on [forecast_string_key]).
  if (forecast_string_key=="temperature-1"){actual_X = 1;prediction_X = 4;offset=1;}if (forecast_string_key=="temperature-5"){actual_X = 1;prediction_X = 7;offset=5;}
  if (forecast_string_key=="temperature-10"){actual_X = 1;prediction_X = 10;offset=10;}if (forecast_string_key=="humidity-1"){actual_X = 2;prediction_X = 5;offset=1;}
  if (forecast_string_key=="humidity-5"){actual_X = 2;prediction_X = 8;offset=5;}if (forecast_string_key=="humidity-10"){actual_X = 2;prediction_X = 11;offset=10;}
  if (forecast_string_key=="wind-1"){actual_X = 3;prediction_X = 6;offset=1;}if (forecast_string_key=="wind-5"){actual_X = 3;prediction_X = 9;offset=5;}
  if (forecast_string_key=="wind-10"){actual_X = 3;prediction_X = 12;offset=10;}
  
  for (y=3; y<data_set.getLastRow(); y++) {
    
    //CUT START
    var accuracy_Sheet = sheet.getSheetByName("Accuracy Arrays [Beta]");
    //CUT END
    
    var actual = data_set.getRange(y+offset, actual_X).getValue();//Usage for .getRange: getRange(y,x)
    var prediction = data_set.getRange(y, prediction_X).getValue();//Usage for .getRange: getRange(y,x)
    if (actual===""){break;}
    
    //CUT START
    accuracy_Sheet.appendRow([((Math.abs(actual-prediction)/actual)*100)]); //subtract this whole thing from 100 to get the accuracy.
    //CUT END
    
    accuracy_array.push(100-((Math.abs(actual-prediction)/actual)*100));//Percent Error
    
    //100-((Math.abs(actual-prediction)/((actual+prediction)/2))*100)//Percent Difference DONT USE
  }
  for (i=0; i<accuracy_array.length; i++) {
    accuracy_sum = accuracy_sum+accuracy_array[i];
  }
  accuracy = accuracy_sum/accuracy_array.length;
  log(accuracy); //you can make this more fancy if you really want...
  
}

function log() {
  var args = arguments;
  for (i=0; i<args.length; i++) {
    Logger.log(args[i]);
  }
}

function initiate_calculation() {
  //calculate("The Weather Channel", "wind",10);
  //calculate("The Weather Channel", "wind",1);
  calculate("Dark Sky", "wind",10);
}  
