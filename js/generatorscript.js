var morsels_strings=['a friend in need is a friend indeed.','we have 2 geraniums in our house...','dioptic lenses are cool...']
class Morsel {
  constructor(string) {
    this.string = string;
    this.visited = false;
  }
}

var morsels = [];
for (let i = 0; i < morsels_strings.length; i++) {
	morsels.push(new Morsel(morsels_strings[i]))
}


var mousecount = 0
var changeoccurs = false
function ChangeMorsel() {
  while (changeoccurs == false){
    if (mousecount<morsels.length){
      var randomchoice = Math.floor(Math.random()*Math.floor(morsels.length))
      if (morsels[randomchoice].visited == true){
        continue;  }
    morsels[randomchoice].visited = true
    changeoccurs = true
    mousecount += 1
    document.getElementById("ephemeral_line").innerHTML = morsels[randomchoice].visited
    console.log(mousecount,changeoccurs);
    }
}
}
