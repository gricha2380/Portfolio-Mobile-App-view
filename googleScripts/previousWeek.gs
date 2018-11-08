function previousWeek() {
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Stats");
//  var sheetBasic = SpreadsheetApp.getActiveSpreadsheet().getSheets()[2];

  Logger.log("grid is still s...");
  var range = sheet.getRange("A1:D8");
  var id = sheet.getRange("A:A").getGridId();

range.copyValuesToRange(id,7,10,1,8); // sheet id, column start, column end, row start, row end


  Logger.log(range.getGridId());

 var cell = sheet.getRange("F2");
 var d = formatDate();
 cell.setValue(d);

  sheet.getRange("F2");
}
