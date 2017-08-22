	var output = []
	var test = [], arr = []
	var fss = require('fs');
	var wr = fss.createWriteStream('JSON/rob&bug.json')
	var lineReader = require('readline').createInterface({
	    input: require('fs').createReadStream('CSV/chicagocrimes.csv')
	})
		lineReader.on('line', function(line) {
	    var jsonFromLine = {};
	    var lineSplit = line.split(',');
	    jsonFromLine.Primary_Type = lineSplit[5];
	    jsonFromLine.year = lineSplit[17];
	    if (jsonFromLine.Primary_Type === 'BURGLARY' || jsonFromLine.Primary_Type === 'ROBBERY') {  
	            output.push(jsonFromLine);
	        } 
	    })
	lineReader.on('close', function(line) {
	var x = output.reduce((bur, data)=> {
	for (let k = 0; k < 16; k++) {
            if (data.Primary_Type == 'BURGLARY') {
                	
                    if (data.year == '200' + (1 + k)) bur[k]++
                        else if (data.year == '20' + (1 + k)) bur[k]++
                }	
	}return bur
}, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
	var y = output.reduce((rob, data)=> {
		for (let k = 0; k < 16; k++) {
            if (data.Primary_Type == 'ROBBERY') {
                	
                    if (data.year == '200' + (1 + k)) rob[k]++
                        else if (data.year == '20' + (1 + k)) rob[k]++
                }	
	}return rob
	}, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
	for(let j=0;j<16;j++)
	{
		var obj = {
			year: j+2001,
			robbery: y[j],
			burglary: x[j]
		}
		arr.push(obj)
	}
	wr.write(JSON.stringify(arr, null, 2))
	});