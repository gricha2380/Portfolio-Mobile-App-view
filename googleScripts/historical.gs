function historicalSnapshot() {
 var d = formatDate();
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Stats");
 var historical = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Historical");

  Logger.log("grid is still s...");
  var range = [];
  range[0] = sheet.getRange("A2:C2"); //Portfolio Value, Portfolio Gains, Portfolio Growth
  range[1] = sheet.getRange("A5:D5"); //Crypto Value, Crypto Gains, Crypto Growth, Crypto %
  range[2] = sheet.getRange("A8:D8"); //Stock Value, Stock Gains, Stock Growth, Stock %
  var id = historical.getRange("A:A").getGridId();

//sheet.getRange("A1:D8").copyValuesToRange(id,7,10,1,8);
//  historical.appendRow(["a man", "a plan", "panama"]);
  historical.insertRowBefore(2);
  historical.getRange("A2").setValue(d);
  range[0].copyValuesToRange(id,2,4,2,2); // sheet id, column start, column end, row start, row end
  range[1].copyValuesToRange(id,5,8,2,2);
  range[2].copyValuesToRange(id,9,13,2,2);
  //Logger.log(range.getGridId());

 //var cell = sheet.getRange("F2");
 //cell.setValue(d);
}
