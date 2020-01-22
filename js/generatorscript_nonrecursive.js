const morsels_strings = ['doughnuts from whom?outrageous!','blockstream & trezor r great','a friend in need is a friend indeed.', '2/3we have 2 geraniums', '3/3dioptic lenses',];
var morsels_malleable = morsels_strings

var mouseclicks = 0 //length 5
//empty and re-fill index_array, and refresh mouseclicks.
function ResetMorsels() {
  morsels_malleable = []

  for (let i = 0; i < morsels_strings.length; i++) {
    morsels_malleable.push(morsels_strings[i])
    }

  if (mouseclicks > 0){
    mouseclicks = 0
    document.getElementById("ephemeral_line").innerHTML = "ok, i've been refreshed, hit me bb";
    }
  console.log(morsels_malleable)
}

// if the morsel array isnt empty
//  	doc read random morsel string
// 	    delete ith index (make sure u delete the right one
function ChangeMorsel() {
  mouseclicks += 1;
  if (morsels_malleable.length) {
    console.log('a',morsels_malleable)
    var randomindex = Math.floor(Math.random()*morsels_malleable.length)
    document.getElementById("ephemeral_line").innerHTML = morsels_malleable[randomindex]
    morsels_malleable.splice(randomindex,1)     // array.splice(index, 1);
    }
  else {
    document.getElementById("ephemeral_line").innerHTML = "There aren't any more juicy morsels, but you hit reset to eat more morsels. uve over-hit me"//+(mouseclicks-morsels.length+1)  +"  # time(s)";
    }
}
//why doesnt github ack my current js file?