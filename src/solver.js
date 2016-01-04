/**
 * Created by gHasbroucq on 04/01/2016.
 */
(function(){
    var fs = require('fs');
    var os = require('os');

    console.log("Start...");

    var file = fs.readFile('./input/sudoku-sample.txt', 'UTF-8', function (err, data) {
        if (err) throw err;


        var lines = data.split(os.EOL);
        console.log(lines);
        console.log('line' + lines[0][0]);

        lines.forEach(function (line, li) {
            lines[li] = line.split('');
        });

        lines.forEach(function (line, li) {
            line.forEach(function (cell, ci) {
                // Initialisation
                if (cell == ' '){
                    var possibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

                    for (var i=0; i< 10; i++){

                        var index = possibles.indexOf(parseInt(line[i]));
                        if (index > -1) {
                            possibles.splice(index, 1);
                        }
                    }

                    for (var i=0; i< 10; i++){

                        var index = possibles.indexOf(parseInt(lines[ci][i]));
                        if (index > -1) {
                            possibles.splice(index, 1);
                        }
                    }

                    console.log(li + ' - ' + ci + ' : ' + possibles);

                }

            });
        });

        console.log("End...");
    });


})();
