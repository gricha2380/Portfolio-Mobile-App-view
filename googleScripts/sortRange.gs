function sortRange() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var responses = ss.getSheetByName("Portfolio");
  var lastRow = responses.getLastRow();
  var lastColumn = responses.getLastColumn();

  var dataRange = responses.getRange(2, 1, lastRow, lastColumn); // row, column, numRows, numColumns

 // Sorts by the values in Market Value column (G)
  dataRange.sort({column: 7, ascending: false});
}
//sheet.getRange("C3:C9").setValues(sheet.getRange("C3:C9").ge‌tValues().sort());

/*

function sortRange() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var responses = ss.getSheetByName("Portfolio");
  var lastRow = responses.getLastRow();
  var lastColumn = responses.getLastColumn();

  var dataRange = responses.getRange(2, 1, lastRow, lastColumn); // row, column, numRows, numColumns

 // Sorts by the values in Market Value column (G)
  dataRange.sort({column: 7, ascending: false});
}

*/