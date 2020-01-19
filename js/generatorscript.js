var morsels_strings = ['a friend in need is a friend indeed.', 'we have 2 geraniums in our house...', 'dioptic lenses are cool...'];

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

// morsels[1].visited = true;
// console.log(morsels[1].visited,morsels[1].string);
var mouseclicks = 0
function ChangeMorsel() {
  var randomindex = Math.floor(Math.random()*Math.floor(morsels.length))
  if (mouseclicks >= morsels.length) {
    // console.log(morsels[randomindex].string,morsels[randomindex].visited);
    document.getElementById("ephemeral_line").innerHTML = "you've exhausted my list of morsels, I have no more for you. Please grant me a nap."
  }
  else if (morsels[randomindex].visited == true) {
        // console.log('hit');
        ChangeMorsel() }
  else {
        morsels[randomindex].visited = true;
        // console.log(morsels[randomindex].string,morsels[randomindex].visited);
        mouseclicks += 1;
        document.getElementById("ephemeral_line").innerHTML = morsels[randomindex].string
      }
}
// ChangeMorsel()
