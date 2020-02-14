let img;
const gridsize = 10;
let ctx;

function preload() {
  img = loadImage('assets/bs_wiz.png');
}

function gridmaker() {
  clear();
  noLoop();
  image(img, 0, 0);
  noFill();
  stroke(120);
  strokeWeight(1);
  strokeCap(SQUARE);
  ctx.globalAlpha = 1;
  for (let y = 0; y < height; y+=gridsize) {
    for (let x = 0; x < width; x+=gridsize) {
      rect(x + 0.5, y + 0.5, gridsize, gridsize);
    }
  }

}



//function printMousePos(e) {
//  document.body.textContent =
//    "clientX: " + e.clientX +
//    " - clientY: " + e.clientY;
//}
//
//document.addEventListener("click", printMousePos);