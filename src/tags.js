const client = require('./api');
const fs = require('fs');
const { output, promise, checkFile } = require('./utils');
const { close: subtitle } = require('./text.json');

const sync = process.argv.pop() === 'sync';

const syncTags = async () => {
    const response = await promise(client.tags.findByWorkspace(process.env.workspace));
    const data = response.data.map(i => ({
        title: i.name,
        subtitle: i.gid,
        arg: i.gid
    }));
    fs.writeFile('tags.json', JSON.stringify(data), () => {});
    return data;
};

(async () => {
    if(sync){
        await syncTags();
        output({ title: 'Tags synced successfully!', subtitle });
    } else {
        const file = checkFile('tags.json', '[]');
        if(file.length){
            output(file);
        } else {
            // write the file
            const data = await syncTags();
            output(data);
        }
    }
})();

