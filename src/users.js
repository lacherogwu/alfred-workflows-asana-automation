const client = require('./api');
const fs = require('fs');
const { output, promise, checkFile } = require('./utils');
const { close: subtitle } = require('./text.json');

const sync = process.argv.pop() === 'sync';

const syncUsers = async () => {
    const response = await promise(client.users.getUsers({ workspace: process.env.workspace }));
    const data = response.data.map(user => ({
        title: user.name,
        subtitle: user.gid,
        arg: user.gid
    }));
    fs.writeFile('users.json', JSON.stringify(data), () => {});

    return data;
};

(async () => {
    if(sync){
        await syncUsers();
        output({ title: 'Users synced successfully!', subtitle });
    } else {
        const file = checkFile('users.json', '[]');
        if(file.length){
            output(file);
        } else {
            // write the file
            const data = await syncUsers();
            output(data);
        }
    }
})();