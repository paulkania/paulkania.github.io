var morsels_strings=['a friend in need is a friend indeed.','we have 2 geraniums in our house...','dioptic lenses are cool...']
class Morsel {
  constructor(string) {
    this.string = string;
    this.visited = false;
  }
}
// console.log(morsels_strings[0,2])

var morsels = [];
for (let i = 0; i < morsels_strings.length; i++) {
	morsels.push(new Morsel(morsels_strings[i]))
}

console.log(morsels[1].visited)
console.log(morsels[1].string)
