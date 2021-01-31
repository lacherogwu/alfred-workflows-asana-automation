const asana = require('asana');
const { output } = require('./utils');
const { subtitle } = require('./text.json');

const client = asana.Client.create().useAccessToken(process.env.accessToken);

client.users.me().then(res => {
    const data = {
        title: `${res.name}(${res.email}) - ${res.gid}`,
        subtitle,
        arg: res.gid
    };

    output(data);
});