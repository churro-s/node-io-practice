/**
 * Created by Churro on 3/12/16.
 */


var fs = require("fs");

function stringify(person) {
    return person.name + " (" + person.title + ") " + person.year;
}

function Person(name, boss, title, year) {
    this.name = name;
    this.boss = boss;
    this.title = title;
    this.year = year;
    this.employees = [];

}
Person.prototype.toString = function () {
    return this.name + " (" + this.title + ") " + this.year + "\n";
};
Person.prototype.toStringRecurse = function toStringRecurse(depth) {
    var depthDashes = new Array(depth + 1).join("-");
    var string = this.toString();
    depth++;
    var employeeDashes = new Array(depth + 1).join("-");
    this.employees.forEach(function (employee) {
        string += employeeDashes + employee.toStringRecurse(depth);
    });
    return string;
};


fs.readFile("org_chart_sample.in", function (err, buffer) {
    var fileContents = buffer && buffer.toString();

    if (err || !fileContents.length) {
        return console.log("cannot read file") & process.exit(1);
    }
    console.log("File contents are", fileContents);

    var fileLines = fileContents.split(/\n/);
    var numOps = fileLines.shift();


    var output = "";

    for (i = 1; i <= numOps; i++) {
        output += "Case #" + i + "\n";

        var orgPeople = fileLines.shift().split("--");
        var organization = {};//one organization per line
        var people = [];

        orgPeople.forEach(function (cols) {
            cols = cols.split(",");
            person = new Person(cols[0], cols[1], cols[2], cols[3]);
            organization[person.name] = person;
            people.push(person);
        });
        people.sort();

        //build an object graph, starting with ceo
        var ceo;
        people.forEach(function (person) {
            if (person.boss === "NULL") {
                ceo = person;
            }
            else {
                organization[person.boss].employees.push(person);
            }
        });

        var graphToString = ceo.toStringRecurse(0);
        output+= graphToString;
        //console.log(require('util').inspect(ceo, false, null));
    }
    fs.writeFile("org_chart_sample.out", output);

    /*    console.log(output);
     */

});