const fs = require('fs');

const output = data => console.log(JSON.stringify({ items: data.length ? data : [data] }));

const promise = func => new Promise((resolve, reject) => func.then(res => resolve(res)).catch(err => reject(err)));

const checkFile = (filename, entry) => {
    let file;
    if(fs.existsSync(filename)){
        file = JSON.parse(fs.readFileSync(filename, { encoding: 'utf-8' }));
    } else {
        fs.writeFileSync(filename, entry);
        file = {};
    }

    return file;
};

module.exports = {
    output,
    promise,
    checkFile,
};