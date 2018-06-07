var mqtt = require('mqtt')

/***********************************************************************/
var client = mqtt.connect('mqtt://localhost')

/**********************************************************************/
Registered_Topics=["PackageABC","PackageDEF","PackageGHI"]

/**********************************************************************/
Registered_Warehouses=["Warehouse123,456 Street,Country 00001","Warehouse789,101 Street,Country 00002","Warehouse112,131 Street,Country 00003"]


setInterval(function () {
	var milliseconds = (new Date).getTime();
	console.log(milliseconds);
	random_temperature=15+Math.floor(Math.random() * Math.floor(15))+Math.random()
	random_warehouse=Math.floor(Math.random() * Math.floor(3))
	payload={"Warehouse":Registered_Warehouses[random_warehouse],"Temperature":random_temperature,"Timestamp":milliseconds}
	random_topic=Math.floor(Math.random() * Math.floor(3))
	console.log(random_topic);	
	console.log("topic is " + Registered_Topics[random_topic])		
	client.publish(Registered_Topics[random_topic],JSON.stringify(payload));
},5000);
