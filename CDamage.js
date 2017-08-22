var output = []
var arr = []
var fss = require('fs');
var wr = fss.createWriteStream('JSON/CDamage.json')
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('CSV/chicagocrimes.csv')
});
lineReader.on('line', function(line) {
    var jsonFromLine = {};
    var lineSplit = line.split(',');
    jsonFromLine.description = lineSplit[6];
    jsonFromLine.Primary_Type = lineSplit[5];
    jsonFromLine.year = lineSplit[17];
    if (jsonFromLine.Primary_Type === 'CRIMINAL DAMAGE') {
        output.push(jsonFromLine);
    }
});
lineReader.on('close', function(line) {
				var x = output.reduce((prop, data) => {
        for (let k = 0; k < 16; k++) {
            if (data.description === 'TO PROPERTY') {
                if (data.year == '200' + (1 + k)) prop[k]++
                    else if (data.year == '20' + (1 + k)) prop[k]++
            }
        }return prop
        },[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        var y = output.reduce((veh, data) => {
        for (let k = 0; k < 16; k++) {
            if (data.description === 'TO VEHICLE') {
                if (data.year == '200' + (1 + k)) veh[k]++
                    else if (data.year == '20' + (1 + k)) veh[k]++
            }
        }return veh
        },[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        var z = output.reduce((sprop, data) => {
        for (let k = 0; k < 16; k++) {
            if (data.description === 'TO VEHICLE') {
                if (data.year == '200' + (1 + k)) sprop[k]++
                    else if (data.year == '20' + (1 + k)) sprop[k]++
            }
        }return sprop
        },[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
   for (let j = 0; j < 16; j++) {
        var obj = {
            year: j + 2001,
            toStateSupProperty: x[j],
            toVehicle: y[j],
         	  toProperty: z[j]
        }
        arr.push(obj)
    }
    wr.write(JSON.stringify(arr, null, 2))
});