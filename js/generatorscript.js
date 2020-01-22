const morsels_strings = ['omg trudeau bought doughnuts from whom?! outrageous!','trezor is great','blockstream is great','a friend in need is a friend indeed.', '2/3we have 2 geraniums', '3/3dioptic lenses',];
var mouseclicks = 0

class Morsel {
  constructor(string) {
    this.string = string;
    this.visited = false; }
}

//initialize morsels array with Type Morsel Class Strings/Objects.
var morsels = [];
for (let i = 0; i < morsels_strings.length; i++) {
	morsels.push(new Morsel(morsels_strings[i]))   }


//reset mouseclicks (if>0) and set all Morsel Objects to false, and let the user know,
function ResetMorsels()
{
  if (mouseclicks > 0){
  mouseclicks = 0
  for (let i = 0; i < morsels.length; i++) {
    morsels[i].visited = false
    //leaving this comment here in memory of the 3 hours i spent chasing this bug down.
    //next time: use js console, it's pretty nice, has darkmode.
    //console.log(morsels.visited) // gives UNDEFINED, which u woulda seen.
    //console.log(morsels[i].visited) // gives (#morsels)+false
  }
  document.getElementById("ephemeral_line").innerHTML = "ok, i've been refreshed, hit me bb";
  }
}

function ChangeMorsel()
{
  mouseclicks += 1;
console.log('top',mouseclicks,morsels.length);
var randomindex = Math.floor(Math.random()*Math.floor(morsels.length))
  if (morsels[randomindex].visited == true && mouseclicks < morsels.length) {
      ChangeMorsel()} // to increase efficiency I could change this recursive call to instead create a
                      //second array of indices, and when i click, i hit a random index #(1-8), then delete
                      //the number, then the logic would instead be: if index array is not empty: run this, else, youve hit the end.
                      //this will save a lot of unnessary calls to of this function (especially when i get deeper
                      // in the list, and the ratio to true/false is high.)
                      //small break and im on it!
      // mclicks <= gives a stackoverflow error because you just call changemorsel in an infinite loop, looking for a falsey, but they all trues!
  else if (morsels[randomindex].visited == false && mouseclicks <= morsels.length) {
      morsels[randomindex].visited = true;
      document.getElementById("ephemeral_line").innerHTML = morsels[randomindex].string
      }

  if (mouseclicks >= morsels.length) {

    document.getElementById("ephemeral_line").innerHTML = "please, i need rest, youve struck me  "+(mouseclicks-morsels.length+1)  +"  # o times";
    console.log('end',mouseclicks-morsels.length);
    }
}
