window.onload = function() {};


//adding to the list also resets the list so that you can see it in the changed text
function GetUserData() {
    const homebase = parseInt(document.getElementById("base_asteroid").value);
    const rowtext = parseInt(document.getElementById("row_asteroid").value);
    const coltext = parseInt(document.getElementById("col_asteroid").value);
    var data = document.getElementById("textarea_push").value;
    data = data.replace(/(?:\r\n|\r|\n)/g, ''); //removes newlines
    data=data.replace(/\s/g,'') //removes whitespace. works.
    var count = 0
    for (let i = 0; i < data.length; i++) { //finding xhome,yhome
        if (data[i] == '+'){
            count++;
        if (count == homebase){
            var indexhome = i;
//            var xhome = i % coltext
//            var yhome  = Math.floor(i/coltext);
            break;
            }
        }
    }
    return [rowtext,coltext,data,indexhome]
}



function Find_nth_Asteroid_xy(){
    user_data = GetUserData()
    rowtext = user_data[0];
    coltext = user_data[1];
    data = user_data[2];
    indexhome = user_data[3];
    var xhome = indexhome%coltext;
    var yhome = Math.floor(indexhome/coltext);
//    console.log(rowtext)
//    console.log(coltext)
//    console.log('h',homebase)
//    console.log(data,data.length)


    var allasteroids = []
    for (let index = 0; index < data.length; index++) {
        if (data[index] == '+') {
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
    asteroid_dict[allasteroids[index]] = false;
//    console.log('exp',asteroid_dict[allasteroids[index]]); //should be false
//    console.log('111',allasteroids[index]);
//    console.log('22222',typeof(allasteroids[index][0]),allasteroids[index][0],typeof(current_angle),current_angle); // allasteroids[index][0] ==angle
    }
var planet_smasher_counter = 0;
var anslist = [];
//asteroid dict data is flat. ex: 0.4636476090008061,3,0,0: false. [angle,manhatD,xpos,ypos]:bool
//console.log('pre1',asteroid_dict)
while (planet_smasher_counter<allasteroids.length) {
    for (let index = 0; index < allasteroids.length; index++) {
        var asteroid_hit = false;
//        console.log('pre2',asteroid_dict[allasteroids[index]])
//    console.log('pre3',allasteroids[index])
        if (allasteroids[index][0] > current_angle && asteroid_dict[allasteroids[index]]==false){
            asteroid_hit = true;
            asteroid_dict[allasteroids[index]] = true;
//            console.log('post',asteroid_dict[allasteroids[index]]); //should be true
            anslist.push(allasteroids[index][2]);
            current_angle = allasteroids[index][0];
            planet_smasher_counter +=1;
            }
        }
    if (asteroid_hit == false) {current_angle =-0.1;}
    }
//console.log('allasteroids',allasteroids)
//console.log('post22',[allasteroids[index]])
//console.log('allastlength & planetsmashercounter',allasteroids.length,planet_smasher_counter)
//console.log(anslist)
return anslist
}//end function

function draw() {
//  GetUserData();
  user_data = GetUserData();
  rowtext = user_data[0];
  coltext = user_data[1];
  data = user_data[2]; //data
  indexhome = user_data[3];
//  console.log(rowtext,coltext,data,indexhome);
      var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 400, 400);
//        var matrixlength = coltext*rowtext;
//        var home_base_1d = home_base_1d[0];
        var index;
        for (let row = 0; row < rowtext; row++) {
             for (let col = 0; col < coltext; col++) {
                index = (coltext*row) +col;
                if (data[index] != '+' && data[index] != '~'){
                    ctx.clearRect(0, 0, 400, 400);
                    ctx.font = "40px Arial";
                    ctx.fillText("~+ only", 10, 150);
                    return}
                if (index == indexhome){
                    ctx.fillStyle = 'purple'; //asteroid-blue
                    ctx.fillRect(col*20, row*20, 20, 20);
                    continue;
                    }
                if (data[index] == '+') {
                    ctx.fillStyle = 'orange'; //asteroid-blue
                    ctx.fillRect(col*20, row*20, 20, 20);
                    }
                else if (data[index] == '~') {
                    ctx.fillStyle = 'black'; //spacey-white
                    ctx.fillRect(col*20, row*20, 20, 20);
                    }
                }
               }


         }
}
function explode() {
    function timer(ms) {
        return new Promise(res => setTimeout(res, ms));
        }
    draw();
//    console.log(rowtext); //should work since i called draw.
    const shoot_array = Find_nth_Asteroid_xy();
//    console.log('pre',mutuable_shoot_array);
//    console.log('pre',mutuable_shoot_array);
    var mutuable_shoot_array = shoot_array;
    var next;
//Jonas Wilms @ https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
async function load () {
    while (mutuable_shoot_array.length) {
        next = mutuable_shoot_array.shift()
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = 'grey'; //asteroid-blue
            ctx.fillRect(next[0]*20, next[1]*20, 20, 20);
//            console.log('next',next,next[0],next[1])
//            console.log('post',mutuable_shoot_array);
            await timer(150);
            }
        }
    }
load();
}
//}