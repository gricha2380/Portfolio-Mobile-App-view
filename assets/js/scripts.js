var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1KrKXcbFDnMjLGoM4WdKz24M4kAz2wERqYHVKFPdHm_U/edit?usp=sharing';

      function init() {
        Tabletop.init( { key: public_spreadsheet_url,
                         callback: showInfo,
                         simpleSheet: true } );
      }

      window.addEventListener('DOMContentLoaded', init)

      function showInfo(data) {
        // data comes through as a simple array since simpleSheet is turned on
        //document.getElementById("data").innerHTML = JSON.stringify(data);

        //holder = data;
        var before = '<td>', after = '</td>', row='', beforeRow = '<tr>', afterRow = '</tr>';
        var table = '<table class="sheetTable ui celled unstackable table">';

        // table header
        var e = 0;
        table += '<thead><tr>';
        for (var h in data[0]) {
          e++;
          if (e < 10 || e == 13) {
            table+= '<th>'+h+"</th>";
          }
        }
        table += "</tr></thead>";

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
        document.getElementById("portfolio").innerHTML = table + row + "</table>" ;
        // final output
        //document.getElementById("data").innerHTML = data[0]+ /*x +" : "+ */ table + row + "</table>";

      }

      document.write("The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a>");


 $('.menu .item').tab();

 document.getElementById("stats")