var output = []
var arr = []
var fss = require('fs')
var wr = fss.createWriteStream('../json/pieChart.json')
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('../csv/chicagocrimes.csv')
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

    for(let j=0;j<8;j++){
    	var data=x[j]
    	if(j==0)arr.push({type:"ARMED_OTHER_DANGEROUS_WEAPON",total:data})
      if(j==1)arr.push({type:"STRONGARM_NO_WEAPON",total:data})
      if(j==2)arr.push({type:"AGGRAVATED_VEHICULAR_HIJACKING",total:data})
      if(j==3)arr.push({type:"ARMED_HANDGUN",total:data})      
      if(j==4)arr.push({type:"ATTEMPT_ARMED_OTHER_FIREARM",total:data})
      if(j==5)arr.push({type:"ARMED_KNIFE_CUTTING_INSTRUMENT",total:data})
      if(j==6)arr.push({type:"VEHICULAR_HIJACKING",total:data})
      if(j==7)arr.push({type:"AGGRAVATED",total:data})
        }    
    wr.write(JSON.stringify(arr, null, 2))
})
