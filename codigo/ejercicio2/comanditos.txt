Para correr las queries de map reduce primero tenemos que cargar la base de datos. Para ello tenemos dos archivos coleccion_facturas.json y coleccion_ventas.json con jsons de documentos. Para importarlos corremos:

mongoimport -d tp2 -c facturas --file coleccion_facturas.json --jsonArray --drop
mongoimport -d tp2 -c ventas --file coleccion_ventas.json --jsonArray --drop

Luego corremos en la consola:

mongo

Dentro de mongo elegimos la base de datos

use tps

Luego cargamos el archivo con el codigo de los maps y los reduces:

load("mapreds.js")

Luego podemos correr los map reduces del enunciado con los siguientes comandos desde mongo:

db.facturas.mapReduce(map1,reduce1,{query : {}, out : "map_res1"})
db.ventas.mapReduce(map2,reduce2,{query : {}, out : "map_res2"})
db.ventas.mapReduce(map3,reduce3,{query : {}, out : "map_res3"})
db.facturas.mapReduce(map4,reduce4,{query : {}, out : "map_res4"})
db.facturas.mapReduce(map5,reduce5,{query : {}, out : "map_res5"})
db.ventas.mapReduce(map6,reduce6,{query : {}, out : "map_res6"})

Podemos revisar los resultados con lo siguiente:

db.map_res6.find()

