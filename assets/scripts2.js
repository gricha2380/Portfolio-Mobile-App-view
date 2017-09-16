// I don't need to use table top. Strength in understanding.
var url = 'https://docs.google.com/spreadsheets/d/1KrKXcbFDnMjLGoM4WdKz24M4kAz2wERqYHVKFPdHm_U/edit?usp=sharing';

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var data = this.responseText;//JSON.parse(this.responseText);
          showTableOne(data);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function showTableOne(data) {
    data = JSON.parse(this.responseText);
    console.log("full JSON...")
    console.log(data);
    var list = data["feed"]["entry"];
    console.log("list contents")
    console.log(list);
  }



  var xmlStats = new XMLHttpRequest();

  xmlStats.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var data = this.responseText;//JSON.parse(this.responseText);
          showTableTwo(data);
      }
  };
  xmlStats.open("GET", url, true);
  xmlStats.send();

  function showTableTwo(data) {

  }




}); // end document ready