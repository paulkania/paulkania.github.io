function draw() {
      user_data = GetUserData();
      var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var coltext = 5;
        var rowtext = 3;
        var matrixlength = coltext*rowtext;
        var ast_string = "~~+~~+++++~+~+~";
        var home_base_2d = [2,1];
//        var home_base_1d = home_base_1d[0];
        var index;
        for (let row = 0; row < rowtext; row++) {
             for (let col = 0; col < coltext; col++) {
                index = (coltext*row) +col;
                if (ast_string[index] == '+') {
                    ctx.fillStyle = 'black'; //asteroid-blue
                    ctx.fillRect(col*10, row*10, 10, 10);
                    }
                else if (ast_string[index] == '~') {
                    ctx.fillStyle = 'green'; //spacey-white
                    ctx.fillRect(col*10, row*10, 10, 10);
                    }

//                ctx.fillStyle = 'white';
//                ctx.fillRect(col*10, row*10, 1, 10);
                }
               }
         }
}