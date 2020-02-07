function telltime(){
    var logelem = document.querySelector(".time");
    var update = new Date('06 February 2020');
    var now = new Date();
    var diff = Math.floor(((now-update).toString())/86400000);
    logelem.innerHTML = "this page was updated " + diff+" days ago";
   }
telltime();
