var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1KrKXcbFDnMjLGoM4WdKz24M4kAz2wERqYHVKFPdHm_U/edit?usp=sharing';

      function init() {
        Tabletop.init( { key: public_spreadsheet_url,
                         callback: showInfo,
                         simpleSheet: false,
                         wanted: ["Portfolio"] } );
      }

      window.addEventListener('DOMContentLoaded', init)

      function showInfo(data, tabletop) {
        // data comes through as a simple array since simpleSheet is turned on
        //document.getElementById("data").innerHTML = JSON.stringify(data);

        //holder = data;
        //console.log(tabletop.sheets("Portfolio")["columnNames"]);
        var holder = tabletop.sheets("Portfolio");
        var before = '<td>', after = '</td>', row='', beforeRow = '<tr>', afterRow = '</tr>';
        var beforeNeg = '<td class="neg">', beforePos = '<td class="pos">', beforeBlu = '<td class="symbol">', beforeBold = "<td class='bold'>";
        var table = '<table class="sheetTable ui celled unstackable table" data-sortlist="[[5,1]]">';
        var tableComplex = '<table class="sheetTable ui celled unstackable table GG">';
        var maxRows = 10;
        var columns = [0,2,3,4,5,6,7,8,10,12];
        /*
        0 = Symbol
        1 = Tye
        2 = Price
        3 = Price Paid
        4 = Quantity
        5 = Cost Basis
        6 =
        7 =
        8 =
        9 =
        10 =
        11 =
        12 =

        */

        // table header simpleSheet false
        tableComplex += '<thead><tr>';

        /* Loop to get all column headers
        for (var i = 0;i < maxRows;i++) { // or use holder["columnNames"].length
          tableComplex += "<th>"+holder["columnNames"][i]+"</th>";
        }
        */

        console.log(holder["columnNames"]);
        // manual list of desirable columns
        tableComplex += "<th>"+holder["columnNames"][0]+"</th>"; // Symbol
        tableComplex += "<th>"+holder["columnNames"][2]+"</th>"; // Price"
        tableComplex += "<th>"+holder["columnNames"][3]+"</th>"; // Price Paid
        tableComplex += "<th>"+holder["columnNames"][4]+"</th>"; // Quantity
        tableComplex += "<th>"+holder["columnNames"][5]+"</th>"; // Cost Basis
        tableComplex += "<th>"+holder["columnNames"][6]+"</th>"; // Market Value
        tableComplex += "<th>"+holder["columnNames"][7]+"</th>"; // Total Growth
        tableComplex += "<th>"+holder["columnNames"][8]+"</th>"; // Total Gain
        tableComplex += "<th>"+holder["columnNames"][10]+"</th>"; //Today %
        tableComplex += "<th>"+holder["columnNames"][12]+"</th>"; //Gain 24h

        tableComplex += "</tr></thead>";

        // table header
        /*
        var e = 0;
        table += '<thead><tr>';
        for (var h in data[0]) {
          e++;
          if (e < 10 || e == 13) {
            table+= '<th>'+h+"</th>";
          }
        }
        table += "</tr></thead>";
        */

        //duplicate header
        /*row += beforeRow;
        var t = 0;
        for (var i in data[0]) {
          t++;
          if (t < 10 || data[0][i] == "Gain 24h") {
            row+=before+i+after;
            console.log(data[0][i]);
          };
        }
        row += afterRow;
        */

        //console.log(holder["elements"][2]);
        // row complex
        tableComplex += beforeRow;


        for (var i = 0; i < holder["elements"].length; i++) {


          /* loop to grab all rows
          var rowCounter = 1; // loop for each cell of data

          for (var e in holder["elements"][i]) {
            if (rowCounter < maxRows) {
              //console.log(holder["elements"][i][e]);
              tableComplex += before + holder["elements"][i][e] + after;
              rowCounter++;
            }
          } */
          //console.log(holder["elements"][i]["Symbol"],"this is symbol");
          tableComplex += beforeBlu + holder["elements"][i]["Symbol"] + after;
          tableComplex += beforeBold + holder["elements"][i]["Price"]+ after;
          tableComplex += before + holder["elements"][i]["Price Paid"]+ after;
          tableComplex += before + holder["elements"][i]["Quantity"]+ after;
          tableComplex += before + holder["elements"][i]["Cost Basis"]+ after;
          tableComplex += before + holder["elements"][i]["Market Value"]+ after;
          // console.log("total growth below");
          // console.log(holder["elements"][i]["Total Growth"]);

          var colname = "Total Growth"
          if (parseFloat(holder["elements"][i][colname])>= 0) {
            tableComplex += beforePos + holder["elements"][i][colname] + after;
          } else if (Number(holder["elements"][i][colname].replace(/[^0-9-\.]+/g,"")) == 0 || holder["elements"][i][colname] == "-") {
            tableComplex += before + holder["elements"][i][colname] + after;
          } else {
            tableComplex += beforeNeg + holder["elements"][i][colname] + after;
          }

          colname = "Total Gain";
          if (parseFloat(Number(holder["elements"][i][colname].replace(/[^0-9-\.]+/g,"")))>= 0 || holder["elements"][i][colname] == "-") {
            tableComplex += beforePos + holder["elements"][i][colname] + after;
          } else if (Number(holder["elements"][i][colname].replace(/[^0-9-\.]+/g,"")) == 0 || holder["elements"][i][colname] == "-") {
            tableComplex += before + holder["elements"][i][colname] + after;
          } else {
            tableComplex += beforeNeg + holder["elements"][i][colname] + after;
          }

          colname = "Today %";
          if (parseFloat(holder["elements"][i][colname])>= 0) {
            tableComplex += beforePos + holder["elements"][i][colname] + after;
          } else if (Number(holder["elements"][i][colname].replace(/[^0-9-\.]+/g,"")) == 0 || holder["elements"][i][colname] == "-") {
            tableComplex += before + holder["elements"][i][colname] + after;
          } else {
            tableComplex += beforeNeg + holder["elements"][i][colname] + after;
          }

          //tableComplex += before + holder["elements"][i]["Today %"]+ after;
          //tableComplex += before + holder["elements"][i]["Gain 24h"]+ after; // manually add last row
          colname = "Gain 24h";
          if (parseFloat(Number(holder["elements"][i][colname].replace(/[^0-9-\.]+/g,"")))>= 0 || holder["elements"][i][colname] == "-") {
            tableComplex += beforePos + holder["elements"][i][colname] + after;
          } else if (Number(holder["elements"][i][colname].replace(/[^0-9-\.]+/g,"")) == 0 || holder["elements"][i][colname] == "-") {
            tableComplex += before + holder["elements"][i][colname] + after;
          } else {
            tableComplex += beforeNeg + holder["elements"][i][colname] + after;
          }
          tableComplex += afterRow;

        }

        /* row simple
        for (var i = 0; i < data.length; i++) { // each row of spreadsheet data
          row += beforeRow;
          var rowCounter = 1; // loop for each cell of data
          for (var e in data[i]) {
            if (rowCounter < 10 ) { // grab first 10 cells
              row += before + data[i][e] + after;
              rowCounter++;
            };
          }
          row += before + data[i]["Gain 24h"] + after; // manually add last row
          row += afterRow;

        };
        */

        //document.getElementById("portfolio").innerHTML = table + row + "</table>" ;
        // final output
        //document.getElementById("data").innerHTML = data[0]+ /*x +" : "+ */ table + row + "</table>";
        document.getElementById("portfolio").innerHTML = tableComplex + "</table>" ;
        sort();
      }

      document.write("The published spreadsheet is located at <a class='bottomLink'target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a>");


 $('.menu .item').tab();

