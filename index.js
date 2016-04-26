/**
 * Created by Churro on 3/12/16.
 */

var fs = require("fs");

fs.readFile("sum.in", function (err, buffer) {
    var fileContents = buffer && buffer.toString();

    if (err || !fileContents.length) {
        return console.log("cannot read file") & process.exit(1);
    }
    console.log("File contents are", fileContents);

    var fileLines = fileContents.split(/\n/);
    var numOps = fileLines.shift();
    //console.log("File has following lines to sum", fileLines, "and this many operations", numOps);

    var output = "", sum;
    for (i = 1; i <= numOps; i++) {
        output+= "Case #"+i+"\n";
        var operands = fileLines.shift().split(/\s+/);
        sum = (operands[0] - 0) + (operands[1] -0);
        output += sum + "\n";
    }

    console.log(output);
    fs.writeFile("sum.out", output);
});