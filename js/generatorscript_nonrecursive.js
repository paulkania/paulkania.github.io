window.onload = function() {
    ResetMorsels()
};

  const morsels_strings = ['1/5doughnuts from whom?', '2/5blockstream&trgr8', '3/5af_indeed.', '4/5we have 2 geraniums', '5/5dioptic lenses'];
  var morsels_malleable = morsels_strings;
  morsels_strings.push('6/6test');
  var mouseclicks = 0; //length 5

//adding to the list also resets the list so that you can see it in the changed text
function PushNewItem() {
    var text = document.getElementById("to_push").value;
    morsels_strings.push(text);
    console.log('inpush function',morsels_strings);
    ResetMorsels()

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