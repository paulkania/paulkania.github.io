In order to edit this file, you have to run the the cpp file (this file
is @C:\Users\proze\Documents\GitHub\emsdk\upstream\emscripten  >>>

run the command : em++ tests/hello_world_sdl.cpp -o emscripten_olc.html
in order to get the
1html 2 js 3 wasm file...any changes to the page must be made by changing the hello_world.cpp file, and then running the above command again.

###Where We Are In This Projo
The project to add my olc.cpp projects natively on the browser is at a standstill, because the GLX library is not supported by emscripten. check https://github.com/emscripten-core/emscripten/issues/8020 in future.

This project is obviously quite complex.
ex. changing hello_world.cpp (simples print statement cpp) was possible.
but changin hello_world_sdl.cpp (cjhanging the same print statement, except there's other
stuff going on) made no difference to the program...no idea why, and since olc isn't supported, im not particularly interested to investigate.