document.getElementById("statsTab").addEventListener("click", function(){
  console.log("gello");
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showStatsInfo,
                     simpleSheet: true } );

    function showStatsInfo(data, tabletop) {
      var holder = tabletop.sheets("Stats");
        var before = '<td>', after = '</td>', row='', beforeRow = '<tr>', afterRow = '</tr>';
        var table = '<table class="sheetTable ui celled unstackable table">';
        var tableComplex = '<table class="sheetTable ui celled unstackable table GG">';
        var maxRows = 10;
        console.log(holder);

        // table header simpleSheet false
        tableComplex += '<thead><tr>';
        for (var i = 0;i < holder["columnNames"].length;i++) { // or use holder["columnNames"].length
          tableComplex += "<th>"+holder["columnNames"][i]+"</th>";
        }
        tableComplex += "</tr></thead>";

        // row complex
        tableComplex += beforeRow;
        for (var i = 0; i < holder["elements"].length; i++) {
          var rowCounter = 1; // loop for each cell of data
          for (var e in holder["elements"][i]) {
            //if (rowCounter < maxRows) {
              tableComplex += before + holder["elements"][i][e] + after;
              rowCounter++;
            // }
          }
          tableComplex += before + holder["elements"][i]["Gain 24h"]; // manually add last row
          tableComplex += afterRow;
        }
        document.getElementById("stats").innerHTML = tableComplex + "</table>" ;
    }
    sort();
});

document.getElementById("refresh").addEventListener("click", function(){
  //.fetch()
  location.reload();
});


function sort(){
  console.log("table sort plug activated");
  $('.sheetTable').tablesorter({
      usNumberFormat : true
    });
}