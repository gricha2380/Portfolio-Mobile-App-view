/*
Reference Material:
https://developers.google.com/apps-script/reference/mail/mail-app
https://developers.google.com/apps-script/articles/sending_emails
*/

/*
stop duplicate email delivery using LockService:
https://productforums.google.com/forum/#!topic/docs/h5nXE7IPPl4
*/

function sendText() {
  var url = "https://docs.google.com/spreadsheets/d/1KrKXcbFDnMjLGoM4WdKz24M4kAz2wERqYHVKFPdHm_U/edit?usp=sharing";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
  var startRow = 1;  // First row of data to process
  var numRows = 2;   // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 3); // 1st two numbers: starting cell. Last two are number of rows & columns
  // docs: https://developers.google.com/apps-script/reference/spreadsheet/sheet#getRange(Integer,Integer)
  // Fetch values for each row in the Range.
  Utilities.sleep(4000); // wait a few seconds
  var data = dataRange.getDisplayValues();
  Logger.log(data);

    var emailAddress = "3059895420@messaging.sprintpcs.com";  // Deliver to this email
    var d = formatDate();
    var message =
        "<div style='text-align: center;'>"+d+"<br><br><b>"+data[0][0]+": <br>"+data[1][0]
        +"</b> <br>(<font color='green'>"+data[1][1]
        +" <font color='black'>/ </font>"+data[1][2]
        +"</font>)";
    Logger.log(message);
    var subject = "Portfolio Update";
    var htmlBody = "htmlBody";
    MailApp.sendEmail({to:emailAddress, subject:subject, htmlBody: message}); // ENGAGE!
} // end email function
