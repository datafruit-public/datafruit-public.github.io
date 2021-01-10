
// Datafruit OÜ, kristian@datafruit.ee, jaanuar 2021

(function() {

	// Create the connector object
	var myConnector = tableau.makeConnector();
	
	myConnector.getSchema = function(schemaCallback) {

		var standardConnections = new Promise(function(resolve, reject) {

		loadJSON("StandardConnectionsData", function(json) {

		var obj = JSON.parse(json);
		var connectionList = [];

		for (var connection in obj.connections) {
			connectionList.push(obj.connections[connection]);
		}
			resolve(connectionList);
		}, true);
		});
		
		var tables = new Promise(function(resolve, reject) {

			loadJSON("StandardConnectionsTableInfoData", function(json) {

			var obj = JSON.parse(json);
			var tableList = [];

			for (var table in obj.tables) {
				tableList.push(obj.tables[table]);
			}
			
			resolve(tableList);
			
			}, true);
		});

		// Call the schemaCallback to send this info to Tableau
		Promise.all([tables, standardConnections]).then(function(data) {
			schemaCallback(data[0], data[1]);
			});
	}
	
	myConnector.getData = function(table, doneCallback) {

		var formObj = JSON.parse(tableau.connectionData),
			apiCall = "https://andmed.stat.ee/api/v1/et/stat/" + formObj.db;

		var kpi;

		if (formObj.metric.length < 5) {

		// get metrics, choose first metric
		$.getJSON(apiCall, function(resp) {
			var kpiResult = resp.variables[1];

			kpi = kpiResult.values[0];
			
		});} else {
			kpi = formObj.metric;
		}
		
		// get observation period data
		if (table.tableInfo.id === "observation") {
			 $.getJSON(apiCall, function(resp) {
				var observationResult = resp.variables[2],
				observationData = [];
				
				// Iterate over the JSON object
				for (var j = 0, observationLength = observationResult.values.length; j < observationLength; j++) {
					observationData.push({
						"observationCode": observationResult.values[j],
						"observationName": observationResult.valueTexts[j]
					});
				}
				table.appendRows(observationData);
				doneCallback();
			});
		}
		
		// get field classificators and values
		if (table.tableInfo.id === "field") {
			 $.getJSON(apiCall, function(resp) {
				var fieldResult = resp.variables[0],
				fieldData = [];
				
				// Iterate over the JSON object
				for (var i = 0, fieldLength = fieldResult.values.length; i < fieldLength; i++) {
					fieldData.push({
						"fieldCode": fieldResult.values[i],
						"fieldName": fieldResult.valueTexts[i]
				});
				}
				table.appendRows(fieldData);
				doneCallback();
			});
		}
		
		// get observation period data
		if (table.tableInfo.id === "metric") {
			 $.getJSON(apiCall, function(resp) {
				var metricResult = resp.variables[1],
				metricData = [], dbCode;
				
				// Iterate over the JSON object
				for (var j = 0, metricLength = metricResult.values.length; j < metricLength; j++) {
					metricData.push({
						"metricCode": metricResult.values[j],
						"metricName": metricResult.valueTexts[j]
				});
				dbCode = metricResult.values[0];
				}
				
			//	console.log(dbCode);
			
			table.appendRows(metricData);
				doneCallback();
			});
		}
		
		if (table.tableInfo.id === "data") {
			// get data
			
			$.ajax({
				type: "POST",
				crossDomain: true,
				url: apiCall,
				contentType: "text/plain; charset=UTF-8",
				processData: false,
				data: JSON.stringify({"query":[{"code":"N\u00E4itaja","selection":{"filter":"item","values":[""+ kpi +""]}}],"response":{"format":"json"}}),
				dataType: "json",
				success: function (resp) {
				var dataResult = resp.data,
				tableData = [];
				
				// Iterate over the JSON object
				for (var k = 0, dataLength = dataResult.length; k < dataLength; k++) {
					tableData.push({
						"observationCode": dataResult[k].key[2],
						"fieldCode": dataResult[k].key[0],
						"metricCode": dataResult[k].key[1],
						"value": dataResult[k].values[0]
					});
				}
				table.appendRows(tableData);
				doneCallback();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(JSON.stringify(errorThrown));
				}
			});
		}
	};

	tableau.registerConnector(myConnector);

	// Create event listeners for when the user submits the form
	$(document).ready(function() {
		translateButton();
		$("#submitButton").click(function() {
			var formObj = {
				db: $('#db').val().trim(),
				metric: $('#metric').val().trim(),
			};
			
			tableau.connectionData = JSON.stringify(formObj);
			tableau.connectionName = "Statistikaamet API andmed (datafruit.ee)";
			tableau.submit();
		});
	});
})();

var translateButton = function() {
	var pollLocale = setInterval(function() {

		if (tableau.locale) {
			switch (tableau.locale) {
				//case tableau.localeEnum.en-us:
				//	$("#submitButton").text("Get data!");
				//	break;
				default:
					$("#submitButton").text("Get data!");
			}
			clearInterval(pollLocale);
		}
	}, 10);
};

function loadJSON(path, cb, isLocal) {
	var obj = new XMLHttpRequest();
	obj.overrideMimeType("application/json");
	if(isLocal) {
	obj.open("GET", "../json/" + path + ".json", true);
} else {
		obj.open("GET", "http://jsonplaceholder.typicode.com/" + path, true);
}
	obj.onreadystatechange = function() {
		if (obj.readyState == 4 && obj.status == "200"){
			cb(obj.responseText);
		}
	}
	obj.send(null);
}
