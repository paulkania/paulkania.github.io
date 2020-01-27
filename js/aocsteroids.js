window.onload = function() {};


//adding to the list also resets the list so that you can see it in the changed text
function PushAsteroidString() {
    var homebase = parseInt(document.getElementById("base_asteroid").value);
    var rowtext = parseInt(document.getElementById("row_asteroid").value);
    var coltext = parseInt(document.getElementById("col_asteroid").value);
    var data = document.getElementById("textarea_push").value;
    data = data.replace(/(?:\r\n|\r|\n)/g, '');
//    console.log('hit1');
//    console.log(rowtext,coltext,data);
//    console.log(typeof rowtext,typeof coltext,typeof data);
    return [rowtext,coltext,data,homebase]
}



function Find_nth_Asteroid_xy(){
    rowtext = PushAsteroidString()[0]
    coltext = PushAsteroidString()[1]
    data = PushAsteroidString()[2]
    homebase = PushAsteroidString()[3]
//    console.log(rowtext)
//    console.log(coltext)
//    console.log('h',homebase)
//    console.log(data,data.length)
    var count = 0
    for (let i = 0; i < data.length; i++) { //finding xhome,yhome
        if (data[i] == '#'){
            count++;
        if (count == homebase){
            var xhome = i % coltext
            var yhome  = Math.floor(i/coltext);
            break;
            }
        }
    }

    var allasteroids = []
    for (let index = 0; index < data.length; index++) {
        if (data[index] == '#') {
            var xcurrent = index % coltext;
            var ycurrent = Math.floor(index/coltext);
            var manhattan_dist = Math.abs(xcurrent-xhome)+Math.abs(ycurrent-yhome)
            if (manhattan_dist != 0) {
                angle = Math.atan2((yhome-ycurrent),(xhome-xcurrent))//*(180/Math.PI)
                if (angle <0) {angle = ((2*Math.PI)+angle)     }
                allasteroids.push([angle,manhattan_dist,[xcurrent,ycurrent]])
                }
            }
}
allasteroids=allasteroids.sort(function(a,b) {
                if (a[0] == b[0])
                return a[1] < b[1] ? -1 : 1;
                return a[0] < b[0] ? -1 : 1;});
//console.log(allasteroids)
var asteroid_dict = {};
var current_angle = -0.1;
for (let index = 0; index < allasteroids.length; index++) {
    asteroid_dict[allasteroids[index]]=false;
//    console.log('exp',asteroid_dict[allasteroids[index]]); //should be false
//    console.log('111',allasteroids[index]);
//    console.log('22222',typeof(allasteroids[index][0]),allasteroids[index][0],typeof(current_angle),current_angle); // allasteroids[index][0] ==angle
    }
var planet_smasher_counter = 0;
var anslist = [];
//asteroid dict data is flat. ex: 0.4636476090008061,3,0,0: false. [angle,manhatD,xpos,ypos]:bool
while (allasteroids.length>planet_smasher_counter) {
    planet_smasher_counter+=1;
    for (let index = 0; index < allasteroids.length; index++) {
        var reset_circle = false;
        if (allasteroids[index][0] > current_angle && asteroid_dict[allasteroids[index]]==false){
            reset_circle = true;
            asteroid_dict[allasteroids[index]] = true;
//            console.log('post',asteroid_dict[allasteroids[index]]); //should be true
            anslist.push(allasteroids[index][2]);
            current_angle = allasteroids[index][0];
            planet_smasher_counter +=1;
            }
        }
    if (reset_circle == false) {
        current_angle =-0.1;
        }
    }
return anslist
}   //end function


/*
function PushNewItemNoReset() {
    var text = document.getElementById("to_push").value;

function equality_check() {
    for (let i = 0; i < morsels_strings.length; i++) {
        if (morsels_strings[i] == text) {
           console.log('for true')
           return true}
        }
   console.log('end for false')
    return false
    }

    if (equality_check() == true) { console.log('equality TRUE'); return 0}
    else {
    morsels_strings.push(text);
    console.log('equality false, should be pushing',morsels_strings);
//    ResetMorsels()
    }
}


function ClearList() {
    morsels_malleable = [];
//    while (morsels_strings.length) {
    morsels_strings = [];
//    }
    console.log('end of clear fn', morsels_malleable)

}
//empty and re-fill index_array, and refresh mouseclicks.
  function ResetMorsels() {
    morsels_malleable = [];

    for (let i = 0; i < morsels_strings.length; i++) {
      morsels_malleable.push(morsels_strings[i])
      }
    if (mouseclicks > 0) {
      mouseclicks = 0
      document.getElementById("ephemeral_line").innerHTML = "ok, i've been refreshed, hit me bb";
      }
    console.log('end of reset fn', morsels_malleable)
  }

// if the morsel array isnt empty
//  	doc read random morsel string
// 	    delete ith index (make sure u delete the right one
  function ChangeMorsel() {
    mouseclicks += 1;
    if (morsels_malleable.length) {
      var randomindex = Math.floor(Math.random() * morsels_malleable.length)
      document.getElementById("ephemeral_line").innerHTML = morsels_malleable[randomindex]
      morsels_malleable.splice(randomindex, 1)     // array.splice(index, 1);
    } else {
      document.getElementById("ephemeral_line").innerHTML = "There aren't any more juicy morsels, but you hit reset to eat more morsels. uve over-hit me"//+(mouseclicks-morsels.length+1)  +"  # time(s)";
    }
  console.log('end of change fn',morsels_malleable)
  }
//why doesnt github ack my current js file?

*/