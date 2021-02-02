const client = require('./api');
const fs = require('fs');
const { output } = require('./utils');

const sync = process.argv.pop() === 'true';

client.users.getUsers({ workspace: process.env.workspace })
    .then(res => {
        const data = res.data.map(user => ({
            title: user.name,
            arg: user.gid
        }));

        fs.writeFileSync('users.json', JSON.stringify({ items: data }));
        if(sync){
            output(data);
        } else {
            output({ title: 'Users synced successfully!', subtitle: 'Press enter to close' });
        }
    });