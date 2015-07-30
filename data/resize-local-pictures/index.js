var fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird'),
    gm,
    Client = require('ssh2').Client;

/*
 * CLI validation
 */
if (process.argv.length < 2 || process.argv.length > 3) {
    console.log('Usage :');
    console.log('    node index.js [options]');
    console.log('');
    console.log('Options :');
    console.log('  -g  Use GraphicsMagick (default)');
    console.log('  -i  Use ImageMagick');
    process.exit();
}

if (process.argv.length === 3 && process.argv[2] === '-i') {
    gm = require('gm').subClass({imageMagick: true});
} else {
    gm = require('gm');
}

var basedir = './pics',
    pics = [],
    promises = [],
    client = new Client();

/*
 * Find all pictures
 */

try {
    fs.readdirSync(basedir).forEach(function(subdir) {
        fs.readdirSync(path.join(basedir, subdir)).forEach(function(img, idx) {
            if (/.*\.jpg$/i.test(img)) {
                pics.push([subdir, img, idx]);
            }
        });
    });
} catch (e) {
    if (e.code === 'ENOENT') {
        console.log('ERROR');
        console.log('Create a directory named "pics" next to this script. Then create subdirectories in it and put your pictures in them.');
        process.exit();
    } else {
        console.log(e);
    }
}

/*
 * Start an (S)FTP session
 */

// Prepare instructions for SFTP (what to do when connection is ready)
client.on('ready', function() {
    console.log('SFTP session started');
    client.sftp(function(err, sftp) {
        if (err) throw err;
        pics.forEach(function(pic, idx) {
            var inFileName = path.join(basedir, pic[0], pic[1]),
                outPath = 'fichiers/MonJardinEnVille/photos/' + pic[0] + '-' + pic[2];

            /*
             * Optimize image (see function below) and pipe it to an FTP write stream
             */
            // Resolution 1x (width = 750)
            promises.push(new Promise(function (resolve, reject) {
                var outPath1 = outPath + '.jpg',
                    outStream1 = sftp.createWriteStream(outPath1);
                outStream1.on('finish', function() {
                    console.log('SFTP completed ' + outPath1);
                    resolve();
                });
                outStream1.on('error', function(err) {
                    console.log(err);
                    reject();
                });
                optimizeImg(inFileName, 1).pipe(outStream1);
            }));

            // Resolution 2x (width = 1500)
            promises.push(new Promise(function (resolve, reject) {
                var outPath2 = outPath + '-2x.jpg',
                    outStream2 = sftp.createWriteStream(outPath2);
                outStream2.on('finish', function() {
                    console.log('SFTP completed ' + outPath2);
                    resolve();
                });
                outStream2.on('error', function(err) {
                    console.log(err);
                    reject();
                });
                optimizeImg(inFileName, 2).pipe(outStream2);
            }));
        });
        Promise.all(promises).then(function() {
            client.end();
        });
    });
});

client.on('end', function() {
    console.log('SFTP session finished');
});

client.on('error', function(err) {
    console.log(err);
});

// Actually connect to SFTP and let the even-based process do the rest
console.log('SFTP connection...');
client.connect({
    host: 'depot.natural-solutions.eu',
    port: 22,
    username : 'depot',
    password : 'awsUpOr8'
});


/*
 * Image optimization and resizing function based on GraphicsMagick or ImageMagick (see "gm" module on NPM)
 */

function optimizeImg(fileName, factor) {
    if (factor === void 0) {
        factor = 1; // Default
    }
    console.log('Optimizing ' + fileName + ' with factor ' + factor);
    return gm(fileName)
        .gaussian(0.05)
        .noProfile()
        .define('jpeg:dct-method=float')
        .samplingFactor('4:2:0')
        .resize(750 * factor)
        .interlace('Plane')
        .quality(75)
        .stream();
}
