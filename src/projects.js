const asana = require('asana');
const fs = require('fs');
const { output } = require('./utils');

const client = asana.Client.create().useAccessToken(process.env.accessToken);

const sync = process.argv.pop() === 'true';

client.projects.getProjects({ workspace: process.env.workspace })
    .then(res => {
        const data = res.data.map(proj => ({
            title: proj.name,
            subtitle: proj.gid,
            arg: proj.gid
        }));

        fs.writeFileSync('projects.json', JSON.stringify({ items: data }));
        if(sync){
            output(data);
        } else {
            output({ title: 'Projects synced successfully!', subtitle: 'Press enter to close' });
        }
    });