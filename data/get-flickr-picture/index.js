// TODO
console.log('This script is buggy, do not use.');
process.exit();

var fs = require('fs'),
    Flickr = require('node-flickr'),
    csv = require('csv'),
    Promise = require('bluebird'),
    flickr = new Flickr({'api_key': '77f739a96134f39fcd38ff74c72b1fc8'}),
    flickrGet = Promise.promisify(flickr.get, flickr);

Promise.longStackTraces();

function flickrSearch(query, pics) {
    query.page = query.page || 1;
    pics = (pics === void 0) ? [] : pics;
    return flickrGet('photos.search', query).then(function(result) {
        // Aggregate result
        pics = pics.concat(result.photos.photo);

        // Get next result page if any
        if (query.page < result.photos.pages) {
            query.page += 1;
            return flickrSearch(query);
        }
        return Promise.resolve(pics);
    });
}

function getPictureData(poiName) {
    if (poiName in cache) {
        console.log('Obtaining picture from cache for ' + poiName);
        cptc =+ 1;
        return Promise.resolve(cache[poiName]);
    }
    console.log('Obtaining picture from flickr for ' + poiName);
    return flickrSearch({
        text: poiName,
        sort: 'interestingness-desc',
        license: '4,5,6,7,8',
        woe_id: '610264' // Même si c'est contre-intuitif, les paramètres lat-lon-radius ont généré un moins bon résultat dans mes différents tests
    }).filter(function(pic, idx, len) {
        console.log('Got result for pic ' + pic.id + ', filtering');
        return idx < 2;
    }).map(function(pic) {
        return flickrGet('photos.getSizes', {photo_id: pic.id}).then(function(result) {
            console.log('Got size for pic ' + pic.id);
            var sizes = result.sizes.size.filter(function(size) {
                return parseInt(size.width) > 700; // Keep only picture larger than 700px
            }).sort(function(a, b) {
                return a.width - b.width; // smallest first
            });
            if (sizes.length === 0) {
                // no picture is larger than 700px, let's take the largest other picture
                sizes = result.sizes.size.sort(function(a, b) {
                    return b.width - a.width; // largest first
                });
            }
            cache[poiName] = {
                id: pic.id,
                url: sizes[0].source
            };
            return cache[poiName];
        });
    }).catch(function(err) {
        console.log(err);
    });
}

function errorHandler(err) {
    console.log(err);
}

if (process.argv.length !== 4) {
    console.log('Usage :');
    console.log('    node index.js <inputCSV> <outputCSV>');
    process.exit();
}

var parser = csv.parse({delimiter: ';', columns: true}),

    iPath = process.argv[2];
    oPath = process.argv[3];

    input = fs.createReadStream(iPath, {encoding: 'utf8'}),
    output = fs.createWriteStream(oPath, {encoding: 'utf8'}),

    cptp = 0,
    cpt1 = 0,
    cpt2 = 0,
    cptc = 0,

    cache = {},

    transformer = csv.transform(function(record, callback) {
        cptp += 1;
        if (record.name) {
            console.log('Transforming line ' + cptp + ' (with name)');
            getPictureData(record.name).then(function(pics) {
                if (pics.length > 0) {
                    record.url_img1 = pics[0].url;
                    cpt1 += 1;
                }
                if (pics.length > 1) {
                    record.url_img2 = pics[1].url;
                    cpt2 += 1;
                }
            });
        } else {
            console.log('Transforming line ' + cptp + ' (without name)');
            callback(null, record);
        }
    }, {parallel: 1}),

    stringifier = csv.stringify({header: true, delimiter: ';'});

// input.on('error', errorHandler);
// parser.on('error', errorHandler);
// transformer.on('error', errorHandler);
// stringifier.on('error', errorHandler);
// output.on('error', errorHandler);

output.on('finish', function() {
    console.log(cpt2 + ' POIs with 2 pictures');
    console.log((cpt1 - cpt2) + ' POIs with only 1 picture');
    console.log((cptp - cpt1) + ' POIs with no picture at all');
    console.log('Cache hit : ' + cptc);
});

console.log('start reading');
input.pipe(parser).pipe(transformer).pipe(stringifier).pipe(output);
