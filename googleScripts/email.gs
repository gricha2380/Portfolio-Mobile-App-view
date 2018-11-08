/*====================================================================================================================================*
  emailPortfolioSheet by Gregor Richardson
  ====================================================================================================================================
  Version:      1.0
  Project Page: https://github.com/griha2380/
  Copyright:    (c) 2017 by Gregor Richardson
  License:      GNU General Public License, version 3 (GPL-3.0)
                http://www.opensource.org/licenses/gpl-3.0.html
  ------------------------------------------------------------------------------------------------------------------------------------
  A library for sending finance emails from Google spreadsheets. Functions include:
     sendEmails            For use by end users to import a JSON feed from a URL
     dataTable             For use by end users to import JSON from one of the Sheets
     composeHtmlMsg        For use by end users to import a JSON feed from a URL using POST parameters

  For bug reports or enhancements see https://github.com/gricha2380/emailPortfolioSheet/issues
  ------------------------------------------------------------------------------------------------------------------------------------
  Changelog:

  1.0.0  (Aug 31, 2017) Initial release
 *====================================================================================================================================*/


/*
Reference Material:
https://developers.google.com/apps-script/reference/mail/mail-app
https://developers.google.com/apps-script/articles/sending_emails
*/

/*
stop duplicate email delivery using LockService:
https://productforums.google.com/forum/#!topic/docs/h5nXE7IPPl4
*/

function sendEmails() {
  sortRange();
  var url = "https://docs.google.com/spreadsheets/d/1KrKXcbFDnMjLGoM4WdKz24M4kAz2wERqYHVKFPdHm_U/edit?usp=sharing";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Stats");
  var startRow = 1;  // First row of data to process
  var numRows = 2;   // Number of rows to process
  // Fetch the range of cells
  var dataRange = sheet.getRange(startRow, 1, numRows, 3); // 1st two numbers: starting cell. Last two are number of rows & columns
  // docs: https://developers.google.com/apps-script/reference/spreadsheet/sheet#getRange(Integer,Integer)
  // Fetch values for each row in the Range.
  Utilities.sleep(3000); // wait a few seconds
  var data = dataRange.getDisplayValues();
  Logger.log(data);

    var emailAddress = "gregor.richardson@gmail.com";  // Deliver to this email
    var d = formatDate();
    var message =
        "<h2 style='text-align:center;margin-bottom:0'>Portfolio Update</h2>"
        +"<div style='text-align: center;'>"+d+"<br><br><b>"+data[0][0]+": "+data[1][0] + "</b><br>(<font color="; //Portfolio Size : $#####
        //+"</b> <br>(<font color='green'>"+data[1][1] // ($#####
        if (Number(data[1][1].replace(/[^0-9-\.]+/g,"")) >=0) {message+="'green'>"+data[1][1] }
  else if (Number(data[1][1].replace(/[^0-9-\.]+/g,"")) <0) { message+="'red'>"+data[1][1]}

        message +=" <font color='black'>/ </font>"+data[1][2] // / #)
        +"</font>)"
        +"<br><br><a href='"+url+"'>View Portfolio</a></div>";
    Logger.log(message);
    var subject = "Portfolio Update";
    var htmlBody = "htmlBody";
    MailApp.sendEmail({to:emailAddress, subject:subject, htmlBody: message+dataTable()}); // ENGAGE!
} // end email function

function formatDate() {
  var d = new Date()
  var weekday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
  var months = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
  return weekday[d.getDay()] +" "+ months[d.getMonth()] +" "+ d.getDate() +", "+ d.getFullYear();
}


/*
Data table
Reference Material:
https://stackoverflow.com/questions/17658409/how-to-format-email-from-spreadsheet-data-using-arrays
*/

function dataTable(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var responses = ss.getSheetByName("Portfolio");
  var lastRow = responses.getLastRow();
  var lastColumn = responses.getLastColumn();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var dataRange = sheet.getRange(1, 1, lastRow, lastColumn);
  var data = dataRange.getDisplayValues();
  Logger.log("Here is data header row from data[0]");
  Logger.log(data[0]);
  Logger.log("Two example rows, data[1] and data[2]");
  Logger.log(data[1]);
  Logger.log(data[2]);
  Logger.log("data is this long: "+data.length);
  var values = responses.getRange("A"+(lastRow)+":K"+(lastRow)).getValues();
  var headers = responses.getRange("A1:K1").getValues();
  var messageHTML = composeHtmlMsg(data);
  //Logger.log(messageHTML);
  return messageHTML;
  //MailApp.sendEmail(Session.getEffectiveUser().getEmail(),'test html', message,{'htmlBody':messageHTML});
}


