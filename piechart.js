var output = []
var arr = []
var fss = require('fs')
var wr = fss.createWriteStream('JSON/pieChart.json')
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('CSV/chicagocrimes.csv')
})
lineReader.on('line', function(line) {
        var jsonFromLine = {}
        var lineSplit = line.split(',')
        jsonFromLine.Primary_Type = lineSplit[5]
        jsonFromLine.description= lineSplit[6]
        jsonFromLine.year = lineSplit[17]
        if (jsonFromLine.Primary_Type === 'ROBBERY') {  
                output.push(jsonFromLine)
            } 
        }
)
lineReader.on('close', function(line) {
    var x = output.reduce((pc, data) => {
        if (data.description === 'ARMED: OTHER DANGEROUS WEAPON') pc[0]++
            if (data.description == 'STRONGARM - NO WEAPON') pc[1]++
                if (data.description == 'AGGRAVATED VEHICULAR HIJACKING') pc[2]++
                    if (data.description == 'ARMED: HANDGUN') pc[3]++
                        if (data.description == 'ATTEMPT: ARMED-OTHER FIREARM') pc[4]++
                            if (data.description == 'ARMED:KNIFE/CUTTING INSTRUMENT') pc[5]++
                                if (data.description == 'VEHICULAR HIJACKING') pc[6]++
                                    if (data.description == 'AGGRAVATED') pc[7]++
return pc
    }, [0, 0, 0, 0, 0, 0, 0, 0])
        var obj = {
            ARMED_OTHER_DANGEROUS_WEAPON:x[0],
            STRONGARM_NO_WEAPON:x[1],
            AGGRAVATED_VEHICULAR_HIJACKING:x[2],
            ARMED_HANDGUN:x[3],
            ATTEMPT_ARMED_OTHER_FIREARM:x[4],
            ARMED_KNIFE_CUTTING_INSTRUMENT:x[5],
            VEHICULAR_HIJACKING:x[6],
            AGGRAVATED:x[7]
        }
        arr.push(obj)
    
    wr.write(JSON.stringify(arr, null, 2))
})