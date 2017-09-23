// I don't need to use table top. Strength in understanding.
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1KrKXcbFDnMjLGoM4WdKz24M4kAz2wERqYHVKFPdHm_U/edit?usp=sharing';

var urlStocks = 'https://spreadsheets.google.com/feeds/list/1KrKXcbFDnMjLGoM4WdKz24M4kAz2wERqYHVKFPdHm_U/1/public/values?alt=json';
var urlStats = 'https://spreadsheets.google.com/feeds/list/1KrKXcbFDnMjLGoM4WdKz24M4kAz2wERqYHVKFPdHm_U/2/public/values?alt=json';
var before = '<td>',
    after = '</td>',
    row = '',
    beforeRow = '<tr>',
    afterRow = '</tr>';
var beforeNeg = '<td class="neg">',
    beforePos = '<td class="pos">',
    beforeBlu = '<td class="symbol">',
    beforeBold = "<td class='bold'>";
var table = '<table class="sheetTable ui celled unstackable table GG" data-sortlist="[[5,1]]">';
var statRow = '<div class="row">',
    endDiv = '</div>',
    statLabel = '<div class="label">',
    statValue = '<div class="value">',
    statValueMain = '<div class="valueMain">',
    statContainer = '<div class="container">';

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    $('.menu .item').tab(); //jQuery

    // start first AJAX immediately
    function fetchPortfolio() {
        var  xmlhttp =  new  XMLHttpRequest();
        console.log("starting request, sir.");
        xmlhttp.onreadystatechange  =   function()  {    
            if  (this.readyState  ==  4  &&  this.status  ==  200) {        
                var  data = JSON.parse(this.responseText);
                showStats(data);
                console.log("sent to function, sir.")
            }
        }

        xmlhttp.open("GET", urlStats,  true);
        xmlhttp.send();
    }

    fetchPortfolio();
    fetchPortfolio();
    console.log("run 3 times to kickstart");


    function showStats(data) {
        console.log("full JSON... ",data);
        var list = data["feed"]["entry"]["0"];
        console.log("list contents", list);

        //console.log(statRow + statLabel + "Portfolio" + endDiv + statValueMain + list["gsx$portfoliovalue"]["$t"] + endDiv);
        document.getElementById("stats").innerHTML =
            statRow + statLabel + "Portfolio" + endDiv + statValueMain + list["gsx$portfoliovalue"]["$t"] + endDiv + endDiv +
            statRow + statContainer + statLabel + "Portfolio Gains" + endDiv + statValue + list["gsx$portfoliogains"]["$t"] + endDiv + endDiv +
            statContainer + statLabel + "Portfolio Growth" + endDiv + statValue + list["gsx$portfoliogrowth"]["$t"] + endDiv + endDiv
            //+statRow+statContainer+statLabel+"Crypto Gains"+endDiv+statValue+list["gsx$cryptogains"]["$t"]+endDiv+endDiv
            //+statRow+statContainer+statLabel+"Crypto Growth"+endDiv+statValue+list["gsx$cryptogrowth"]["$t"]+endDiv+endDiv
            // why can I only see the first row of the JSON?
            +
            "<div class='viewSpreadsheet'><a class='bottomLink'target='_new' href='" + public_spreadsheet_url + "'>" + "View Spreadsheet" + "</a></div>";

    }


    document.querySelector("#portfolioTab").addEventListener("click", function() {
        console.log("Someone wants the portfolio tab, sir");
        fetchStocks();
    });


    function showStocks(data) {
        data = JSON.parse(data);
        console.log("json coming");
        console.log(data);
        table = '<table class="sheetTable ui celled unstackable table GG" data-sortlist="[[5,1]]"><thead><tr>';
        table += "<th>" + "Symbol" + "</th>"; // Symbol
        table += "<th>" + "Price" + "</th>"; // Price"
        table += "<th>" + "Price Paid" + "</th>"; // Price Paid
        table += "<th>" + "Quantity" + "</th>"; // Quantity
        table += "<th>" + "Cost Basis" + "</th>"; // Cost Basis
        table += "<th>" + "Market Value" + "</th>"; // Market Value
        table += "<th>" + "Total Growth" + "</th>"; // Total Growth
        table += "<th>" + "Total Gain" + "</th>"; // Total Gain
        table += "<th>" + "Today %" + "</th>"; //Today %
        table += "<th>" + "Gain 24h" + "</th>"; //Gain 24h
        table += "</tr></thead>";

        console.log(table);

        console.log(data["feed"]["entry"].length);
        for (var i = 0; i < data["feed"]["entry"].length; i++) {
            table += beforeRow;
            table += beforeBlu + data["feed"]["entry"][i]["gsx$symbol"]["$t"] + after;
            table += beforeBold + data["feed"]["entry"][i]["gsx$price"]["$t"] + after;
            table += before + data["feed"]["entry"][i]["gsx$pricepaid"]["$t"] + after;
            table += before + data["feed"]["entry"][i]["gsx$quantity"]["$t"] + after;
            table += before + data["feed"]["entry"][i]["gsx$costbasis"]["$t"] + after;
            table += before + data["feed"]["entry"][i]["gsx$marketvalue"]["$t"] + after;

            var colname = "gsx$totalgrowth"; // total growth %
            if (parseFloat(data["feed"]["entry"][i][colname]["$t"]) > 0) {
                table += beforePos + data["feed"]["entry"][i][colname]["$t"] + after;
            } else if (parseFloat(data["feed"]["entry"][i][colname]["$t"]) == 0 || parseFloat(data["feed"]["entry"][i][colname]["$t"]) == "-") {
                table += before + data["feed"]["entry"][i][colname]["$t"] + after;
            } else {
                table += beforeNeg + data["feed"]["entry"][i][colname]["$t"] + after;
            }

            colname = "gsx$totalgain"; // total gain $
            if (parseFloat(Number(data["feed"]["entry"][i][colname]["$t"].replace(/[^0-9-\.]+/g, ""))) > 0) {
                table += beforePos + data["feed"]["entry"][i][colname]["$t"] + after;
            } else if (parseFloat(Number(data["feed"]["entry"][i][colname]["$t"].replace(/[^0-9-\.]+/g, ""))) == 0 || parseFloat(data["feed"]["entry"][i][colname]["$t"]) == "-") {
                table += before + data["feed"]["entry"][i][colname]["$t"] + after;
            } else {
                table += beforeNeg + data["feed"]["entry"][i][colname]["$t"] + after;
            }

            colname = "gsx$today"; // today %
            if (parseFloat(data["feed"]["entry"][i][colname]["$t"]) > 0) {
                table += beforePos + data["feed"]["entry"][i][colname]["$t"] + after;
            } else if (parseFloat(data["feed"]["entry"][i][colname]["$t"]) == 0 || parseFloat(data["feed"]["entry"][i][colname]["$t"]) == "-") {
                table += before + data["feed"]["entry"][i][colname]["$t"] + after;
            } else {
                table += beforeNeg + data["feed"]["entry"][i][colname]["$t"] + after;
            }

            colname = "gsx$gain24h"; //today $
            if (parseFloat(Number(data["feed"]["entry"][i][colname]["$t"].replace(/[^0-9-\.]+/g, ""))) > 0) {
                table += beforePos + data["feed"]["entry"][i][colname]["$t"] + after;
            } else if (parseFloat(Number(data["feed"]["entry"][i][colname]["$t"].replace(/[^0-9-\.]+/g, ""))) == 0 || parseFloat(data["feed"]["entry"][i][colname]["$t"]) == "-") {
                table += before + data["feed"]["entry"][i][colname]["$t"] + after;
            } else {
                table += beforeNeg + data["feed"]["entry"][i][colname]["$t"] + after;
            }
            table += afterRow;
        };
        document.getElementById("portfolio").innerHTML = table;
        sort();
    }

    function fetchStocks(data) {
        var  xmlStats =  new  XMLHttpRequest();
        xmlStats.onreadystatechange  =   function()  {  
            if  (this.readyState  ==  4  &&  this.status  ==  200) {
                var newData = this.responseText; //JSON.parse(this.responseText);
                       
                showStocks(newData);   
            }
        };
        xmlStats.open("GET", urlStocks,  true);
        xmlStats.send();
    }


    document.getElementById("refresh").addEventListener("click", function() {
        //.fetch()
        //location.reload();
        if (document.querySelector("#statsTab.active")) {
            console.log("refreshing portfolio");
            fetchPortfolio();
            fetchPortfolio();
        } else {
            console.log("refreshing stocks")
            fetchStocks();
            fetchStocks();
        }

    });


    function sort() {
        console.log("table sort plug activated");
        $('.sheetTable').tablesorter({
            usNumberFormat: true
        });
    }


}); // end document ready