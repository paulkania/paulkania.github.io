//window.onload = function() {
//    information();
//};
//
//function information(){
//window.alert(`Hello rld!`);
//}

//adding to the list also resets the list so that you can see it in the changed text

function GetUserData() {
    const rowtext = parseInt(document.getElementById("row_asteroid").value);
    const coltext = parseInt(document.getElementById("col_asteroid").value);
    const percent_asteroids = parseInt(document.getElementById("percent_asteroids").value);
    const homebase = parseInt(document.getElementById("base_asteroid").value);
    const laser_speed = parseInt(document.getElementById("laser_speed").value);
    const asteroid_stop = parseInt(document.getElementById("asteroid_stop").value);

    var data = document.getElementById("textarea_push").value;
    data = data.replace(/(?:\r\n|\r|\n)/g, ''); //removes newlines
    data=data.replace(/\s/g,'') //removes whitespace. works.

    //finding homeindex
    var count = 0
    for (let i = 0; i < data.length; i++) { //finding xhome,yhome
        if (data[i] == '+'){
            count++;
            if (count == homebase){
            var indexhome = i;}  //            var xhome = i % coltext//            var yhome  = Math.floor(i/coltext);//              console.log('jjjjjjjjjjjjj',indexhome,homebase,indexhome/homebase) //here its cool cuz indexhome/homebase hovers around 2, but because of the random variance, it !=2, it just hovers.
        }
    }
    const ast_cnt_nobase = count-1
    return [rowtext,coltext,data,indexhome,percent_asteroids,laser_speed,asteroid_stop,ast_cnt_nobase] //array length == 8 (as of ast_cnt_nobase)
}

function mapgenerator() {
    clearcanvas();
    user_data = GetUserData();
    rowtext = user_data[0];
    coltext = user_data[1];
    percent_asteroids = user_data[4]/100;
    asteroid_stop = user_data[6];
    var _matrixlength = rowtext*coltext;
    var output_map_string = '';
    var ast_count =0;
    for (let index = 0; index < _matrixlength; index++) {
        random_01 = Math.random();
        if (random_01 < (percent_asteroids)) {
            output_map_string += '+';
            ast_count +=1
            }
        else if (random_01 > (percent_asteroids)) {
            output_map_string += '~'
            }
        if ((index+1)%coltext ==0) {
            output_map_string +='\n'
            }
        }
    document.getElementById("textarea_push").value = output_map_string;
    document.getElementById("base_asteroid").value = Math.floor(ast_count/2);
//    if (ast_count<asteroid_stop){ document.getElementById("asteroid_stop").value = (ast_count-1);   }
    draw();
}



