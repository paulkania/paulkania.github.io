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
//sdfiusbdfuidsbfusdhbfuh
function ChangeMorsel() {
  var randomindex = Math.floor(Math.random()*Math.floor(morsels.length))
      while (morsels[randomindex].visited == true) {
        var randomindex = Math.floor(Math.random()*Math.floor(morsels.length))
      }
      if (morsels[randomindex].visited == false){
        morsels[randomindex].visited = true;
        // console.log(morsels[randomindex].string,morsels[randomindex].visited);
        document.getElementById("ephemeral_line").innerHTML = morsels[randomchoice].string
        }
}
ChangeMorsel()
