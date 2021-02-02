const client = require('./api');
const { output, promise } = require('./utils');
const { copy: subtitle } = require('./text.json');

(async () => {
    const response = await promise(client.workspaces.getWorkspaces());
    const data = response.data.map(i => ({
        title: `${i.name} - ${i.gid}`,
        subtitle,
        arg: i.gid
    }));
    output(data);
})();