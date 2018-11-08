/**
    Cryptocurrency Financial Tracker Utils - Gregor
    v0.1 - 9/1/2017 - Started project
    v0.2 - agressively fighting response caching

    A small set of utilites for working with cryptocurrencies in Google Sheets.
    To use, add =coinPrice("NAME") in a row. For example, Bitcoin would be:

        =coinPrice("Bitcoin")
**/

function onEdit(e) //https://stackoverflow.com/questions/17341399/refresh-data-retrieved-by-a-custom-function-in-google-spreadsheet/17347290#17347290
{
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("config").getRange('D1').setValue(new Date().toTimeString()); //.setValue(Math.random());
}

function onOpen() {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("config").getRange('D1').setValue(new Date().toTimeString());
}

var exchangeUrl = "https://api.coinmarketcap.com/v1/ticker/";

function coinPrice(symbol) {
//symbol = "funfair"; // for testing
  //sortRange();

  if (!symbol) return null;

  exchangeUrl += symbol+"?";//+new Date().toTimeString();
  var coin = coinLookup(exchangeUrl); //, seed
  if (!coin) {
    return null;
  }
  return parseFloat(coin[0].price_usd);
}

function coinLookup(ee) {
  var headers =
      {
        "method" : "get",
        "contentType" : "application/json",
        headers : {'Cache-Control' : 'max-age=0'}
      };
  var options =
  {
    // Ensure we get a fresh copy of the site every time.
    headers : {'Cache-Control' : 'max-age=0'}
//    headers: {'Cache-Control' : ['no-cache', 'no-store', 'must-revalidate']}
  };
  var response = UrlFetchApp.fetch(ee, headers);
  var content = response.getContentText();
  Logger.log("here is response");
  Logger.log(response);

  Logger.log("here is content");
  Logger.log(content);

  var data = JSON.parse(content);
  return data; // return full json
  SpreadsheetApp.flush();
}

function changepct(symbol) {
  if (!symbol) return null;

  exchangeUrl += symbol;

  var coin = coinLookup(exchangeUrl);
  if (!coin) {
    return null;
  }

  return parseFloat(coin[0].percent_change_24h*.01);

}