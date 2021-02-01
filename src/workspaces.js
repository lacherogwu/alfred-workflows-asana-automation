const asana = require('asana');
const { output } = require('./utils');
const { subtitle } = require('./text.json');

const client = asana.Client.create().useAccessToken(process.env.accessToken);

client.workspaces.getWorkspaces()
    .then(res => {
        const data = res.data.map(i => ({
            title: `${i.name} - ${i.gid}`,
            subtitle,
            arg: i.gid
        }));

        output(data);
    });