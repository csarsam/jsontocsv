//Require filesystem for I/O
var fs = require('fs');
var file = process.argv[2];

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  data = JSON.parse(data);
 
  console.log(data);

  convert( data );
});

function convert( input ) {
  var output = "";
  var properties = [];

  // Start by getting the column titles
  for ( property in input[0] ) {
    output = output + '"' + property + '", ';
    properties.push( property );
  }

  //Start a new row
  output += "\n";

  //Go through each object in the input array
  input.forEach( function ( entry ) {
    //Iterate over each key-value pair in the object
    properties.forEach( function (property) {
      output = output + '"' + entry[property] + '", ';
    });
    //Start a new row
    output += "\n";
  });

  //Clean up trailing commas and spaces
  var lines = output.split('\n');

  for ( var i = 0; i < lines.length; i++ ) {
    lines[i] = lines[i].substring(0, lines[i].length - 2);
  }

  output = lines.join('\n');

  writeCSV( output );
}

function writeCSV( output ) {
  fs.writeFile( process.argv[3], output, function (err) {
    if (err) {
      console.log('Error: ' + err);
    }
  });
}