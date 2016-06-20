// Set up sharding.
sh.enableSharding("exp_sharding");
assert(shardingMode === 'ranges' || shardingMode === 'hashed');
if (shardingMode === 'ranges') {
  sh.shardCollection("exp_sharding.publicaciones", {"id_publicacion": 1.0});
} else { // shardingMode === 'hashed'
  sh.shardCollection("exp_sharding.publicaciones", {"_id": "hashed"});
}

// Define number of insertions in experiment.
var numberOfInsertions = 50000;
var numberOfInsertionsPerBatch = 2000;
assert(numberOfInsertions % numberOfInsertionsPerBatch == 0);

// Create ids in range 0 .. numberOfInsertions in random order.
var ids = new Array(numberOfInsertions);
for (var i = 0; i < numberOfInsertions; ++i) {
  ids[i] = i;
}
shuffle(ids);

// Run insertions.
for (var i = 0; i < numberOfInsertions / numberOfInsertionsPerBatch; ++i) {
  var first = i * numberOfInsertionsPerBatch, last = first + numberOfInsertionsPerBatch - 1;
  print("Starting batch " + first + " - " + last);
  for (var j = 0; j < numberOfInsertionsPerBatch; ++j) {
    var idPublicacion = ids[i * numberOfInsertionsPerBatch + j];
    db.publicaciones.insert({ "id_publicacion": idPublicacion });
  }
  db.publicaciones.getShardDistribution();
}

// Drop collection.
db.publicaciones.drop();

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 * Source: http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