function composeHtmlMsg(data){
  var message = '<table style="background-color:white;border-collapse:collapse; margin: 30px auto;" border = 1 cellpadding = 5>';
  var rows = "", thConfig = "style='background-color:#e3e3e3;font-weight: bold;text-align: left;'";
      rows += "<th "+thConfig+">" + data[0][0]+"</td>";
      rows += "<th "+thConfig+">" + data[0][2]+"</td>";
      rows += "<th "+thConfig+">" + data[0][3]+"</td>";
      rows += "<th "+thConfig+">" + data[0][4]+"</td>";
      rows += "<th "+thConfig+">" + data[0][5]+"</td>";
      rows += "<th "+thConfig+">" + data[0][6]+"</td>";
      rows += "<th "+thConfig+">" + data[0][7]+"</td>";
      rows += "<th "+thConfig+">" + data[0][8]+"</td>";
      rows += "<th "+thConfig+">" + data[0][12]+"</td>";

  for (var i = 1; i<data.length;i++) { // data is a two dimentional array. first level is row. data.length = # of rows
    rows += "<tr>";
   // for (var d = 0; d < data[i].length ; d++) { // second level is cell data. data[i].length = # cells in each row: ~11
      //rows += "<td>"+ data[i][d]+"</td>"; // grabs all rows. If enabling this, disable all the rest.
    rows += "<td style='font-weight: bold; color:#15c;'>" + data[i][0]+"</td>";
      rows += "<td style='font-weight: bold;'>" + data[i][2]+"</td>";
      rows += "<td>" + data[i][3]+"</td>";
      rows += "<td>" + data[i][4]+"</td>";
      rows += "<td>" + data[i][5]+"</td>";
      rows += "<td>" + data[i][6]+"</td>";

    // conditional formatting for total  growth
    if (parseFloat(data[i][7]) >=0) {
      rows += "<td style='color:green'>" + data[i][7]+"</td>";
    } else if(data[i][7] == "-" || Number(data[i][7].replace(/[^0-9-\.]+/g,"")) == 0) {
      rows += "<td style='color:black'>" + data[i][7]+"</td>";
    } else{
      rows += "<td style='color:red'>" + data[i][7]+"</td>";
    }

    // conditional formatting for total gain
    if (Number(data[i][8].replace(/[^0-9-\.]+/g,"")) >=0) {
      rows += "<td style='color:green'>" + data[i][8]+"</td>";
    } else if(data[i][8] == "-" || Number(data[i][8].replace(/[^0-9-\.]+/g,"")) == 0) {
      rows += "<td style='color:black'>" + data[i][8]+"</td>";
    } else {
      rows += "<td style='color:red'>" + data[i][8]+"</td>";
    }

    // conditional formatting for Gain 24h
    Logger.log("this is data from 12");
    Logger.log(data[i][12]);
    if (Number(data[i][12].replace(/[^0-9-\.]+/g,"")) >=0) {
      rows += "<td style='color:green'>" + data[i][12]+"</td>";
    } else if(data[i][12] == "-" || Number(data[i][12].replace(/[^0-9-\.]+/g,"")) == 0) {
      rows += "<td style='color:black'>" + data[i][12]+"</td>";
    } else{
      rows += "<td style='color:red'>" + data[i][12]+"</td>";
    }

   // }
    rows += "</tr>";
  }
  Logger.log("Here be rows");
  Logger.log(rows);
  var padding = " style='padding-right: 20px'>";
  var brokerages = "<div style='margin-top: 20px;'><table><tr><td"+padding+"<b>Brokerages:</b></td><td"+padding+"<a href='https://coinbase.com/accounts'>Coinbase</a></td><td"+padding+"<a href='https://olui2.fs.ml.com/TFPSummary/PortfolioSimpleView.aspx'>Merrill Edge</a></td><td"+padding+"<a href='https://bittrex.com/Balance'>Bittrex</td><td"+padding+"<a href='https://liqui.io/Balances'>Liqui.io</a></td><td"+padding+"<a href='https://us.etrade.com/home'>Etrade</td></tr></table></div>";
  Logger.log(brokerages);
  return message+rows+'</table>'+brokerages;
}

// future:
