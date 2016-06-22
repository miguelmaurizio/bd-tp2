var map1 = function(){
	emit(this["id"],this["monto"])
}

var reduce1 = function(key,values){
	return Array.sum(values)
}

var map2 = function(){
	emit(this["idComprador"],this["calificacionComprador"])
	emit(this["idVendedor"],this["calificacionVendedor"])
}

var reduce2 = function(key,values){
	return Array.sum(values) / values.length
}

var map3 = function(){
	var pair = {"comision": this["comision"], "id": this["id"]};
	emit(0, pair)
}

var reduce3 = function(key,values){
	var max = 0;
	for(var i =0; i < values.length; i++){
		max = Math.max(max, values[i]["comision"]);
	}
	res = [];
	for(var i =0; i < values.length; i++){
		if(values[i]["comision"] === max) {
			res.push(values[i]["id"])
		}
	}	
	return {"res": res};
}

var map4 = function(){
	var s = new Date(
				this["fecha"].replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
			).getFullYear();
	emit(s, this["monto"]);
}

var reduce4 = reduce1

var map5 = function(){
	if(this["suscripcionRubi"] === "true"){
		var s = new Date(
					this["fecha"].replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
				).getFullYear();
		emit(s, this["monto"])		
	}
}

var reduce5 = reduce1

var map6 = function(){
	emit(this["tipoPublicacion"], 1)		
}

var reduce6 = reduce1
