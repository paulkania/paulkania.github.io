window.onload = function() {
    ResetMorsels()
};

  var morsels_strings = ['what is with the 21 century and corn?', 'i mean i dont like corndogs, but i do like korn, dog', '..corn', 'we have 2 geraniums', '1227 3E99 7821 24F6 92E9  BCBD B0FD D28D FEE8 D3FC'];
  var morsels_malleable = morsels_strings;
  morsels_strings.push('6/6test');
  var mouseclicks = 0; //length 5

//adding to the list also resets the list so that you can see it in the changed text
function PushNewItemWithReset() {
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
    ResetMorsels()
    }
}

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