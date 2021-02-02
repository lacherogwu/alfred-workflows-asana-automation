const client = require('./api');
const { output, promise } = require('./utils');
const { copy: subtitle } = require('./text.json');

(async () => {
    const response = await promise(client.users.me());
    const data = {
        title: `${response.name}(${response.email}) - ${response.gid}`,
        subtitle,
        arg: response.gid
    };
    output(data);
})();