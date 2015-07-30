/*
 * Dependencies
 */
var fs = require('fs'),
    csv = require('csv'),
    stream = require('stream'),
    gju = require('geojson-utils'),
    util = require('util'),
    Transform = stream.Transform || require('readable-stream').Transform;

/*
 * CLI validation
 */
if (process.argv.length !== 5 || (process.argv[4] !== 'garden' && process.argv[4] !== 'trees')) {
    console.log('Usage :');
    console.log('    node index.js <inputGeoJSON> <outputCSV> (garden|trees)');
    process.exit();
}

/*
 * Compute centroid as a transform
 */
function PointOnly(options) {
    // Allow use without new
    if (!(this instanceof PointOnly)) {
        return new PointOnly(options);
    }
    // Call Transform constructor
    Transform.call(this, options);
}
util.inherits(PointOnly, Transform);
// Replace polygon/linestring by their centroid
PointOnly.prototype._transform = function (feature, enc, cb) {
    if (feature.geometry.type !== 'Point') {
        feature.geometry = gju.centroid(feature.geometry);
    }
    this.push(feature);
    cb();
};

/*
 * Extract fields as a Transform
 */
function ExtractFields(options) {
    // Allow use without new
    if (!(this instanceof ExtractFields)) {
        return new ExtractFields(options);
    }
    // Call Transform constructor
    Transform.call(this, options);
}
util.inherits(ExtractFields, Transform);
// Extract properties
ExtractFields.prototype._transform = function (feature, enc, cb) {
    if (mode === 'garden' && feature.properties.tags.landuse !== 'allotments') {
        cb();
        return;
    }
    cpt += 1;
    var values = {
        id: cpt,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        visit_time_min: 10,
        visit_time_max: 30,
        price_min: -1,
        price_max: -1,
        withchild: 1,
        
    }
    this.push(values);
    if (mode === 'garden') {
        values.name = feature.properties.tags.name || '';
        values.type_id = 4;
        values.desc = 'Jardins familiaux. Data: © OpenStreetMap contributors';
    }
    if (mode === 'trees') {
        values.type_id = 7;
        values.desc = 'Arbre d\'alignement. Data: © OpenStreetMap contributors';
        if (feature.properties.tags.species) {
            values.name = feature.properties.tags.species;
        } else if (feature.properties.tags.genus) {
            values.name = feature.properties.tags.genus;
        }
    }
    cb();
};

var iPath = process.argv[2],
    oPath = process.argv[3],

    mode = process.argv[4],

    cpt = 0,

    rawData = fs.readFileSync(iPath, {encoding: 'utf8'}).replace(/^\uFEFF/, ''), // read file, decode utf8 and remove BOM if necessary
    data = JSON.parse(rawData), // parse json string to object

    pointOnly = new PointOnly({objectMode : true}),
    extractFields = new ExtractFields({objectMode : true}),
    output = fs.createWriteStream(oPath, {encoding: 'utf8'}),

    stringifier = csv.stringify({
        header: true,
        delimiter: ';',
        columns: ['id', 'longitude', 'latitude', 'name', 'name_en', 'name_fr', 'name_es', 'name_de', 'name_it', 'visit_time_min', 'visit_time_max', 'price_min', 'price_max', 'type_id', 'street', 'postal_code', 'phone', 'mail', 'website', 'resa_link', 'url_img1', 'url_img2', 'desc', 'desc_en', 'desc_fr', 'desc_es', 'desc_de', 'desc_it', 'withchild']
    });

output.on('finish', function() {
    console.log(cpt + ' features converted to CSV')
});

pointOnly.pipe(extractFields).pipe(stringifier).pipe(output);

data.features.forEach(function(feature, idx, arr) {
    pointOnly.write(feature)
});
pointOnly.end();
