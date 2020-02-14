let img;
let particleImage;
let ctx;


function preload() {  img = loadImage('/assets/bs_wiz.png');  }

//function write_detail() {
//    var detail = document.getElementById('scroll_bar').value;
//    return detail;
//    }



function gridmakerfunc () {
//  console.log('g',detail)

//  clear();
//  loop();
  image(img, 0, 0, width, height);
//  noFill();
//  stroke(120);
//  strokeWeight(1);
//  strokeCap(SQUARE);
  detail = document.getElementById('scroll_bar').value;
  console.log('bb',height,width,detail)
  ctx.globalAlpha = 1;
  for (let y = 0; y < height; y+=detail) {
    for (let x = 0; x < width; x+=detail) {
      rect(x, y, detail, detail);
    }
  }
}

function setup() {
  const canvas = createCanvas(100,100);
  ctx = canvas.drawingContext;

  windowResized();
}

function windowResized () {
//console.log('w',detail)
  const imgRatio = img.width/img.height;
  if (windowWidth/windowHeight > imgRatio) {
    resizeCanvas(floor(windowHeight * imgRatio), floor(windowHeight));}
  else  { resizeCanvas(floor(windowWidth), floor(windowWidth / imgRatio));  }

  draw();
}

function draw () {  window['gridmakerfunc']();  }

//////////////Mouse STUFF BELOW /////////////

function printMousePos(e) {
       document.getElementById("mouse").innerHTML = "X: " + e.clientX + " - Y: " + e.clientY;}
      document.addEventListener("click", printMousePos);

$("#mouse").click(function(e){
   var parentOffset = $(this).parent().offset();
   //or $(this).offset(); if you really just want the current element's offset
   var relX = e.pageX - parentOffset.left;
   var relY = e.pageY - parentOffset.top;
});