function Find_nth_Asteroid_xy(){
    user_data = GetUserData()
    rowtext = user_data[0];
    coltext = user_data[1];
    data = user_data[2];
    indexhome = user_data[3];
    var xhome = indexhome%coltext;
    var yhome = Math.floor(indexhome/coltext);

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

function sanity_checks() {
  const sanity_check_message_prepend = 'Your rows*columns number must match the length of your map-string.'
      function error_codes() {
          user_data = GetUserData();
          rowtext = user_data[0];
          coltext = user_data[1];
          data = user_data[2]; //data
          asteroid_stop = user_data[6]; //data
          ast_cnt_nobase = user_data[7]; //data
          console.log('gfd',asteroid_stop,ast_cnt_nobase,user_data);
          if (rowtext*coltext > data.length) {return 1;}
          if (rowtext*coltext < data.length) {return 2;}
          if (asteroid_stop < 1 || asteroid_stop > ast_cnt_nobase) {return 4;}
          for (let index = 0; index < data.length; index++) {
                if (data[index] != '+' && data[index] != '~') {return 3;}   }

      }
  error_codes = error_codes()
  if (error_codes === 1) {
  window.alert(sanity_check_message_prepend+ 'Right now, your string is too SHORT'); return false;    }
  if (error_codes === 2) {
  window.alert(sanity_check_message_prepend+ 'Right now, your string is too LONG'); return false;     }
  if (error_codes === 3) {
    window.alert("Your map may only contain '+'   '~'  '_spaces_'  'newlines'"); return false;}
  if (error_codes === 4) {
    window.alert("Your trying to stop at an asteroid that doesnt exist [x<1 or x>astcount]");
    document.getElementById("asteroid_stop").value = 50;
    return false;}

}



//Show-Hide-Map
var show_hide_map_bool = true;
function editmap() {
    if (show_hide_map_bool == true){
        document.getElementById("textarea_push").style="display:inline";
        show_hide_map_bool = false;
        return
        }
    else if (show_hide_map_bool == false){
        document.getElementById("textarea_push").style="display:none";
        show_hide_map_bool = true;
        return
       }
    }

//Disable-Enablge Buttons
function disable_buttons(){
        document.getElementById("ex").disabled = true;
        document.getElementById("ma").disabled = true;
        document.getElementById("ed").disabled = true;}
function enable_buttons(){
        document.getElementById("ex").disabled = false;
        document.getElementById("ma").disabled = false;
        document.getElementById("ed").disabled = false;}

function draw() {
    if (sanity_checks() == false) {return}
  user_data = GetUserData();
  rowtext = user_data[0];
  coltext = user_data[1];
  data = user_data[2]; //data
  indexhome = user_data[3];
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
//        var home_base_1d = home_base_1d[0];
        var index;
        for (let row = 0; row < rowtext; row++) {
             for (let col = 0; col < coltext; col++) {
                index = (coltext*row) +col;

                if (index == indexhome){
                    ctx.fillStyle = 'purple'; //homebase-color
                    ctx.fillRect(col*20, row*20, 20, 20);
                    continue;
                    }
                if (data[index] == '+') {
                    ctx.fillStyle = '#4d0000'; //pre-explode asteroid color
                    ctx.fillRect(col*20, row*20, 20, 20);
                    ctx.strokeRect(col*20, row*20, 20, 20);
                    }
                else if (data[index] == '~') {
                    ctx.fillStyle = '#000d1a'; //space-color
                    ctx.fillRect(col*20, row*20, 20, 20);

                    }
                }
               }


         }
}

function clearcanvas() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
}
function explode() {

    if (sanity_checks() == false) {return}

    disable_buttons()

    clearcanvas();
    draw();

    function timer(ms) {return new Promise(res => setTimeout(res, ms));     }

    user_data = GetUserData()
    rowtext = user_data[0];
    coltext = user_data[1];
    data = user_data[2];
    indexhome = user_data[3];
    laser_speed = user_data[5];
    asteroid_stop = user_data[6];
    var xhome = indexhome%coltext;
    var yhome = Math.floor(indexhome/coltext);
    var shoot_array = Find_nth_Asteroid_xy();
//    console.log('pre',mutuable_shoot_array);
//    console.log('pre',mutuable_shoot_array);
//    var mutuable_shoot_array = shoot_array;
    var next;
    var asteroid_stop_count =0;
//Jonas Wilms @ https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
async function load () {

    while (shoot_array.length) {
        next = shoot_array.shift()
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#00284d'; //post-explode color
            ctx.fillRect(next[0]*20, next[1]*20, 20, 20);
//            ctx.strokeRect(next[0]*20, next[1]*20, 20, 20);


//            ctx.strokeStyle = 'rgba(0,0,0,0.3)'; //line color
//            ctx.fillStyle = 'rgba(0,0,0,0.3)';
//            ctx.lineWidth = 0.1;
//            ctx.moveTo(xhome*20+10, yhome*20+10);
//            ctx.lineTo(next[0]*20+10, next[1]*20+10);
//            ctx.stroke();
//            console.log('next',next,next[0],next[1])
//            console.log('post',mutuable_shoot_array);
            await timer(laser_speed);
            asteroid_stop_count +=1;
            if (asteroid_stop_count == asteroid_stop){

                ctx.fillStyle = 'white'; //final asteroid color
                ctx.fillRect(next[0]*20, next[1]*20, 20, 20);
//                ctx.strokeStyle = 'green'; //line color
//                ctx.fillStyle = 'green';
                ctx.lineWidth = 2;
                ctx.moveTo(xhome*20+10, yhome*20+10);
                ctx.lineTo(next[0]*20+10, next[1]*20+10);
                ctx.stroke();
                enable_buttons()
//                ctx.clearRect(0, 0, canvas.width, canvas.height);

                return;}

        }

        }
    enable_buttons()
//    ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
load();
//ctx.clearRect(0, 0, canvas.width, canvas.height);


}
//}