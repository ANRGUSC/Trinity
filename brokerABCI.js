let createABCIServer = require('abci')
var mqtt = require('mqtt');

/***********************************************************************/
/*var client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
	console.log("Connected to the Broker -> Waiting for Message");
	client.subscribe('contract');

})*/

Registered_Topics=[];
Registered_Warehouses=[];
Registered_Policy={};


/*******************************************************************/
function validate_contract(data){
	console.log("data is: " +data);
	console.log("topic in message is: " +data.topic);
	if('data.topic' in Registered_Topics){
		console.log("Topic is registered in the system")
	
		for(i=0;i<Object.keys(Registered_Policy).length;i++){
			console.log(Registered_Policy[i])
		}
	}




}

/*******************************************************************/
/***********{'topics':[Registered_Topics],'stakeholders':[Registered_Warehouses],
*'policies':{0:{"Field":"Temperature","Operator": ">","Value":30,"Response":"Temperature is outside the recommended range"},
*1:{"Field":"Temperature","Operator": "<","Value":20,"Response":"Temperature is outside the recommended range"},
*2:{"Field":"Warehouse","Operator": "not in","Value": "list of stakeholders","Response": "Unauthorized Warehouse"}}}
 *******************************************************************/                                                                 
function contract_parser(data){
	json_data=JSON.parse(data)
	//console.log(json_data);
		if ('topics' in json_data){
			(json_data.topics).forEach(function(item) {
				if (Registered_Topics.includes(item)==false){
    					Registered_Topics.push(item);
				}
			});
			console.log("Registered Topics are : " + Registered_Topics);
			
			if('stakeholders' in json_data){
			(json_data.stakeholders).forEach(function(item) {
				if (Registered_Warehouses.includes(item)==false){
    					Registered_Warehouses.push(item);
				}
			});
			}
			console.log("Registered Warehouses are : " + Registered_Warehouses);
			console.log("Policies are")
			console.log(json_data.policies)
			//console.log(Object.keys(json_data.policies).length)
			Registered_Policy=json_data.policy;
		}
		return


}


/*client.on('message', function (topic, message) {
		console.log("Message Received From Topic " + topic);
		contract_parser(message.toString())
})*/





// turn on debug logging
require('debug').enable('abci*')

let state = {
  count: 0
}

var contract={"DesiredTemperatureHigh":30,"DesiredContractLow":20};



function get_json_data(data){

	// Return the Promise right away, unless you really need to
  	// do something before you create a new Promise, but usually
  	// this can go into the function below
  	return new Promise((resolve, reject) => {
    	// reject and resolve are functions provided by the Promise
    	// implementation. Call only one of them.

    	// Do your logic here - you can do what you want.:)
	currentstate=JSON.parse(data)
      	// PS. Fail fast! Handle errors first, then move to the
      	// important stuff (that's a good practice at least)
      	if (err) {
        // Reject the Promise with an error
        return reject(err)
      	}

      	// Resolve (or fulfill) the promise with data
      	return resolve(currentstate)
    	})
  	
}


let handlers = {
  info (request) {
    return {
      data: 'Node.js counter app',
      version: '0.0.0',
      lastBlockHeight: 0,
      lastBlockAppHash: Buffer.alloc(0)
    }
  },

  checkTx (request) {
    	//prining to verify the contents of request	  
    	console.log("Request at CheckTx is");
    	//console.log(request);	  
    	console.log("Request is:"+request.tx);	  
    


	currentstate=JSON.parse(request.tx)
	console.log("Current state is " + currentstate);  
	console.log("Current temp is " + currentstate[2]);
	json_data=JSON.parse(currentstate)  
	console.log("Current temp is " + json_data.Temperature);  
	//validate_contract(json_data);  

	if(json_data.topic != "contract"){  

	//checking the state against the contract
	//Adding transactions to the block irrespective of the outcome,
		//as it is important to preserve data for this use case
	if (json_data.Temperature > contract.DesiredTemperatureHigh || 
		json_data.Temperature < contract.DesiredContractLow){
    	return { code: 0, log: 'Bad' }
        } 		
	
        return { code: 0, log: 'Good' }
	}else{
        return { code: 0, log: 'Contract' }
	}

  },

  deliverTx (request) {
    //let tx = padTx(request.tx)
    console.log("////////////////////////////////////");
    console.log("Request at deliverTx is:"+request.tx);	
    console.log("////////////////////////////////////");	  
    //let number = tx.readUInt32BE(0)
    //console.log("Request in number is: "+number)	  
    /*if (number !== state.count) {
      return { code: 1, log: 'tx does not match count' }
    }*/

    // update state
    //state.count += 1

    return { code: 0, log: 'tx succeeded' }
  }
}

// make sure the transaction data is 4 bytes long
/*function padTx (tx) {
  let buf = Buffer.alloc(4)
  tx.copy(buf, 4 - tx.length)
  return buf
}*/

let port = 46658
createABCIServer(handlers).listen(port, () => {
  console.log(`listening on port ${port}`)
})
