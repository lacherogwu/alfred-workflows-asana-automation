const client = require('./api');
const { output } = require('./utils');
const { subtitle } = require('./text.json');

client.workspaces.getWorkspaces()
    .then(res => {
        const data = res.data.map(i => ({
            title: `${i.name} - ${i.gid}`,
            subtitle,
            arg: i.gid
        }));

        output(data);
    });