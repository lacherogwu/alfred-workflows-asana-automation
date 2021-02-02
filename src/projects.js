const client = require('./api');
const fs = require('fs');
const { output, promise, checkFile } = require('./utils');

const sync = process.argv.pop() === 'true';

(async () => {

    const file = checkFile('projects.json');
    console.log(file);

    return;

    const response = await promise(client.projects.getProjects({ workspace: process.env.workspace }));
    const data = response.data.map(proj => ({
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
})();