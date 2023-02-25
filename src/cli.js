#!/usr/bin/env node
const peano = require('./index.js');

const printUsage = function(showIntro) {
    if (showIntro) {
        console.log(peano.create(2));
        console.log(' Print the Peano Curve to the console!');
    }
    console.log('\n' + 
                ' Usage:\n' + 
                '   $ peano-curve-cli <n>\n' + 
                '   $ peano-curve-cli <n> [options]\n' + 
                '\n' + 
                '   <n> is the recursive step, a number greater than or equal to 1\n' + 
                '\n' +
                ' Options:\n' + 
                '   --inverse, -i      Draw the inverse Peano Curve\n' + 
                '   --line=<line>      Draw using a specific line type: [bold|double|standard]\n' + 
                '   --rotate=<rotate>  Rotate the Peano Curve: [left|right|flip|standard]\n');
}

const getFlags = function(params) {
    let flags = [];
    if (params) {
        for (let i = 0; i < params.length; i++) {
            if (params[i].startsWith('-')) {
                flags.push(params[i]);
            }
        }
    }
    return flags;
}

const getValues = function(params) {
    let values = [];
    if (params) {
        for (let i = 0; i < params.length; i++) {
            if (!params[i].startsWith('-')) {
                values.push(params[i]);
            }
        }
    }
    return values;
}

const drawInverse = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && (flags[i].toLowerCase() === '-i' || flags[i].toLowerCase() === '--inverse')) {
            return true;
        }
    }
    return false;
}

const getLine = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith('--line=')) {
            const line = flags[i].substring(7);
            if (line) {
                if (line.toLowerCase() === 'bold' || line.toLowerCase() === 'double' || line.toLowerCase() === 'standard') {
                    return line.toLowerCase();
                } else {
                    console.log('\n Warning: Please provide a supported line type: [bold|double|standard]');
                }
            } else {
                console.log('\n Warning: Please provide a supported line type: [bold|double|standard]');
            }
        }
    }
    return undefined;
}

const getRotation = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith('--rotate=')) {
            const line = flags[i].substring(9);
            if (line) {
                if (line.toLowerCase() === 'left' || line.toLowerCase() === 'right' || line.toLowerCase() === 'flip' || line.toLowerCase() === 'standard') {
                    return line.toLowerCase();
                } else {
                    console.log('\n Warning: Please provide a supported rotation type: [left|right|flip|standard]');
                }
            } else {
                console.log('\n Warning: Please provide a supported rotation type: [left|right|flip|standard]');
            }
        }
    }
    return undefined;
}

if (process.argv.length > 2) {
    const params = process.argv.slice(2);
    const values = getValues(params);
    const flags = getFlags(params);
    if (values[0] && !isNaN(values[0]) && parseInt(values[0]) >= 1) {
        var n = parseInt(values[0]);
        if (n !== undefined) {
            console.log(peano.create(n, { inverse: drawInverse(flags), rotate: getRotation(flags), line: getLine(flags) }));
        }
    } else {
        console.log('\n <n> should be a number greater than or equal to 1');
        printUsage(false);
    }
} else {
    printUsage(true);
}