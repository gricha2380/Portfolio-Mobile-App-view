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
        var table = '<table class="sheetTable ui celled unstackable table">';
        var tableComplex = '<table class="sheetTable ui celled unstackable table GG">';
        var maxRows = 10

        // table header simpleSheet false
        tableComplex += '<thead><tr>';
        for (var i = 0;i < maxRows;i++) { // or use holder["columnNames"].length
          tableComplex += "<th>"+holder["columnNames"][i]+"</th>";
        }
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

        console.log(holder["elements"][2]);
        // row complex
        tableComplex += beforeRow;
        for (var i = 0; i < holder["elements"].length; i++) {
          var rowCounter = 1; // loop for each cell of data
          /*
          for (var r = 0; r < holder["elements"][i].length; r++) {
            tableComplex += before + holder["elements"][i][r] + after;
            console.log(holder["elements"][i][r]);
          }
          */
          for (var e in holder["elements"][i]) {
            if (rowCounter < maxRows) {
              tableComplex += before + holder["elements"][i][e] + after;
              rowCounter++;
            }
          }
          tableComplex += before + holder["elements"][i]["Gain 24h"]; // manually add last row
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

      }

      document.write("The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a>");


 $('.menu .item').tab();

document.getElementById("stats").addEventListener("click", function(){

        Tabletop.init( { key: public_spreadsheet_url,
                         callback: showInfo,
                         simpleSheet: true } );
        function showStatsInfo(data) {

        }
});